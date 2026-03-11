/**
 * Fondo institucional del hero REGULATEL.
 * Red regional de cooperación: silueta sutil de la región + nodos y conexiones
 * con composición intencional (foro, articulación, telecomunicaciones).
 */
export default function HeroInstitucionalBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full object-cover"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {/* Líneas: gradiente suave institucional (navy + blanco) */}
        <linearGradient id="hero-line-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.09)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.09)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Nodos: teal institucional suave, más editorial */}
        <radialGradient id="hero-node-institucional" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(51,164,180,0.2)" />
          <stop offset="70%" stopColor="rgba(51,164,180,0.07)" />
          <stop offset="100%" stopColor="rgba(51,164,180,0)" />
        </radialGradient>
        {/* Nodo central (coordinación / foro): un poco más presente */}
        <radialGradient id="hero-node-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(68,137,198,0.18)" />
          <stop offset="70%" stopColor="rgba(68,137,198,0.05)" />
          <stop offset="100%" stopColor="rgba(68,137,198,0)" />
        </radialGradient>
      </defs>

      {/* Mapa regional: Sudamérica simplificado, estilo punteado institucional — referencia latinoamericana */}
      <path
        d="M 380 95 L 420 100 Q 520 85 640 110 Q 780 140 820 200 Q 860 280 840 380 Q 800 480 680 520 Q 520 540 380 500 Q 260 450 220 350 Q 200 240 260 150 Q 320 100 380 95 Z"
        fill="none"
        stroke="rgba(255,255,255,0.055)"
        strokeWidth="0.9"
        strokeLinejoin="round"
        strokeDasharray="5 12"
        opacity="1"
      />

      {/* Silueta muy tenue de la región: relleno suave para anclar el mapa */}
      <path
        d="M 380 95 L 420 100 Q 520 85 640 110 Q 780 140 820 200 Q 860 280 840 380 Q 800 480 680 520 Q 520 540 380 500 Q 260 450 220 350 Q 200 240 260 150 Q 320 100 380 95 Z"
        fill="rgba(255,255,255,0.018)"
        stroke="none"
        opacity="1"
      />

      {/* Conexiones: 3 arcos con intención (articulación regional, no gráfico aleatorio) */}
      {/* Arco norte–centro: cooperación vertical */}
      <path
        d="M 280 180 Q 420 120 560 240"
        fill="none"
        stroke="url(#hero-line-institucional)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Arco centro–este: conectividad transversal */}
      <path
        d="M 560 240 Q 720 200 900 280"
        fill="none"
        stroke="url(#hero-line-institucional)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Arco sur: integración regional */}
      <path
        d="M 400 340 Q 580 380 780 320"
        fill="none"
        stroke="url(#hero-line-institucional)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Nodos: posiciones que sugieren la región (no distribución aleatoria) */}
      <circle cx="280" cy="180" r="12" fill="url(#hero-node-institucional)" />
      <circle cx="420" cy="260" r="10" fill="url(#hero-node-institucional)" />
      {/* Nodo central = foro / punto de articulación */}
      <circle cx="560" cy="240" r="18" fill="url(#hero-node-hub)" />
      <circle cx="400" cy="340" r="11" fill="url(#hero-node-institucional)" />
      <circle cx="720" cy="300" r="10" fill="url(#hero-node-institucional)" />
      <circle cx="900" cy="280" r="12" fill="url(#hero-node-institucional)" />
      <circle cx="780" cy="320" r="9" fill="url(#hero-node-institucional)" />
    </svg>
  );
}
