/**
 * Ejecuta db/init_all.sql contra la base en DATABASE_URL.
 * Uso: node scripts/init-all.mjs
 * Requiere .env con DATABASE_URL (Neon).
 */
import "dotenv/config";
import postgres from "postgres";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const initPath = path.join(__dirname, "..", "db", "init_all.sql");

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no está definido. Configúralo en .env o exporta la variable.");
  }

  const sqlContent = fs.readFileSync(initPath, "utf8");
  const sql = postgres(databaseUrl, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  try {
    await sql.unsafe(sqlContent);
    console.log("init_all.sql ejecutado correctamente. Todas las tablas listas.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
