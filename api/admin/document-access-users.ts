import type { IncomingMessage, ServerResponse } from "http";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { ensureAdmin } from "../../server/lib/adminAuth.js";
import {
  ensureDocumentAccessSchema,
  listDocumentAccessUsers,
  createDocumentAccessUser,
  findDocumentAccessUserByEmail,
} from "../../server/lib/documentAccess.js";
import { parseJsonBody } from "../../server/lib/parseBody.js";
import { isDbConfigured } from "../../server/lib/db.js";

const SUPER_ADMIN_EMAILS = ["dcuervo@indotel.gob.do", "aarango@indotel.gob.do", "aarango@indotel.gob"];

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

function isSuperAdmin(email: string): boolean {
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (!isDbConfigured()) {
    sendJson(res, 503, { error: "Database not configured (DATABASE_URL)" });
    return;
  }

  try {
    const auth = await ensureAdmin(req);
    if (!isSuperAdmin(auth.user.email)) {
      sendJson(res, 403, { error: "Solo los super administradores pueden gestionar usuarios de acceso a actas." });
      return;
    }

    await ensureDocumentAccessSchema();

    if (req.method === "GET") {
      const users = await listDocumentAccessUsers();
      sendJson(res, 200, users);
      return;
    }

    if (req.method === "POST") {
      const body = (await parseJsonBody(req)) as Record<string, unknown>;
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      const name = typeof body.name === "string" ? body.name.trim() : null;
      if (!email) {
        sendJson(res, 400, { error: "El email es obligatorio." });
        return;
      }
      if (!password || password.length < 6) {
        sendJson(res, 400, { error: "La contraseña debe tener al menos 6 caracteres." });
        return;
      }
      const existing = await findDocumentAccessUserByEmail(email);
      if (existing) {
        sendJson(res, 409, { error: "Ya existe un usuario con ese email." });
        return;
      }
      const id = `dau_${crypto.randomUUID()}`;
      const passwordHash = await bcrypt.hash(password, 12);
      await createDocumentAccessUser({ id, email, passwordHash, name });
      sendJson(res, 201, { id, email, name });
      return;
    }

    res.statusCode = 405;
    res.end("Method Not Allowed");
  } catch (err) {
    console.error("api/admin/document-access-users", err);
    const status = err instanceof Error && err.name === "UnauthorizedError" ? 401 : 500;
    sendJson(res, status, { error: err instanceof Error ? err.message : "Error interno" });
  }
}
