import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";

/**
 * Declaración de privacidad del portal REGULATEL.
 * Contenido institucional sobre tratamiento de datos personales.
 */
export default function DeclaracionPrivacidad() {
  return (
    <>
      <PageHero
        title="DECLARACIÓN DE PRIVACIDAD"
        breadcrumb={[{ label: "Declaración de privacidad" }]}
      />
      <div
        className="w-full py-16 md:py-24"
        style={{
          background: "linear-gradient(to bottom, var(--regu-offwhite), var(--regu-gray-100))",
          fontFamily: "var(--token-font-body)",
        }}
      >
        <div
          className="mx-auto w-full px-4 md:px-8 lg:px-10"
          style={{ maxWidth: "1200px" }}
        >
          <div
            className="rounded-2xl border bg-white p-8 md:p-12 lg:p-14 shadow-sm"
            style={{
              borderColor: "var(--regu-gray-100)",
              boxShadow: "0 4px 24px rgba(22, 61, 89, 0.06)",
            }}
          >
            <p
              className="mb-10 text-base leading-relaxed text-[var(--regu-gray-700)] md:text-lg"
              style={{ fontFamily: "var(--token-font-body)" }}
            >
              El Foro Latinoamericano de Entes Reguladores de Telecomunicaciones (REGULATEL) se compromete a proteger la privacidad de las personas que utilizan este portal y de quienes facilitan sus datos a través de formularios de suscripción, contacto o demás canales oficiales. La presente declaración describe cómo recopilamos, utilizamos y protegemos la información personal, en cumplimiento de principios de transparencia y buenas prácticas institucionales.
            </p>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                1. Finalidad de la recopilación de datos
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                Los datos personales que REGULATEL recaba a través de este sitio tienen como finalidad la gestión institucional del Foro, incluyendo el envío de comunicaciones sobre actividades, noticias y eventos; la atención de consultas y solicitudes de contacto; la administración de suscripciones a boletines o listas de distribución; y el cumplimiento de obligaciones derivadas de la participación en las actividades del Foro. No utilizamos la información para fines distintos de los indicados ni la cedemos a terceros con propósitos comerciales.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                2. Datos que pueden recopilarse
              </h2>
              <p className="mb-4 text-base leading-relaxed text-[var(--regu-gray-700)]">
                En formularios de suscripción, contacto o registro podremos solicitar, según el caso, datos tales como:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-[var(--regu-gray-700)]">
                <li>Nombre y apellidos</li>
                <li>Correo electrónico</li>
                <li>País o institución de pertenencia</li>
                <li>Cargo o función (cuando sea relevante para la gestión de la solicitud)</li>
                <li>Cualquier otro dato que el titular facilite voluntariamente en mensajes o formularios</li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-[var(--regu-gray-700)]">
                Solo recopilamos los datos necesarios para la finalidad indicada en cada formulario. Los campos obligatorios se señalan como tales; el resto son opcionales.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                3. Uso de la información
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                La información proporcionada se utiliza exclusivamente para los fines descritos en cada canal de recogida: envío de actualizaciones del portal, respuestas a consultas, gestión de suscripciones a listas de medios o comunicaciones institucionales, y mejora de los servicios del Foro. REGULATEL no utiliza los datos personales para publicidad comercial ni los transmite a terceros para fines de marketing.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                4. Conservación y protección de datos
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                Conservamos los datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recabados y, cuando corresponda, para atender obligaciones legales o institucionales. Se adoptan medidas técnicas y organizativas adecuadas para proteger la información frente a accesos no autorizados, pérdida o alteración, en consonancia con las prácticas propias de una organización institucional.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                5. Derechos del titular de los datos
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                Las personas que hayan facilitado sus datos a REGULATEL pueden, en los términos aplicables, ejercer los derechos de acceso, rectificación, supresión o limitación del tratamiento, así como oponerse al tratamiento o solicitar la portabilidad de sus datos. Para ejercer estos derechos o formular consultas en materia de privacidad, puede utilizarse el canal de contacto indicado al final de esta declaración.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                6. Baja de comunicaciones
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                Quienes reciban comunicaciones por correo electrónico (boletines, avisos o listas de distribución) pueden darse de baja en cualquier momento mediante el enlace de baja que se incluye en dichos mensajes, o bien solicitando la baja directamente a través del canal de contacto. La baja no afectará al tratamiento de los datos cuando su conservación sea necesaria por obligación legal o institucional.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                7. Uso limitado a fines institucionales
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                REGULATEL utiliza la información recabada únicamente en el ámbito de sus funciones como foro de entes reguladores de telecomunicaciones. No se realizan tratamientos masivos con fines comerciales ni se comparten datos con terceros para usos ajenos a la gestión institucional del Foro, salvo que la ley lo exija o el titular haya dado su consentimiento expreso.
              </p>
            </section>

            <section className="mb-10">
              <h2
                className="mb-4 text-lg font-bold text-[var(--regu-gray-900)] md:text-xl"
                style={{ fontFamily: "var(--token-font-heading)" }}
              >
                8. Contacto y consultas sobre privacidad
              </h2>
              <p className="text-base leading-relaxed text-[var(--regu-gray-700)]">
                Para cualquier consulta relacionada con el tratamiento de sus datos personales o con esta declaración de privacidad, puede dirigirse a la Secretaría Ejecutiva de REGULATEL a través de la sección de Contacto de este portal o por los canales oficiales que se indican en la misma. Atenderemos su solicitud con la diligencia debida y en consonancia con las prácticas institucionales del Foro.
              </p>
            </section>

            <p className="text-sm text-[var(--regu-gray-500)] border-t pt-8" style={{ borderColor: "var(--regu-gray-100)" }}>
              Última actualización: 2026. REGULATEL se reserva el derecho de actualizar esta declaración cuando sea necesario; se recomienda su consulta periódica.
            </p>
          </div>

          <nav
            className="mt-12 flex justify-center"
            aria-label="Navegación final"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition-colors bg-[#4489C6]/10 hover:bg-[#4489C6]/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regu-blue)] focus-visible:ring-offset-2"
              style={{ color: "var(--regu-blue)" }}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
              Volver a inicio
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
