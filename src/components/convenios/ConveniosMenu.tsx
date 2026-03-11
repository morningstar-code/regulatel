import { Link } from "react-router-dom";
import { convenios } from "@/data/convenios";

interface ConveniosMenuProps {
  panelId: string;
  isOpen: boolean;
  onLinkClick: () => void;
  variant: "desktop" | "mobile";
}

/**
 * Dropdown de Convenios: grid 2x2 premium (BEREC, ICANN, FCC, COMTELCA) + CTA "Ver todos".
 */
export default function ConveniosMenu({
  panelId,
  isOpen,
  onLinkClick,
  variant,
}: ConveniosMenuProps) {
  const isDesktop = variant === "desktop";

  if (isDesktop) {
    return (
      <div
        id={panelId}
        role="region"
        aria-label="Convenios"
        className={[
          "absolute left-0 right-0 top-full z-50 w-full transition-[visibility,opacity,transform] duration-150 motion-reduce:transition-none",
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-0.5 opacity-0",
        ].join(" ")}
        style={{
          background: "var(--mega-panel-bg)",
          borderBottom: "var(--mega-panel-border-bottom)",
          boxShadow: "var(--mega-panel-shadow)",
        }}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--mega-wrapper-max)",
            paddingTop: "var(--mega-padding-y-top)",
            paddingBottom: "var(--mega-padding-y-bottom)",
            paddingLeft: "var(--mega-padding-x)",
            paddingRight: "var(--mega-padding-x)",
          }}
        >
          <h3
            className="mega-panel-subheader uppercase"
            style={{ marginTop: 0, fontFamily: "var(--token-font-body)" }}
          >
            Convenios
          </h3>

          {/* Grid 2x2: convenios como bloques premium */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              maxWidth: "640px",
            }}
          >
            {convenios.map((c) => (
              <Link
                key={c.slug}
                to={`/convenios/${c.slug}`}
                onClick={onLinkClick}
                className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-[var(--regu-blue)] hover:bg-[rgba(68,137,198,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regu-blue)] focus-visible:ring-offset-2"
                style={{
                  borderColor: "var(--regu-gray-100)",
                  fontFamily: "var(--token-font-body)",
                }}
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-white"
                  style={{ boxShadow: "0 1px 4px rgba(22,61,89,0.08)" }}
                >
                  <img
                    src={c.logoSrc}
                    alt=""
                    className="h-9 w-9 object-contain"
                    style={{ maxWidth: "40px" }}
                  />
                </div>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "var(--mega-link-size)",
                    color: "var(--regu-gray-900)",
                  }}
                >
                  {c.acronym}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA integrado */}
          <div
            className="mt-5 border-t pt-4"
            style={{ borderColor: "var(--regu-gray-100)" }}
          >
            <Link
              to="/convenios"
              onClick={onLinkClick}
              className="inline-flex items-center font-semibold transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regu-blue)] focus-visible:ring-offset-2"
              style={{
                fontSize: "var(--mega-child-size)",
                color: "var(--regu-blue)",
                textUnderlineOffset: 4,
              }}
            >
              Ver todos los convenios
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Mobile: lista compacta */
  const linkClass =
    "inline-flex items-center gap-3 w-full py-3 px-0 text-left rounded-md transition-colors hover:text-[var(--regu-blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--token-accent)]";
  const linkStyle = {
    fontFamily: "var(--token-font-body)",
    fontSize: "var(--mega-child-size)",
    fontWeight: 600,
    color: "var(--regu-gray-900)",
    lineHeight: 1.45,
    textUnderlineOffset: 4,
  } as React.CSSProperties;

  return (
    <div id={panelId} className="space-y-0 border-t py-2" style={{ borderColor: "var(--mega-divider)" }}>
      <ul className="space-y-0 list-none p-0 m-0">
        {convenios.map((c) => (
          <li key={c.slug} className="list-none m-0">
            <Link to={`/convenios/${c.slug}`} onClick={onLinkClick} className={linkClass} style={linkStyle}>
              <img src={c.logoSrc} alt="" className="h-8 w-8 flex-shrink-0 rounded object-contain" style={{ maxWidth: "32px" }} />
              <span>{c.acronym}</span>
            </Link>
          </li>
        ))}
        <li className="list-none m-0 mt-4 pt-3 border-t" style={{ borderColor: "var(--regu-gray-100)" }}>
          <Link to="/convenios" onClick={onLinkClick} className={linkClass} style={{ ...linkStyle, fontWeight: 700, color: "var(--regu-blue)" }}>
            Ver todos los convenios
          </Link>
        </li>
      </ul>
    </div>
  );
}
