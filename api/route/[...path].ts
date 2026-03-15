/**
 * Router único: recibe todas las peticiones reescritas desde /api/* a /api/route/*.
 * Ej: /api/route/settings, /api/route/news, /api/route/news/123.
 */
import type { IncomingMessage, ServerResponse } from "http";

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

function getPathSegments(req: IncomingMessage): string[] {
  const pathname = (req.url ?? "").split("?")[0];
  return pathname.replace(/^\/api\/route\/?/, "").split("/").filter(Boolean);
}

/** Pasa req con url /api/... (sin /route/) para que los sub-handlers que parsean la URL funcionen. */
function withNormalizedUrl<T>(req: IncomingMessage, fn: () => Promise<T>): Promise<T> {
  const orig = req.url;
  const [pathPart, queryPart] = (orig ?? "").split("?");
  req.url = pathPart.replace(/\/api\/route\//, "/api/") + (queryPart ? "?" + queryPart : "");
  return fn().finally(() => { req.url = orig; });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const path = getPathSegments(req);
  const segment = path[0];

  try {
    if (segment === "health" || segment === undefined) {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, api: true, message: "API routes are deployed." }));
      return;
    }

    if (segment === "settings") {
      const mod = await import("../../server/api-handlers/settings.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "news") {
      const mod = await import("../../server/api-handlers/news.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "events") {
      const mod = await import("../../server/api-handlers/events.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "documents") {
      const mod = await import("../../server/api-handlers/documents.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "cifras") {
      const mod = await import("../../server/api-handlers/cifras.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "admin") {
      const mod = await import("../../server/api-handlers/admin.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "uploads") {
      const mod = await import("../../server/api-handlers/uploads.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "subscribe") {
      const mod = await import("../../server/api-handlers/subscribe.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    if (segment === "document-access") {
      const mod = await import("../../server/api-handlers/document-access.js");
      await withNormalizedUrl(req, () => mod.default(req, res));
      return;
    }

    sendJson(res, 404, { error: "Not Found", path: path.join("/") });
  } catch (err) {
    console.error("api/route/[...path]", segment, err);
    sendJson(res, 500, { error: err instanceof Error ? err.message : "Internal server error" });
  }
}
