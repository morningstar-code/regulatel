import { Link } from "react-router-dom";
import type { Event } from "@/types/event";
import { EVENT_STATUS_LABEL } from "@/types/event";

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Eventos</h2>
        <Link
          to="/eventos"
          className="text-sm font-medium text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Ver todos
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => {
          const isUpcoming = event.status === "upcoming";
          return (
            <article
              key={event.id}
              className={[
                "rounded-2xl border bg-white p-5 shadow-sm",
                isUpcoming ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200",
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={[
                    "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                    isUpcoming ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700",
                  ].join(" ")}
                >
                  {EVENT_STATUS_LABEL[event.status]}
                </span>
                <span className="text-xs font-medium text-slate-500">{event.year}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{event.organizer} · {event.location}</p>
              {event.description && (
                <p className="mt-2 text-sm text-slate-600">{event.description}</p>
              )}
              <Link
                to={`/eventos/${event.id}`}
                className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 motion-reduce:transition-none"
              >
                Ver evento
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
