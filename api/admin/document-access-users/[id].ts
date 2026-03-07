/**
 * Ruta específica para PATCH/DELETE /api/admin/document-access-users/:id
 * En Vercel el catch-all a veces no recibe bien paths con dos segmentos; esta ruta lo garantiza.
 */
import type { IncomingMessage, ServerResponse } from "http";
import { ensureAdmin } from "../../../server/lib/adminAuth.js";
import {
  ensureDocumentAccessSchema,
  findDocumentAccessUserById,
  deleteDocumentAccessUser,
  updateDocumentAccessUser,
} from "../../../server/lib/documentAccess.js";
import { parseJsonBody } from "../../../server/lib/parseBody.js";
import { isDbConfigured } from "../../../server/lib/db.js";

const SUPER_ADMIN_EMAILS = ["dcuervo@indotel.gob.do", "aarango@indotel.gob.do", "aarango@indotel.gob"];

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

function isSuperAdmin(email: string): boolean {
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

function getIdFromReq(req: IncomingMessage): string {
  const path = (req.url ?? "").split("?")[0];
  const segments = path.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS");
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

  const id = getIdFromReq(req);
  if (!id) {
    sendJson(res, 400, { error: "Falta el id del usuario." });
    return;
  }

  try {
    const auth = await ensureAdmin(req);
    if (!isSuperAdmin(auth.user.email)) {
      sendJson(res, 403, { error: "Solo los super administradores pueden gestionar usuarios de acceso a actas." });
      return;
    }
    await ensureDocumentAccessSchema();

    if (req.method === "DELETE") {
      const ok = await deleteDocumentAccessUser(id);
      if (!ok) {
        sendJson(res, 404, { error: "Usuario no encontrado." });
        return;
      }
      sendJson(res, 200, { deleted: true });
      return;
    }

    if (req.method === "PATCH") {
      const body = (await parseJsonBody(req)) as Record<string, unknown>;
      const name = typeof body.name === "string" ? body.name.trim() || null : undefined;
      const institution = typeof body.institution === "string" ? body.institution.trim() || null : undefined;
      const position = typeof body.position === "string" ? body.position.trim() || null : undefined;
      const country = typeof body.country === "string" ? body.country.trim() || null : undefined;
      const password = typeof body.password === "string" ? body.password : undefined;
      if (password !== undefined && password.length > 0 && password.length < 6) {
        sendJson(res, 400, { error: "La contraseña debe tener al menos 6 caracteres." });
        return;
      }
      const ok = await updateDocumentAccessUser(id, {
        name,
        institution,
        position,
        country,
        password: password && password.length >= 6 ? password : undefined,
      });
      if (!ok) {
        sendJson(res, 404, { error: "Usuario no encontrado." });
        return;
      }
      const updated = await findDocumentAccessUserById(id);
      if (!updated) {
        sendJson(res, 200, { id });
        return;
      }
      sendJson(res, 200, {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        institution: updated.institution,
        position: updated.position,
        country: updated.country,
      });
      return;
    }

    sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("api/admin/document-access-users/[id]", err);
    const status = err instanceof Error && err.name === "UnauthorizedError" ? 401 : 500;
    sendJson(res, status, { error: err instanceof Error ? err.message : "Error interno" });
  }
}
