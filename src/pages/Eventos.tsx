import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar } from "lucide-react";
import EventCard from "@/components/home/EventCard";
import { useEvents } from "@/contexts/AdminDataContext";
import type { Event } from "@/types/event";
import { normalizeEvent } from "@/types/event";

type Segment = "upcoming" | "past" | "all";

function filterAndSort(
  events: Event[],
  segment: Segment,
  yearFilter: string,
  searchQuery: string
): Event[] {
  const normalized = events.map(normalizeEvent);
  let list = normalized;

  if (segment === "upcoming") {
    list = list.filter((e) => e.status === "upcoming");
    list = [...list].sort((a, b) => a.startDate.localeCompare(b.startDate));
  } else if (segment === "past") {
    list = list.filter((e) => e.status === "past");
    list = [...list].sort((a, b) => b.startDate.localeCompare(a.startDate));
  } else {
    list = [...list].sort((a, b) => {
      if (a.status !== b.status) return a.status === "upcoming" ? -1 : 1;
      return a.status === "upcoming"
        ? a.startDate.localeCompare(b.startDate)
        : b.startDate.localeCompare(a.startDate);
    });
  }

  if (yearFilter !== "all") {
    const y = parseInt(yearFilter, 10);
    list = list.filter((e) => e.year === y);
  }

  if (searchQuery.trim()) {
    const q = searchQuery
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\u0300/g, "");
    list = list.filter(
      (e) =>
        e.title.toLowerCase().normalize("NFD").replace(/\u0300/g, "").includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.description ?? "").toLowerCase().includes(q)
    );
  }

  return list;
}

export default function Eventos() {
  const [searchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const tabFromUrl = searchParams.get("tab");
  const events = useEvents();
  const [segment, setSegment] = useState<Segment>(() => {
    if (tabFromUrl === "pasados") return "past";
    if (tabFromUrl === "todos") return "all";
    return "upcoming";
  });
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(qFromUrl);

  useEffect(() => {
    if (qFromUrl !== searchQuery) setSearchQuery(qFromUrl);
  }, [qFromUrl]);

  const years = useMemo(() => {
    const set = new Set(events.map((e) => e.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [events]);

  const filtered = useMemo(
    () => filterAndSort(events, segment, yearFilter, searchQuery),
    [events, segment, yearFilter, searchQuery]
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FAFBFC",
        borderTop: "1px solid rgba(22,61,89,0.07)",
        fontFamily: "var(--token-font-body)",
      }}
    >
      <div style={{ height: 4, background: "var(--regu-blue)", width: "100%" }} aria-hidden />

      <div className="mx-auto px-4 pb-14 pt-10 md:px-6 md:pt-14" style={{ maxWidth: "var(--token-container-max)" }}>
        <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--regu-gray-400)" }} aria-label="Breadcrumb">
          <Link to="/" className="hover:underline" style={{ color: "var(--regu-gray-500)" }}>Inicio</Link>
          <span aria-hidden>/</span>
          <span style={{ color: "var(--regu-blue)", fontWeight: 600 }}>Eventos</span>
        </nav>

        <header className="mb-8">
          <p
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--regu-gray-400)",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Calendar size={12} style={{ color: "var(--regu-blue)" }} />
            Cronograma REGULATEL
          </p>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 4,
                minHeight: 40,
                borderRadius: 2,
                background: "var(--regu-blue)",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <div>
              <h1
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                  fontWeight: 700,
                  color: "var(--regu-navy)",
                  lineHeight: 1.2,
                  margin: 0,
                  fontFamily: "var(--token-font-heading)",
                }}
              >
                Eventos
              </h1>
              <p
                style={{
                  marginTop: 8,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--regu-gray-500)",
                  maxWidth: 560,
                }}
              >
                Cumbres, talleres, seminarios y actividades de cooperación de REGULATEL y organizaciones aliadas.
              </p>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--regu-gray-500)" }}>
                {filtered.length} {filtered.length === 1 ? "evento" : "eventos"} con los filtros actuales
              </p>
            </div>
          </div>
        </header>

        {/* Filter bar card */}
        <div
          className="rounded-2xl border bg-white p-4 shadow-[0_2px_8px_rgba(22,61,89,0.06)]"
          style={{
            borderColor: "rgba(22,61,89,0.10)",
            borderTop: "3px solid var(--regu-blue)",
            marginBottom: 28,
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" style={{ color: "var(--regu-blue)" }} aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--regu-gray-500)" }}>
                Filtros
              </span>
            </div>
            <div
              className="flex rounded-xl border p-0.5"
              style={{ borderColor: "rgba(22,61,89,0.12)" }}
              role="tablist"
              aria-label="Segmento de eventos"
            >
              {(
                [
                  { value: "upcoming" as Segment, label: "Próximos" },
                  { value: "past" as Segment, label: "Pasados" },
                  { value: "all" as Segment, label: "Todos" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={segment === value}
                  onClick={() => setSegment(value)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--regu-blue)] focus:ring-offset-2"
                  style={{
                    backgroundColor: segment === value ? "var(--regu-blue)" : "transparent",
                    color: segment === value ? "#fff" : "var(--regu-gray-600)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              aria-label="Filtrar por año"
              className="rounded-xl border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--regu-blue)]"
              style={{
                borderColor: "rgba(22,61,89,0.12)",
                backgroundColor: "#F4F6F8",
                color: "var(--regu-navy)",
              }}
            >
              <option value="all">Todos los años</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <label htmlFor="eventos-search" className="sr-only">Buscar eventos</label>
            <div className="relative min-w-0 flex-1 max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "var(--regu-gray-400)" }} aria-hidden />
              <input
                id="eventos-search"
                type="search"
                placeholder="Buscar por título, organizador o lugar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(68,137,198,0.30)]"
                style={{
                  borderColor: "rgba(22,61,89,0.12)",
                  backgroundColor: "#F4F6F8",
                  color: "var(--regu-navy)",
                }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${segment}-${yearFilter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
              style={{ gap: 24 }}
            >
              {filtered.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="eventListCardWrapper"
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border bg-white py-16 text-center"
              style={{
                borderColor: "rgba(22,61,89,0.10)",
                boxShadow: "0 2px 8px rgba(22,61,89,0.04)",
                borderTop: "3px solid var(--regu-blue)",
              }}
            >
              <p className="text-lg font-bold" style={{ color: "var(--regu-navy)" }}>No se encontraron eventos</p>
              <p className="mt-2 text-sm" style={{ color: "var(--regu-gray-500)" }}>
                {searchQuery.trim() ? "Pruebe con otro término de búsqueda o ajuste los filtros." : "No hay eventos con los filtros seleccionados."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="mt-12 rounded-2xl border p-6 md:p-8"
          style={{
            backgroundColor: "#fff",
            borderColor: "rgba(22,61,89,0.10)",
            boxShadow: "0 2px 8px rgba(22,61,89,0.04)",
            borderTop: "3px solid var(--regu-blue)",
          }}
        >
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--regu-navy)", fontFamily: "var(--token-font-heading)" }}>
            Sobre los Eventos de REGULATEL
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--regu-gray-600)" }}>
            <p>
              REGULATEL organiza y participa en cumbres, talleres, seminarios y reuniones de trabajo con organizaciones aliadas como BEREC, ASIET, COMTELCA, CITEL, UIT, GSMA e IIC.
            </p>
            <p>
              Estos eventos son espacios de diálogo, intercambio de experiencias y fortalecimiento de la cooperación regional en el sector de las telecomunicaciones.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t pt-8" style={{ borderColor: "rgba(22,61,89,0.08)" }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--regu-blue)] hover:text-[var(--regu-blue)]"
            style={{ borderColor: "rgba(22,61,89,0.12)", color: "var(--regu-gray-700)", textDecoration: "none" }}
          >
            ← Volver a inicio
          </Link>
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            style={{ backgroundColor: "var(--regu-blue)", textDecoration: "none" }}
          >
            Ver noticias →
          </Link>
        </div>
      </div>
    </div>
  );
}
