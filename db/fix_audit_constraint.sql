-- Corrige el constraint de resource_type en admin_audit_log.
-- Ejecutar en Neon SQL Editor si aparece: "violates check constraint admin_audit_log_resource_type_check"
-- Permite: news, event, document, upload, admin_user, cifras, site_settings

ALTER TABLE admin_audit_log DROP CONSTRAINT IF EXISTS admin_audit_log_resource_type_check;
ALTER TABLE admin_audit_log ADD CONSTRAINT admin_audit_log_resource_type_check
  CHECK (resource_type IN ('news', 'event', 'document', 'upload', 'admin_user', 'cifras', 'site_settings'));
