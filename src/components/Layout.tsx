/**
 * Portal REGULATEL – Layout principal (header, contenido, footer).
 * Versión inicial desarrollada por Diego Cuervo (INDOTEL). 2026.
 */
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderMegaMenu from "@/components/layout/HeaderMegaMenu";

interface LayoutProps {
  children: ReactNode;
}

const footerLinks = {
  institucional: [
    { label: "Qué somos", to: "/que-somos" },
    { label: "Autoridades actuales", to: "/autoridades" },
    { label: "Miembros", to: "/miembros" },
    { label: "Comité Ejecutivo", to: "/comite-ejecutivo" },
    { label: "Grupos de Trabajo", to: "/grupos-de-trabajo" },
    { label: "Visión y Misión", to: "/vision-mision" },
  ],
  contenido: [
    { label: "Noticias", to: "/noticias" },
    { label: "Eventos", to: "/eventos" },
    { label: "Convenios", to: "/convenios" },
    { label: "Gestión de documentos", to: "/gestion" },
    { label: "Buenas prácticas", to: "/micrositio-buenas-practicas" },
  ],
  soporte: [
    { label: "Contacto", to: "/contacto" },
    { label: "Área de miembros", to: "/login" },
    { label: "Declaración de privacidad", to: "/declaracion-de-privacidad" },
  ],
};

const FOOTER_LOGO_SRC = "/images/regulatel-logo.png";

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [footerLogoError, setFooterLogoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen text-slate-900" style={{ backgroundColor: "var(--token-page-bg)" }}>
      <HeaderMegaMenu />
      <div id="contentRoot">
        <main>{children}</main>

        <footer
          style={{
            background: "var(--regu-navy-deep)",
            fontFamily: "var(--token-font-body)",
            borderTop: "4px solid var(--regu-blue)",
          }}
        >
          {/* Main footer grid: 1 col móvil, 4 cols desktop */}
          <div
            style={{
              maxWidth: "var(--token-container-max)",
              margin: "0 auto",
              gap: "40px",
            }}
            className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] px-4 py-10 md:px-6 md:py-[52px] md:pb-10 w-full"
          >
            {/* Brand column: logo como elemento principal (texto solo si falla la imagen) */}
            <div>
              <Link to="/" className="inline-block" style={{ marginBottom: 16 }} aria-label="REGULATEL - Ir al inicio">
                {footerLogoError ? (
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "0.02em",
                    }}
                  >
                    REGULATEL
                  </span>
                ) : (
                  <img
                    src={FOOTER_LOGO_SRC}
                    alt="REGULATEL - Foro Latinoamericano de Entes Reguladores de Telecomunicaciones"
                    style={{
                      height: 44,
                      width: "auto",
                      maxWidth: "180px",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                      opacity: 0.95,
                    }}
                    onError={() => setFooterLogoError(true)}
                  />
                )}
              </Link>
              <p style={{ fontSize: "0.8125rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)", maxWidth: 240, marginBottom: 20 }}>
                Foro Latinoamericano de Entes Reguladores de Telecomunicaciones.
              </p>
              {/* Lime accent divider */}
              <div style={{ width: 32, height: 3, borderRadius: 2, background: "var(--regu-lime)", marginBottom: 20 }} />
              {/* Social row */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  {
                    href: "https://www.youtube.com/@Regulatel",
                    label: "YouTube",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.5 6.2s-.3-1.9-1.1-2.7c-1-.9-2.2-.9-2.7-1C17.1 2.3 12 2.3 12 2.3s-5.1 0-7.7.2c-.5.1-1.7.1-2.7 1C.8 4.3.5 6.2.5 6.2S.2 8.4.2 10.6v2.1c0 2.2.3 4.4.3 4.4s.3 1.9 1.1 2.7c1 .9 2.4.9 3 1 2.2.2 9.4.2 9.4.2s5.1 0 7.7-.2c.5-.1 1.7-.1 2.7-1 .8-.8 1.1-2.7 1.1-2.7s.3-2.2.3-4.4v-2.1c0-2.2-.3-4.4-.3-4.4zM9.7 15.5V8.4l7.3 3.6-7.3 3.5z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.flickr.com/photos/indotel/albums/72177720330864280/",
                    label: "Flickr",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm8 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://x.com/regulatel",
                    label: "X (Twitter)",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.linkedin.com/company/regulatel/",
                    label: "LinkedIn",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.60)",
                      transition: "background 0.15s, color 0.15s",
                      textDecoration: "none",
                    }}
                    className="hover:!bg-[rgba(255,255,255,0.18)] hover:!text-white"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Institucional links */}
            <div>
              <h3 style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>
                Quiénes somos
              </h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {footerLinks.institucional.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.60)", textDecoration: "none", transition: "color 0.15s" }}
                    className="hover:!text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contenido links */}
            <div>
              <h3 style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>
                Contenido
              </h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {footerLinks.contenido.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.60)", textDecoration: "none", transition: "color 0.15s" }}
                    className="hover:!text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Soporte links */}
            <div>
              <h3 style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>
                Soporte
              </h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {footerLinks.soporte.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.60)", textDecoration: "none", transition: "color 0.15s" }}
                    className="hover:!text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6 md:py-[18px]"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              maxWidth: "var(--token-container-max)",
              margin: "0 auto",
            }}
          >
            <p className="text-[0.7rem] md:text-[0.75rem] text-center md:text-left" style={{ color: "rgba(255,255,255,0.35)", margin: 0 }}>
              &copy; {new Date().getFullYear()} REGULATEL · Foro Latinoamericano de Entes Reguladores de Telecomunicaciones
            </p>
            <Link
              to="/declaracion-de-privacidad"
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.15s" }}
              className="hover:!text-white"
            >
              Declaración de privacidad
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
