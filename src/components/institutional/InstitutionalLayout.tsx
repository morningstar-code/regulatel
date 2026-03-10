import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";

const CONTENT_MAX_WIDTH = "1180px";

interface InstitutionalLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; path?: string }[];
  children: ReactNode;
}

/**
 * Layout institucional tipo BEREC/UE: hero + contenido con ancho máximo 1100px, spacing amplio.
 */
export default function InstitutionalLayout({
  title,
  subtitle,
  breadcrumb,
  children,
}: InstitutionalLayoutProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        description={undefined}
      />
      <div
        className="w-full py-12 md:py-16 lg:py-20"
        style={{
          fontFamily: "var(--token-font-body)",
          background: "linear-gradient(180deg, var(--regu-offwhite) 0%, var(--regu-gray-100) 100%)",
        }}
      >
        <div
          className="mx-auto px-4 md:px-6 lg:px-8"
          style={{ maxWidth: CONTENT_MAX_WIDTH }}
        >
          {children}
          <footer
            className="mt-20 md:mt-24 lg:mt-28 pt-12 md:pt-14 pb-4"
            aria-label="Cierre de página"
          >
            <div
              className="h-px w-full mb-12 md:mb-14"
              style={{ backgroundColor: "var(--regu-gray-200)" }}
              aria-hidden
            />
            <nav aria-label="Navegación final">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors border-2 hover:bg-[#4489C6]/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regu-blue)] focus-visible:ring-offset-2"
                style={{
                  color: "var(--regu-blue)",
                  borderColor: "var(--regu-blue)",
                  backgroundColor: "rgba(68, 137, 198, 0.08)",
                }}
              >
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
                Volver a inicio
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
}

export function InstitutionalSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-14 md:mb-16 lg:mb-20 ${className}`}>
      {children}
    </section>
  );
}

export function InstitutionalH2({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-xl md:text-2xl font-bold mb-6"
      style={{ color: "var(--regu-gray-900)" }}
    >
      {children}
    </h2>
  );
}

export function InstitutionalCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 transition-all duration-200 hover:shadow-[var(--token-shadow-hover)] ${className}`}
      style={{
        backgroundColor: "var(--regu-white)",
        borderColor: "var(--regu-gray-100)",
        boxShadow: "var(--token-shadow-card)",
      }}
    >
      {children}
    </div>
  );
}
