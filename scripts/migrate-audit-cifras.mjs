/**
 * Añade 'cifras' al constraint resource_type de admin_audit_log.
 * Ejecutar una vez si la tabla ya existía sin este valor.
 * Uso: node scripts/migrate-audit-cifras.mjs
 */
import "dotenv/config";
import postgres from "postgres";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no está definido. Usa .env o exporta la variable.");
  }

  const sql = postgres(databaseUrl, { max: 1, idle_timeout: 20, connect_timeout: 10 });

  try {
    await sql.unsafe(`
      ALTER TABLE admin_audit_log DROP CONSTRAINT IF EXISTS admin_audit_log_resource_type_check;
    `);
    await sql.unsafe(`
      ALTER TABLE admin_audit_log ADD CONSTRAINT admin_audit_log_resource_type_check
      CHECK (resource_type IN ('news', 'event', 'document', 'upload', 'admin_user', 'cifras'));
    `);
    console.log("Migración aplicada: admin_audit_log admite resource_type 'cifras'.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
