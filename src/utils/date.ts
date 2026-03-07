const FALLBACK_DATE = "—";

/**
 * Formato de fecha estilo BEREC para el mega-menú y listados.
 * Entrada: ISO date "YYYY-MM-DD".
 * Salida: "dd.mm.yyyy" (ej. "25.02.2026"). Si la fecha es inválida o vacía, devuelve "—".
 */
export function formatBERECDate(isoDate: string | undefined): string {
  if (!isoDate || typeof isoDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate.trim())) return FALLBACK_DATE;
  const [y, m, d] = isoDate.trim().split("-");
  return `${d}.${m}.${y}`;
}

/**
 * Rango de fechas estilo BEREC: "dd–dd.mm.yyyy" o "dd.mm.yyyy" si son iguales.
 * Si alguna fecha es inválida, devuelve "—".
 */
export function formatBERECDateRange(
  startIso: string | undefined,
  endIso: string | undefined
): string {
  if (!startIso) return endIso ? formatBERECDate(endIso) : FALLBACK_DATE;
  if (!endIso || startIso === endIso) return formatBERECDate(startIso);
  const start = formatBERECDate(startIso);
  const end = formatBERECDate(endIso);
  if (start === FALLBACK_DATE || end === FALLBACK_DATE) return start === FALLBACK_DATE ? end : start;
  const [d1, rest] = start.split(".");
  const [d2] = end.split(".");
  return `${d1}–${d2}.${rest}`;
}
