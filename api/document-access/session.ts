import type { IncomingMessage, ServerResponse } from "http";
import { getDocumentAccessSession } from "../../server/lib/documentAccess.js";
import { isDbConfigured } from "../../server/lib/db.js";

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (!isDbConfigured()) {
    sendJson(res, 503, { ok: false });
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false });
    return;
  }

  try {
    const session = await getDocumentAccessSession(req);
    if (session) {
      sendJson(res, 200, { ok: true });
    } else {
      sendJson(res, 401, { ok: false });
    }
  } catch (err) {
    console.error("api/document-access/session", err);
    sendJson(res, 500, { ok: false });
  }
}
