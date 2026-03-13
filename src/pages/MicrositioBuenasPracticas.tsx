import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  categories,
  countries,
  type Category,
} from "@/data/buenasPracticas/countries";
import CountrySelector from "@/components/buenasPracticas/CountrySelector";
import CategoryTabs from "@/components/buenasPracticas/CategoryTabs";
import ComparisonPanel from "@/components/buenasPracticas/ComparisonPanel";
import { Globe, BarChart2 } from "lucide-react";

export default function MicrositioBuenasPracticas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCountryA, setSelectedCountryA] = useState<string | null>(
    "rep_dominicana"
  );
  const [selectedCountryB, setSelectedCountryB] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const countryA = countries.find((c) => c.id === selectedCountryA) ?? null;
  const countryB = countries.find((c) => c.id === selectedCountryB) ?? null;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FAFBFC",
        borderTop: "1px solid rgba(22,61,89,0.07)",
      }}
    >
      {/* 4px accent bar */}
      <div style={{ height: 4, background: "var(--regu-blue)", width: "100%" }} />

      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "0 24px 72px",
        }}
      >
        {/* Page header */}
        <header style={{ padding: "44px 0 32px", borderBottom: "1px solid rgba(22,61,89,0.08)", marginBottom: 36 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
            <Link
              to="/"
              style={{ fontSize: "0.75rem", color: "var(--regu-gray-400)", textDecoration: "none" }}
              className="hover:underline"
            >
              Inicio
            </Link>
            <span style={{ fontSize: "0.75rem", color: "var(--regu-gray-300)" }}>/</span>
            <Link
              to="/gestion"
              style={{ fontSize: "0.75rem", color: "var(--regu-gray-400)", textDecoration: "none" }}
              className="hover:underline"
            >
              Recursos
            </Link>
            <span style={{ fontSize: "0.75rem", color: "var(--regu-gray-300)" }}>/</span>
            <span style={{ fontSize: "0.75rem", color: "var(--regu-blue)", fontWeight: 600 }}>
              Buenas prácticas
            </span>
          </nav>

          {/* Eyebrow */}
          <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--regu-gray-400)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Globe size={12} style={{ color: "var(--regu-blue)" }} />
            Observatorio regulatorio · REGULATEL
          </p>

          {/* Accent bar + title */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 4, minHeight: 36, borderRadius: 2, background: "var(--regu-blue)", flexShrink: 0, marginTop: 4 }} />
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
                Buenas Prácticas Regulatorias
              </h1>
              <p
                style={{
                  marginTop: 10,
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "var(--regu-gray-500)",
                  maxWidth: 640,
                }}
              >
                Compare prácticas regulatorias de telecomunicaciones entre países
                miembros de REGULATEL por categoría temática.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { icon: <Globe size={14} />, label: `${countries.length} países miembros` },
              { icon: <BarChart2 size={14} />, label: `${categories.length} categorías de análisis` },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", color: "var(--regu-gray-500)" }}>
                <span style={{ color: "var(--regu-blue)" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </header>

        {/* Country selectors */}
        <section className="obsControls" style={{ marginBottom: 32 }}>
          <div className="countryGroup">
            <CountrySelector
              countries={countries}
              selectedCountryId={selectedCountryA}
              onSelectCountry={setSelectedCountryA}
              label="País principal (A)"
            />
          </div>
          <div className="countryGroup">
            <CountrySelector
              countries={countries.filter((c) => c.id !== selectedCountryA)}
              selectedCountryId={selectedCountryB}
              onSelectCountry={setSelectedCountryB}
              label="País comparador (B)"
              comparisonMode
            />
          </div>
        </section>

        {/* Category tabs + comparison */}
        {countryA && countryB ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Category tabs card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(22,61,89,0.10)",
                borderRadius: 16,
                padding: "20px 24px 0",
                boxShadow: "0 2px 6px rgba(22,61,89,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--regu-gray-400)",
                  marginBottom: 12,
                }}
              >
                Categoría de análisis
              </p>
              <CategoryTabs
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                countryAName={countryA.name}
                countryBName={countryB.name}
              />
            </div>

            {/* Comparison panel */}
            <ComparisonPanel
              countryA={countryA}
              countryB={countryB}
              category={selectedCategory}
            />
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(22,61,89,0.10)",
              borderRadius: 16,
              padding: "56px 24px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(22,61,89,0.04)",
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(68,137,198,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Globe size={24} style={{ color: "var(--regu-blue)" }} />
            </div>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--regu-navy)", marginBottom: 6 }}>
              Seleccione dos países para comparar
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--regu-gray-500)" }}>
              Elija un país principal (A) y un país comparador (B) en los selectores de arriba.
            </p>
          </div>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(22,61,89,0.08)", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(22,61,89,0.12)",
              background: "#fff",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--regu-gray-700)",
              textDecoration: "none",
              transition: "border-color 0.15s, color 0.15s",
            }}
            className="hover:border-[var(--regu-blue)] hover:text-[var(--regu-blue)]"
          >
            ← Volver a inicio
          </Link>
          <Link
            to="/miembros"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              background: "var(--regu-blue)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Ver todos los miembros →
          </Link>
        </div>
      </div>
    </div>
  );
}
