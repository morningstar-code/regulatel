import { Link } from "react-router-dom";
import { useMemo } from "react";
import type { Event } from "@/types/event";
import EventCard from "./EventCard";

interface EventsSectionProps {
  events: Event[];
}

/** Orden: próximos primero (startDate asc), luego pasados (startDate desc). */
function sortEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    if (a.status !== b.status) return a.status === "upcoming" ? -1 : 1;
    return a.status === "upcoming"
      ? a.startDate.localeCompare(b.startDate)
      : b.startDate.localeCompare(a.startDate);
  });
}

/**
 * Sección "Eventos" estilo BEREC: título + Ver todos, grid de cards.
 * Para añadir/editar eventos: usar panel Admin /admin/eventos.
 */
export default function EventsSection({ events }: EventsSectionProps) {
  const sorted = useMemo(() => sortEvents(events), [events]);

  return (
    <section className="w-full py-12 md:py-14" style={{ fontFamily: "var(--token-font-body)" }}>
      <div className="mx-auto w-full px-4 md:px-6" style={{ maxWidth: "var(--token-container-max)" }}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2
            className="font-bold leading-tight"
            style={{
              color: "var(--token-text-primary)",
              fontSize: "var(--token-heading-h2-size)",
            }}
          >
            Todos los eventos
          </h2>
          <Link
            to="/eventos"
            className="text-sm font-bold transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--token-accent)] focus-visible:ring-offset-2"
            style={{ color: "var(--token-accent)" }}
          >
            Ver todos
          </Link>
        </div>
        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-5"
          style={{ gap: "20px" }}
        >
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
