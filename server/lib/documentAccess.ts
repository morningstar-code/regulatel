import crypto from "crypto";
import type { IncomingMessage, ServerResponse } from "http";
import bcrypt from "bcryptjs";
import { getDb } from "./db.js";

const COOKIE_NAME = "regulatel_document_access";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24h

let schemaEnsured: Promise<void> | null = null;

export async function ensureDocumentAccessSchema() {
  if (!schemaEnsured) {
    schemaEnsured = (async () => {
      const sql = getDb();
      await sql`
        CREATE TABLE IF NOT EXISTS document_access_users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          name TEXT,
          institution TEXT,
          position TEXT,
          country TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_doc_access_users_email ON document_access_users(lower(email))`;
      await sql`ALTER TABLE document_access_users ADD COLUMN IF NOT EXISTS institution TEXT`;
      await sql`ALTER TABLE document_access_users ADD COLUMN IF NOT EXISTS position TEXT`;
      await sql`ALTER TABLE document_access_users ADD COLUMN IF NOT EXISTS country TEXT`;
      await sql`
        CREATE TABLE IF NOT EXISTS document_access_sessions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES document_access_users(id) ON DELETE CASCADE,
          session_token_hash TEXT NOT NULL UNIQUE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_doc_access_sessions_user_id ON document_access_sessions(user_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_doc_access_sessions_expires_at ON document_access_sessions(expires_at)`;
    })().catch((err) => {
      schemaEnsured = null;
      throw err;
    });
  }
  await schemaEnsured;
}

function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((part) => {
      const [name, ...rest] = part.trim().split("=");
      return [name?.trim() ?? "", decodeURIComponent(rest.join("=").trim())];
    })
  );
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function randomToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function setDocumentAccessCookie(res: ServerResponse, token: string) {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; SameSite=Lax; ${secure}`.trim()
  );
}

export function clearDocumentAccessCookie(res: ServerResponse) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`);
}

export interface DocumentAccessUserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  institution: string | null;
  position: string | null;
  country: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function findDocumentAccessUserByEmail(email: string): Promise<DocumentAccessUserRow | null> {
  await ensureDocumentAccessSchema();
  const sql = getDb();
  const normalized = email.trim().toLowerCase();
  const [row] = await sql<DocumentAccessUserRow[]>`
    SELECT id, email, password_hash, name, institution, position, country, is_active, created_at, updated_at
    FROM document_access_users
    WHERE lower(email) = ${normalized}
    LIMIT 1
  `;
  return row ?? null;
}

export async function createDocumentAccessUser(input: {
  id: string;
  email: string;
  passwordHash: string;
  name?: string | null;
  institution?: string | null;
  position?: string | null;
  country?: string | null;
}) {
  await ensureDocumentAccessSchema();
  const sql = getDb();
  const now = new Date().toISOString();
  const emailNorm = input.email.trim().toLowerCase();
  await sql`
    INSERT INTO document_access_users (id, email, password_hash, name, institution, position, country, is_active, created_at, updated_at)
    VALUES (${input.id}, ${emailNorm}, ${input.passwordHash}, ${input.name ?? null}, ${input.institution ?? null}, ${input.position ?? null}, ${input.country ?? null}, true, ${now}::timestamptz, ${now}::timestamptz)
  `;
}

export async function listDocumentAccessUsers(): Promise<Array<{ id: string; email: string; name: string | null; institution: string | null; position: string | null; country: string | null; is_active: boolean; created_at: string }>> {
  await ensureDocumentAccessSchema();
  const sql = getDb();
  const rows = await sql<Array<{ id: string; email: string; name: string | null; institution: string | null; position: string | null; country: string | null; is_active: boolean; created_at: string }>>`
    SELECT id, email, name, institution, position, country, is_active, created_at
    FROM document_access_users
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function verifyDocumentAccessPassword(user: DocumentAccessUserRow, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password_hash);
}

export async function createDocumentAccessSession(userId: string): Promise<string> {
  await ensureDocumentAccessSchema();
  const sql = getDb();
  const token = randomToken();
  const tokenHash = hashToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
  const sessionId = `das_${crypto.randomUUID()}`;
  await sql`
    INSERT INTO document_access_sessions (id, user_id, session_token_hash, expires_at, created_at)
    VALUES (${sessionId}, ${userId}, ${tokenHash}, ${expiresAt.toISOString()}::timestamptz, ${now.toISOString()}::timestamptz)
  `;
  return token;
}

interface SessionRow {
  id: string;
  user_id: string;
  expires_at: string;
}

export async function getDocumentAccessSession(req: IncomingMessage): Promise<{ userId: string } | null> {
  await ensureDocumentAccessSchema();
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  const sql = getDb();
  const tokenHash = hashToken(token);
  const [row] = await sql<SessionRow[]>`
    SELECT id, user_id, expires_at
    FROM document_access_sessions
    WHERE session_token_hash = ${tokenHash}
    LIMIT 1
  `;
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) return null;

  const [user] = await sql<{ is_active: boolean }[]>`
    SELECT is_active FROM document_access_users WHERE id = ${row.user_id} LIMIT 1
  `;
  if (!user || !user.is_active) return null;

  return { userId: row.user_id };
}
