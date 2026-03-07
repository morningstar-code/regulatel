/**
 * Crear y listar usuarios con acceso solo a documentos restringidos (actas).
 * No tienen acceso al panel admin; al ingresar email y contraseña en /acceso-documentos desbloquean el acta.
 * Solo super administradores.
 */
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Lock, UserPlus, Mail, Calendar } from "lucide-react";

export default function AdminAccesoActas() {
  const { isChecking, isAdmin, canManageUsers } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<{ id: string; email: string; name: string | null; institution: string | null; position: string | null; country: string | null; is_active: boolean; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isChecking && (!isAdmin || !canManageUsers)) {
      navigate("/admin", { replace: true });
    }
  }, [isChecking, isAdmin, canManageUsers, navigate]);

  const loadUsers = useCallback(async () => {
    const res = await api.admin.documentAccessUsers.list();
    if (res.ok) setUsers(Array.isArray(res.data) ? res.data : []);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadUsers().finally(() => setLoading(false));
  }, [loadUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    if (!email.trim()) {
      setFormError("El email es obligatorio.");
      return;
    }
    if (!password || password.length < 6) {
      setFormError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setSubmitting(true);
    const res = await api.admin.documentAccessUsers.create({
      email: email.trim(),
      password,
      name: name.trim() || undefined,
      institution: institution.trim() || undefined,
      position: position.trim() || undefined,
      country: country.trim() || undefined,
    });
    setSubmitting(false);
    if (res.ok) {
      setSuccess(`Cuenta creada: ${res.data.email}. Esa persona podrá desbloquear las actas en /acceso-documentos con su email y contraseña.`);
      setEmail("");
      setPassword("");
      setName("");
      setInstitution("");
      setPosition("");
      setCountry("");
      loadUsers();
    } else {
      setFormError(res.error ?? "Error al crear la cuenta.");
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("es-DO", { dateStyle: "short", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--regu-gray-900)" }}>
          <Lock className="h-7 w-7" style={{ color: "var(--regu-blue)" }} />
          Acceso a actas restringidas
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--regu-gray-600)" }}>
          Crea cuentas para personas que puedan desbloquear las actas (Acta No. 26, 27, 28, etc.) desde la página pública. Estas cuentas <strong>no</strong> tienen acceso al panel de administración.
        </p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm" style={{ borderColor: "var(--regu-gray-200)" }}>
        <h2 className="flex items-center gap-2 text-lg font-semibold" style={{ color: "var(--regu-navy)" }}>
          <UserPlus className="h-5 w-5" />
          Crear cuenta (solo acceso a actas)
        </h2>
        <form onSubmit={handleCreate} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="persona@dominio.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>Nombre (opcional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>Institución (opcional)</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="Institución"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>Cargo (opcional)</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="Cargo"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "var(--regu-gray-700)" }}>País (opcional)</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--regu-gray-200)" }}
              placeholder="País"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ backgroundColor: "var(--regu-blue)" }}
            >
              <UserPlus className="h-4 w-4" />
              {submitting ? "Creando…" : "Crear cuenta"}
            </button>
          </div>
        </form>
        {formError && <p className="mt-3 text-sm font-medium" style={{ color: "var(--regu-salmon)" }}>{formError}</p>}
        {success && <p className="mt-3 text-sm font-medium" style={{ color: "var(--regu-teal)" }}>{success}</p>}
      </section>

      <section className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: "var(--regu-gray-200)" }}>
        <h2 className="px-6 py-4 text-lg font-semibold" style={{ color: "var(--regu-navy)" }}>
          Cuentas con acceso a actas
        </h2>
        {loading ? (
          <p className="px-6 pb-6 text-sm" style={{ color: "var(--regu-gray-500)" }}>Cargando…</p>
        ) : users.length === 0 ? (
          <p className="px-6 pb-6 text-sm" style={{ color: "var(--regu-gray-500)" }}>Aún no hay cuentas. Crea una arriba.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <colgroup>
                <col style={{ width: "14%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
              </colgroup>
              <thead>
                <tr style={{ backgroundColor: "var(--regu-gray-50)" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--regu-gray-700)" }}>Nombre</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--regu-gray-700)" }}>Email</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--regu-gray-700)" }}>Institución</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--regu-gray-700)" }}>Cargo</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--regu-gray-700)" }}>País</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "var(--regu-gray-700)" }}>Creado</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t" style={{ borderColor: "var(--regu-gray-100)" }}>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--regu-gray-900)" }}>{u.name ?? "—"}</td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--regu-gray-700)" }}>
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 opacity-70 shrink-0" />
                        <span className="break-all">{u.email}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--regu-gray-600)" }}>{u.institution ?? "—"}</td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--regu-gray-600)" }}>{u.position ?? "—"}</td>
                    <td className="px-4 py-3 align-top" style={{ color: "var(--regu-gray-600)" }}>{u.country ?? "—"}</td>
                    <td className="px-4 py-3 align-top whitespace-nowrap" style={{ color: "var(--regu-gray-500)" }}>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {formatDate(u.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
