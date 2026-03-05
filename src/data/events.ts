export type EventStatus = "proxima" | "pasada";

export type EventTipo = "presencial" | "virtual";

export interface HomeEventItem {
  /** Id único para enlace interno /eventos/[id]. Si no hay url, "Leer más" lleva aquí. */
  id?: string;
  title: string;
  city: string;
  year: number;
  status: EventStatus;
  href: string;
  description: string;
  todo?: string;
  mediaLabel?: string;
  /** Fecha legible para mostrar en cards (ej. "25 de Febrero", "2-5 de marzo"). */
  dateLabel?: string;
  /** Para filtro por mes (minúscula): febrero, marzo, abril, etc. */
  mes?: string;
  /** Presencial o virtual para filtro en página Eventos. */
  tipo?: EventTipo;
  /** Imagen de fondo para carrusel destacado; si no existe se usa fallback. */
  imageUrl?: string;
  /** Solo para eventos próximos: URL de registro (ej. INDOTEL). Si existe, se muestra botón REGISTRARSE. */
  registrationUrl?: string;
  /** Enlace externo oficial (Word "Enlaces eventos 2026"). Si existe: Leer más y Registrarse abren esta URL en nueva pestaña. Si no: Registrarse deshabilitado y Leer más → /eventos/[id]. */
  url?: string;
  /** Organizador del evento (ej. CERTAL, GSMA, CITEL). */
  organizador?: string;
  /** Fecha de inicio en ISO (YYYY-MM-DD). Si ya pasó, no se muestra Registrarse. */
  startDate?: string;
}

/** Devuelve id para enlace /eventos/:id (event.id o slug derivado de title+year). */
export function getEventId(event: HomeEventItem): string {
  if (event.id) return event.id;
  const base = `${event.title}-${event.year}`.toLowerCase()
    .normalize("NFD").replace(/\u0300/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "evento";
}

/** True si el evento tiene startDate y esa fecha ya pasó (hoy > startDate). */
export function hasEventPassed(event: HomeEventItem): boolean {
  if (!event.startDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(event.startDate + "T12:00:00");
  d.setHours(0, 0, 0, 0);
  return d < today;
}

/**
 * Eventos: calendario 2026 (próximos) + eventos pasados.
 * Origen: Calendario de Eventos 2026 (REGULATEL / INDOTEL).
 */
export const homeEvents: HomeEventItem[] = [
  // —— 2026 (próximos) — fechas del Calendario de Eventos 2026. url = enlace oficial (Word); sin url → "Leer más" a /eventos/[id], Registrarse deshabilitado. ——
  {
    id: "cumbre-ministerial-certal-2026",
    title: "Cumbre Ministerial (CERTAL)",
    city: "Madrid",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Cumbre Preministerial CERTAL 2026 | Madrid, España. Organizador: CERTAL.",
    organizador: "CERTAL",
    dateLabel: "25 de Febrero",
    mes: "febrero",
    tipo: "presencial",
    startDate: "2026-02-25",
    url: "https://certalatam.org/cumbre-preministerial-certal/",
  },
  {
    id: "digital-summit-latam-2026",
    title: "Digital Summit Latam",
    city: "Madrid",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Digital Summit Latam. Organizador: DPL GROUP.",
    organizador: "DPL GROUP",
    dateLabel: "26 y 27 de Febrero",
    mes: "febrero",
    tipo: "presencial",
    startDate: "2026-02-26",
    url: "https://digitalsummitlatam.com/",
  },
  {
    id: "saludo-institucional-berec-regulatel-madrid-2026",
    title: "Saludo Institucional BEREC - REGULATEL, Madrid 2026",
    city: "Madrid",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Encuentro institucional de apertura entre BEREC y REGULATEL para fortalecer la agenda de cooperación 2026.",
    organizador: "BEREC / REGULATEL",
    mediaLabel: "FOTOS",
    dateLabel: "Febrero 2026",
    mes: "febrero",
    tipo: "presencial",
    startDate: "2026-02-01",
    // sin url en Word
  },
  {
    id: "mwc-barcelona-2026",
    title: "MWC Barcelona 2026",
    city: "Barcelona",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "MWC Barcelona 2026. Organizador: GSMA.",
    organizador: "GSMA",
    dateLabel: "2-5 de marzo",
    mes: "marzo",
    tipo: "presencial",
    startDate: "2026-03-02",
    url: "https://www.mwcbarcelona.com/",
  },
  {
    id: "foro-altas-autoridades-citel-2026",
    title: "Foro de Altas Autoridades (previo a la IX Asamblea Ordinaria de la CITEL)",
    city: "San José, Costa Rica",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Foro de Altas Autoridades previo a la IX Asamblea Ordinaria de la CITEL. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "16 de marzo",
    mes: "marzo",
    tipo: "presencial",
    startDate: "2026-03-16",
    url: "https://www.oas.org/ext/es/principal/oea/nuestra-estructura/entidades-y-organismos/citel/Inicio",
  },
  {
    id: "ix-asamblea-ordinaria-citel-2026",
    title: "IX Asamblea Ordinaria de la CITEL",
    city: "San José, Costa Rica",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "IX Asamblea Ordinaria de la CITEL. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "17-19 de marzo",
    mes: "marzo",
    tipo: "presencial",
    startDate: "2026-03-17",
    url: "https://www.oas.org/ext/es/principal/oea/nuestra-estructura/entidades-y-organismos/citel/Inicio",
  },
  {
    id: "48-reunion-ccp1-citel-2026",
    title: "48 Reunión del CCP.I",
    city: "Ciudad de Panamá",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "48 Reunión del CCP.I. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "20-24 de abril",
    mes: "abril",
    tipo: "presencial",
    startDate: "2026-04-20",
    url: "https://www.oas.org/CITELEvents/es/Events",
  },
  {
    id: "49-reunion-ccp1-citel-2026",
    title: "49 Reunión del CCP.I",
    city: "Asunción, Paraguay",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "49 Reunión del CCP.I. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "7-11 de septiembre",
    mes: "septiembre",
    tipo: "presencial",
    startDate: "2026-09-07",
    url: "https://www.oas.org/CITELEvents/es/Events",
  },
  {
    id: "47-reunion-ccp2-citel-2026",
    title: "47 Reunión CCP.II",
    city: "Dominica",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "47 Reunión CCP.II. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "6-10 de abril",
    mes: "abril",
    tipo: "presencial",
    startDate: "2026-04-06",
    url: "https://www.oas.org/CITELEvents/es/Events",
  },
  {
    id: "48-reunion-ccp2-citel-2026",
    title: "48 Reunión CCP.II",
    city: "Colombia",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "48 Reunión CCP.II. Organizador: CITEL.",
    organizador: "CITEL",
    dateLabel: "30 nov - 4 diciembre",
    mes: "diciembre",
    tipo: "presencial",
    startDate: "2026-11-30",
    url: "https://www.oas.org/CITELEvents/es/Events",
  },
  {
    id: "congreso-latam-transformacion-digital-2026",
    title: "Congreso Latinoamericano de Transformación Digital 2026 y GSMA Mobile 360",
    city: "México",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Congreso Latinoamericano de Transformación Digital 2026 y GSMA Mobile 360 (CLTD). Organizadores: ASIET - GSMA.",
    organizador: "ASIET / GSMA",
    dateLabel: "13-15 de mayo",
    mes: "mayo",
    tipo: "presencial",
    startDate: "2026-05-13",
    url: "https://cltd.lat/",
  },
  {
    id: "simposio-mundial-organismos-reguladores-2026",
    title: "Simposio Mundial para Organismos Reguladores (GSR-26)",
    city: "Turquía",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Simposio Mundial para Organismos Reguladores. Organizador: UIT.",
    organizador: "UIT",
    dateLabel: "18-21 mayo",
    mes: "mayo",
    tipo: "presencial",
    startDate: "2026-05-18",
    url: "https://www.itu.int/itu-d/meetings/gsr-26/",
  },
  {
    id: "cumbre-berec-regulatel-2026",
    title: "Cumbre BEREC - REGULATEL",
    city: "Por definir",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Cumbre BEREC - REGULATEL. Organizador: BEREC.",
    organizador: "BEREC",
    dateLabel: "Junio",
    mes: "junio",
    tipo: "presencial",
    startDate: "2026-06-01",
    // sin url en Word — por definir
  },
  {
    id: "cumbre-regulatel-prai-2026",
    title: "Cumbre REGULATEL - PRAI",
    city: "Virtual",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Cumbre REGULATEL - PRAI. Organizador: REGULATEL.",
    organizador: "REGULATEL",
    dateLabel: "Por definir",
    tipo: "virtual",
    // sin url en Word — por definir
  },
  {
    id: "conferencia-plenipotenciarios-2026",
    title: "Conferencia de Plenipotenciarios de 2026 (PP-26)",
    city: "Doha, Qatar",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "Conferencia de Plenipotenciarios de 2026 (PP-26). Organizador: UIT.",
    organizador: "UIT",
    dateLabel: "9 al 27 de noviembre",
    mes: "noviembre",
    tipo: "presencial",
    startDate: "2026-11-09",
    url: "https://pp.itu.int/2026/en/",
  },
  {
    id: "29-asamblea-plenaria-regulatel-2026",
    title: "29 Asamblea Plenaria Regulatel",
    city: "Portugal",
    year: 2026,
    status: "proxima",
    href: "/eventos",
    description: "29 Asamblea Plenaria Regulatel. Organizador: REGULATEL.",
    organizador: "REGULATEL",
    dateLabel: "Diciembre",
    mes: "diciembre",
    tipo: "presencial",
    startDate: "2026-12-01",
    // sin url en Word — por definir
  },
  // —— Pasados (se muestran después en "Todos los eventos") ——
  {
    title: "Cumbre REGULATEL, ASIET, COMTELCA, Punta Cana 2025",
    city: "Punta Cana",
    year: 2025,
    status: "pasada",
    href: "https://www.flickr.com/photos/indotel/albums/72177720330839315",
    description: "Evento regional sobre conectividad, cooperación y ecosistema digital con participación multisectorial.",
  },
  {
    title: "CUMBRE Four-lateral BEREC, EaPeReg, REGULATEL and EMERG Summit. Barcelona 2025",
    city: "Barcelona",
    year: 2025,
    status: "pasada",
    href: "https://www.berec.europa.eu/en",
    description: "Espacio de intercambio entre foros regulatorios para fortalecer cooperación internacional en telecomunicaciones.",
  },
  {
    title: "Cumbre Regulatel - ASIET, Cartagena 2024",
    city: "Cartagena",
    year: 2024,
    status: "pasada",
    href: "/pendiente/cumbre-regulatel-asiet-cartagena-2024",
    description: "Sesión de articulación público-privada para avanzar en agendas de transformación digital regional.",
  },
  {
    title: "Cumbre BEREC - REGULATEL, Santa Cruz, 2024",
    city: "Santa Cruz",
    year: 2024,
    status: "pasada",
    href: "/pendiente/cumbre-berec-regulatel-santa-cruz-2024",
    description: "Cumbre enfocada en intercambio de experiencias regulatorias y desafíos de conectividad regional.",
  },
];

/** Eventos 2026 (próximos): fuente única para enlaces oficiales. Actualizar url aquí para cambiar CTAs. */
export const events2026 = homeEvents.filter((e) => e.year === 2026 && e.status === "proxima");
