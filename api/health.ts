/**
 * GET /api/health — Diagnóstico: si esto devuelve 200 con JSON, la carpeta api/ SÍ se despliega en Vercel.
 * Si da 404, la carpeta api/ no está en el despliegue (revisa Root Directory).
 */
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
  res.end(JSON.stringify({ ok: true, api: "deployed", message: "api folder is deployed" }));
}
