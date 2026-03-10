import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Globe, ExternalLink, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Logos locales desde gallery (public/images/logos y public/images/comite-ejecutivo)
const logoUrlMap: Record<string, string> = {
  'sub-secretaria-telecom': '/images/logos/sub-secretaria-telecom.png',
  'anatel': '/images/comite-ejecutivo/anatel.png',
  'att': '/images/logos/att.png',
  'enacom': '/images/logos/enacom.png',
  'sutel': '/images/logos/sutel.png',
  'min-com': '/images/logos/min-com.png',
  'agcom': '/images/logos/agcom.png',
  'arcotel': '/images/logos/arcotel.png',
  'crc': '/images/logos/crc.png',
  'cnmc': '/images/logos/cnmc.png',
  'sit': '/images/logos/sit.png',
  'conatel': '/images/logos/conatel.png',
  'indotel': '/images/logos/indotel.png',
  'ift': '/images/logos/ift.png',
  'subtel': '/images/logos/subtel.png',
  'osiptel': '/images/logos/osiptel.png',
  'conatel-gt': '/images/logos/conatel-gt.png',
  'conatel-py': '/images/logos/conatel-py.png',
  'anacom': '/images/logos/anacom.png',
  'net': '/images/logos/net.png',
  'ursec': '/images/logos/ursec.png',
  'conatel-ve': '/images/logos/conatel-ve.png',
  'asep': '/images/logos/asep.png',
  'telcor': '/images/logos/telcor.png',
};

// Componente inteligente para cargar logos con múltiples intentos
const LogoImage: React.FC<{ name: string; route: string }> = ({ name, route }) => {
  const [imgSrc, setImgSrc] = React.useState<string>('');
  const [hasError, setHasError] = React.useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const routeKey = route.replace('/', '');
  const possibleUrls = React.useMemo(() => {
    const url = logoUrlMap[routeKey];
    return url ? [url] : [];
  }, [routeKey]);
  
  useEffect(() => {
    if (possibleUrls.length > 0) {
      setImgSrc(possibleUrls[0]);
      setCurrentUrlIndex(0);
      setHasError(false);
    }
  }, [possibleUrls]);
  
  const handleError = () => {
    if (currentUrlIndex < possibleUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1;
      setCurrentUrlIndex(nextIndex);
      setImgSrc(possibleUrls[nextIndex]);
    } else {
      setHasError(true);
    }
  };
  
  if (hasError || !imgSrc) {
    return (
      <div className="text-center w-full">
        <div className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--regu-gray-900)' }}>{name}</div>
      </div>
    );
  }
  
  return (
    <img 
      src={imgSrc} 
      alt={`${name} logo`}
      className="max-w-full max-h-full object-contain"
      onError={handleError}
      loading="lazy"
    />
  );
};

interface AuthorityInfo {
  name: string;
  role: string;
}

interface EnteInfo {
  name: string;
  country: string;
  fullName?: string;
  displayTitle?: string;
  route: string;
  externalUrl: string;
  website?: string;
  description?: string;
  authorities?: AuthorityInfo[];
}

// Mapeo de sitios web oficiales de cada ente regulador
const websiteMap: Record<string, string> = {
  'enacom': 'https://www.enacom.gob.ar',
  'att': 'https://www.att.gob.bo',
  'anatel': 'https://www.gov.br/anatel',
  'subtel': 'https://www.subtel.gob.cl',
  'crc': 'https://www.crcom.gov.co',
  'sutel': 'https://www.sutel.go.cr',
  'arcotel': 'https://www.arcotel.gob.ec',
  'cnmc': 'https://www.cnmc.es',
  'agcom': 'https://www.agcom.it',
  'conatel': 'https://www.conatel.gob.hn',
  'indotel': 'https://www.indotel.gob.do',
  'ift': 'https://www.ift.org.mx',
  'osiptel': 'https://www.osiptel.gob.pe',
  'conatel-gt': 'https://www.conatel.gob.gt',
  'sit': 'https://www.siget.gob.sv',
  'min-com': 'https://www.mincom.gob.cu',
  'sub-secretaria-telecom': 'https://www.argentina.gob.ar/secretaria-de-innovacion-publica/subsecretaria-de-telecomunicaciones',
  'conatel-py': 'https://www.conatel.gov.py',
  'anacom': 'https://www.anacom.pt',
  'net': 'https://www.jrsp.pr.gov',
  'ursec': 'https://www.ursec.gub.uy',
  'conatel-ve': 'https://www.conatel.gob.ve',
  'asep': 'https://www.asep.gob.pa',
  'telcor': 'https://www.telcor.gob.ni',
};

// Mapeo de autoridades de cada ente regulador
const authoritiesMap: Record<string, AuthorityInfo[]> = {
  'enacom': [
    { name: 'Juan Martín Ozores', role: 'Interventor' }
  ],
  'att': [
    { name: 'Carlos Alberto Agreda Lema', role: 'Director Ejecutivo' }
  ],
  'anatel': [
    { name: 'Carlos Manuel Baigorri', role: 'Presidente' }
  ],
  'subtel': [
    { name: 'Claudio Araya San Martín', role: 'Subsecretario' }
  ],
  'crc': [
    { name: 'Felipe Augusto Díaz Suaza', role: 'Director Ejecutivo' }
  ],
  'sutel': [
    { name: 'Carlos Watson Carazo', role: 'Presidente' }
  ],
  'arcotel': [
    { name: 'Jorge Roberto Hoyos Zavala', role: 'Director Ejecutivo' }
  ],
  'sit': [
    { name: 'Manuel Aguilar', role: 'Superintendente' }
  ],
  'cnmc': [
    { name: 'Alejandra de Iturriaga', role: 'Directora de Telecomunicaciones y Servicios Audiovisuales' },
    { name: 'Bernardo Lorenzo', role: 'Miembro del Consejo' }
  ],
  'conatel': [
    { name: 'Lorenzo Sauceda Calix', role: 'Presidente' }
  ],
  'agcom': [
    { name: 'Giacomo Lasorella', role: 'Presidente' }
  ],
  'osiptel': [
    { name: 'Jesus Guillén Marroquín', role: 'Presidente ejecutivo (e)' }
  ],
  'conatel-py': [
    { name: 'Juan Carlos Duarte Duré', role: 'Presidente' }
  ],
  'anacom': [
    { name: 'Sandra Maximiano', role: 'Presidente del Consejo de Administración' }
  ],
  'net': [
    { name: 'Ferdinand A. Ramos Soegaard', role: 'Presidente de la Junta Reglamentadora' }
  ],
  'ursec': [
    { name: 'Gonzalo Balseiro', role: 'Presidente' },
    { name: 'Bruno Fernandez', role: 'Vicepresidente' },
    { name: 'Leandro Claramunt', role: 'Director' }
  ],
  'conatel-ve': [
    { name: 'Jorge Elieser Márquez Monsalve', role: 'Presidente' }
  ],
  'asep': [
    { name: 'Zelmar Rodríguez Crespo', role: 'Administradora General' }
  ],
  'telcor': [
    { name: 'Nahima Díaz Flores', role: 'Directora General' }
  ],
  'indotel': [
    { name: 'Guido Orlando Gómez Mazara', role: 'Presidente del Consejo Directivo' },
    { name: 'Julissa Cruz', role: 'Directora Ejecutiva' }
  ],
  'ift': [
    { name: 'Norma Solano Rodríguez', role: 'Presidente' }
  ],
  'conatel-gt': [
    { name: 'Herbert Armando Rubio Montes', role: 'Superintendente' }
  ],
  'sub-secretaria-telecom': [
    // Información no disponible en regulatel.org/miembros
  ],
  'min-com': [
    { name: 'Wilfredo López Rodríguez', role: 'Director de Regulaciones' }
  ],
};

const entesInfo: Record<string, EnteInfo> = {
  'sub-secretaria-telecom': {
    name: 'SUB SECRETARIA TELECOM',
    country: 'Argentina',
    route: '/sub-secretaria-telecom',
    externalUrl: 'https://www.regulatel.org/sub-secretaria-telecom',
    website: websiteMap['sub-secretaria-telecom'],
    description: 'Subsecretaría de Telecomunicaciones de Argentina.'
  },
  'anatel': {
    name: 'ANATEL',
    country: 'Brasil',
    fullName: 'Agência Nacional de Telecomunicações',
    route: '/anatel',
    externalUrl: 'https://www.regulatel.org/anatel',
    website: websiteMap['anatel'],
    description: 'Agência Nacional de Telecomunicações de Brasil.',
    authorities: authoritiesMap['anatel']
  },
  'att': {
    name: 'ATT',
    country: 'Bolivia',
    fullName: 'Autoridad de Regulación y Fiscalización de Telecomunicaciones y Transportes',
    route: '/att',
    externalUrl: 'https://www.regulatel.org/att',
    website: websiteMap['att'],
    description: 'Autoridad de Regulación y Fiscalización de Telecomunicaciones y Transportes de Bolivia.',
    authorities: authoritiesMap['att']
  },
  'enacom': {
    name: 'ENACOM',
    country: 'Argentina',
    fullName: 'Ente Nacional de Comunicaciones',
    route: '/enacom',
    externalUrl: 'https://www.regulatel.org/enacom',
    website: websiteMap['enacom'],
    description: 'Ente Nacional de Comunicaciones de Argentina.',
    authorities: authoritiesMap['enacom']
  },
  'sutel': {
    name: 'SUTEL',
    country: 'Costa Rica',
    fullName: 'Superintendencia de Telecomunicaciones',
    route: '/sutel',
    externalUrl: 'https://www.regulatel.org/sutel',
    website: websiteMap['sutel'],
    description: 'Superintendencia de Telecomunicaciones de Costa Rica.',
    authorities: authoritiesMap['sutel']
  },
  'min-com': {
    name: 'MINCOM',
    country: 'Cuba',
    fullName: 'Ministerio de Comunicaciones',
    displayTitle: 'MINCOM – CUBA',
    route: '/min-com',
    externalUrl: 'https://www.mincom.gob.cu',
    website: websiteMap['min-com'],
    description: 'Ministerio de Comunicaciones de Cuba.',
    authorities: authoritiesMap['min-com']
  },
  'agcom': {
    name: 'AGCOM',
    country: 'Italia',
    fullName: 'Autorità per le Garanzie nelle Comunicazioni',
    displayTitle: 'AGCOM – ITALIA',
    route: '/agcom',
    externalUrl: 'https://www.regulatel.org/agcom',
    website: websiteMap['agcom'],
    description: 'Autorità per le Garanzie nelle Comunicazioni de Italia.',
    authorities: authoritiesMap['agcom']
  },
  'arcotel': {
    name: 'ARCOTEL',
    country: 'Ecuador',
    fullName: 'Agencia de Regulación y Control de las Telecomunicaciones',
    displayTitle: 'ARCOTEL – ECUADOR',
    route: '/arcotel',
    externalUrl: 'https://www.regulatel.org/arcotel',
    website: websiteMap['arcotel'],
    description: 'Agencia de Regulación y Control de las Telecomunicaciones de Ecuador.',
    authorities: authoritiesMap['arcotel']
  },
  'crc': {
    name: 'CRC',
    country: 'Colombia',
    fullName: 'Comisión de Regulación de Comunicaciones',
    route: '/crc',
    externalUrl: 'https://www.regulatel.org/crc',
    website: websiteMap['crc'],
    description: 'Comisión de Regulación de Comunicaciones de Colombia.',
    authorities: authoritiesMap['crc']
  },
  'cnmc': {
    name: 'CNMC',
    country: 'España',
    fullName: 'Comisión Nacional de los Mercados y la Competencia',
    route: '/cnmc',
    externalUrl: 'https://www.regulatel.org/cnmc',
    website: websiteMap['cnmc'],
    description: 'Comisión Nacional de los Mercados y la Competencia de España.',
    authorities: authoritiesMap['cnmc']
  },
  'sit': {
    name: 'SIGET',
    country: 'El Salvador',
    fullName: 'Superintendencia General de Electricidad y Telecomunicaciones',
    displayTitle: 'SIGET – EL SALVADOR',
    route: '/sit',
    externalUrl: 'https://www.siget.gob.sv',
    website: websiteMap['sit'],
    description: 'Superintendencia General de Electricidad y Telecomunicaciones de El Salvador.',
    authorities: authoritiesMap['sit']
  },
  'conatel': {
    name: 'CONATEL',
    country: 'Honduras',
    fullName: 'Comisión Nacional de Telecomunicaciones',
    route: '/conatel',
    externalUrl: 'https://www.regulatel.org/conatel',
    website: websiteMap['conatel'],
    description: 'Comisión Nacional de Telecomunicaciones de Honduras.',
    authorities: authoritiesMap['conatel']
  },
  'indotel': {
    name: 'INDOTEL',
    country: 'República Dominicana',
    fullName: 'Instituto Dominicano de las Telecomunicaciones',
    route: '/indotel',
    externalUrl: 'https://www.regulatel.org/indotel',
    website: websiteMap['indotel'],
    description: 'Instituto Dominicano de las Telecomunicaciones.',
    authorities: authoritiesMap['indotel']
  },
  'ift': {
    name: 'IFT',
    country: 'México',
    fullName: 'Instituto Federal de Telecomunicaciones',
    route: '/ift',
    externalUrl: 'https://www.regulatel.org/ift',
    website: websiteMap['ift'],
    description: 'Instituto Federal de Telecomunicaciones de México.',
    authorities: authoritiesMap['ift']
  },
  'subtel': {
    name: 'SUBTEL',
    country: 'Chile',
    fullName: 'Subsecretaría de Telecomunicaciones',
    route: '/subtel',
    externalUrl: 'https://www.regulatel.org/subtel',
    website: websiteMap['subtel'],
    description: 'Subsecretaría de Telecomunicaciones de Chile.',
    authorities: authoritiesMap['subtel']
  },
  'osiptel': {
    name: 'OSIPTEL',
    country: 'Perú',
    fullName: 'Organismo Supervisor de Inversión Privada en Telecomunicaciones',
    displayTitle: 'OSIPTEL – PERÚ',
    route: '/osiptel',
    externalUrl: 'https://www.osiptel.gob.pe',
    website: websiteMap['osiptel'],
    description: 'Organismo Supervisor de Inversión Privada en Telecomunicaciones de Perú.',
    authorities: authoritiesMap['osiptel']
  },
  'conatel-py': {
    name: 'CONATEL',
    country: 'Paraguay',
    fullName: 'Comisión Nacional de Telecomunicaciones',
    displayTitle: 'CONATEL – PARAGUAY',
    route: '/conatel-py',
    externalUrl: 'https://www.conatel.gov.py',
    website: websiteMap['conatel-py'],
    description: 'Comisión Nacional de Telecomunicaciones de Paraguay.',
    authorities: authoritiesMap['conatel-py']
  },
  'anacom': {
    name: 'ANACOM',
    country: 'Portugal',
    fullName: 'Autoridade Nacional de Comunicações',
    displayTitle: 'ANACOM – PORTUGAL',
    route: '/anacom',
    externalUrl: 'https://www.anacom.pt',
    website: websiteMap['anacom'],
    description: 'Autoridade Nacional de Comunicações de Portugal.',
    authorities: authoritiesMap['anacom']
  },
  'net': {
    name: 'NET',
    country: 'Puerto Rico',
    fullName: 'Negociado de Telecomunicaciones de Puerto Rico',
    displayTitle: 'NET – PUERTO RICO',
    route: '/net',
    externalUrl: 'https://www.jrsp.pr.gov',
    website: websiteMap['net'],
    description: 'Negociado de Telecomunicaciones de Puerto Rico.',
    authorities: authoritiesMap['net']
  },
  'ursec': {
    name: 'URSEC',
    country: 'Uruguay',
    fullName: 'Unidad Reguladora de Servicios de Comunicaciones',
    displayTitle: 'URSEC – URUGUAY',
    route: '/ursec',
    externalUrl: 'https://www.ursec.gub.uy',
    website: websiteMap['ursec'],
    description: 'Unidad Reguladora de Servicios de Comunicaciones de Uruguay.',
    authorities: authoritiesMap['ursec']
  },
  'conatel-ve': {
    name: 'CONATEL',
    country: 'Venezuela',
    fullName: 'Comisión Nacional de Telecomunicaciones',
    displayTitle: 'CONATEL – VENEZUELA',
    route: '/conatel-ve',
    externalUrl: 'https://www.conatel.gob.ve',
    website: websiteMap['conatel-ve'],
    description: 'Comisión Nacional de Telecomunicaciones de Venezuela.',
    authorities: authoritiesMap['conatel-ve']
  },
  'asep': {
    name: 'ASEP',
    country: 'Panamá',
    fullName: 'Autoridad Nacional de los Servicios Públicos',
    displayTitle: 'ASEP – PANAMÁ',
    route: '/asep',
    externalUrl: 'https://www.asep.gob.pa',
    website: websiteMap['asep'],
    description: 'Autoridad Nacional de los Servicios Públicos de Panamá.',
    authorities: authoritiesMap['asep']
  },
  'telcor': {
    name: 'TELCOR',
    country: 'Nicaragua',
    fullName: 'Instituto Nicaraguense de Telecomunicaciones y Correo',
    displayTitle: 'TELCOR – NICARAGUA',
    route: '/telcor',
    externalUrl: 'https://www.telcor.gob.ni',
    website: websiteMap['telcor'],
    description: 'Instituto Nicaraguense de Telecomunicaciones y Correo de Nicaragua.',
    authorities: authoritiesMap['telcor']
  },
  'conatel-gt': {
    name: 'CONATEL',
    country: 'Guatemala',
    fullName: 'Comisión Nacional de Telecomunicaciones',
    route: '/conatel-gt',
    externalUrl: 'https://www.regulatel.org/conatel-gt',
    website: websiteMap['conatel-gt'],
    description: 'Comisión Nacional de Telecomunicaciones de Guatemala.',
    authorities: authoritiesMap['conatel-gt']
  },
};

const EnteRegulador: React.FC = () => {
  const location = useLocation();
  const routePath = location.pathname;
  // Mapeo directo de rutas a claves
  const routeToKey: Record<string, string> = {
    '/sub-secretaria-telecom': 'sub-secretaria-telecom',
    '/anatel': 'anatel',
    '/att': 'att',
    '/enacom': 'enacom',
    '/sutel': 'sutel',
    '/min-com': 'min-com',
    '/agcom': 'agcom',
    '/arcotel': 'arcotel',
    '/crc': 'crc',
    '/cnmc': 'cnmc',
    '/sit': 'sit',
    '/conatel': 'conatel',
    '/indotel': 'indotel',
    '/ift': 'ift',
    '/subtel': 'subtel',
    '/osiptel': 'osiptel',
    '/conatel-gt': 'conatel-gt',
    '/conatel-py': 'conatel-py',
    '/anacom': 'anacom',
    '/net': 'net',
    '/ursec': 'ursec',
    '/conatel-ve': 'conatel-ve',
    '/asep': 'asep',
    '/telcor': 'telcor',
  };
  
  const key = routeToKey[routePath] || routePath.replace('/', '');
  const ente = key ? entesInfo[key] : null;

  if (!ente) {
    return (
      <div className="w-full py-12 md:py-24 lg:py-32" style={{ background: 'linear-gradient(to bottom, var(--regu-offwhite), var(--regu-gray-100))' }}>
        <div className="container px-4 md:px-6 mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--regu-gray-900)' }}>Ente no encontrado</h1>
          <Link to="/miembros">
            <Button className="text-white" style={{ backgroundColor: 'var(--regu-blue)' }}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Miembros
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32" style={{ background: 'linear-gradient(to bottom, var(--regu-offwhite), var(--regu-gray-100))' }}>
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-8"
        >
          <Link to="/miembros">
            <Button variant="ghost" className="mb-6" style={{ color: 'var(--regu-blue)' }}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Miembros
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white/90 rounded-2xl p-8 md:p-12 shadow-md border"
          style={{ borderColor: 'var(--regu-gray-100)' }}
        >
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white rounded-xl border p-6 shadow-sm" style={{ borderColor: 'var(--regu-gray-100)' }}>
                <LogoImage name={ente.name} route={ente.route} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--regu-gray-900)' }}>{ente.displayTitle ?? ente.name}</h1>
              {ente.fullName && (
                <p className="text-lg mb-4 font-medium" style={{ color: 'var(--regu-gray-700)' }}>{ente.fullName}</p>
              )}
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-green-600" />
                <p className="text-lg font-medium" style={{ color: 'var(--regu-gray-900)' }}>{ente.country}</p>
              </div>
              
              {ente.authorities && ente.authorities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--regu-gray-900)' }}>{ente.displayTitle ?? `${ente.name} – ${ente.country}`}</h3>
                  <div className="space-y-3">
                    {ente.authorities.map((authority, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <User className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-base font-medium" style={{ color: 'var(--regu-gray-900)' }}>{authority.name}</p>
                          <p className="text-sm" style={{ color: 'var(--regu-gray-700)' }}>{authority.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {ente.description && (
                <p className="mb-6" style={{ color: 'var(--regu-gray-700)' }}>{ente.description}</p>
              )}
              {ente.website && (
                <a
                  href={ente.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition-colors mb-6"
                  style={{ color: 'var(--regu-blue)' }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Visitar sitio web oficial
                </a>
              )}
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-8 pt-8 border-t"
            style={{ borderColor: 'var(--regu-gray-100)' }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--regu-gray-900)' }}>Sobre {ente.name}</h2>
            <div className="space-y-4" style={{ color: 'var(--regu-gray-700)' }}>
              <p>
                {ente.name} es un organismo regulador de telecomunicaciones en {ente.country}, 
                miembro activo de REGULATEL, el Foro Latinoamericano de Entes Reguladores de Telecomunicaciones.
              </p>
              <p>
                Como parte de REGULATEL, {ente.name} participa activamente en el intercambio de 
                experiencias y buenas prácticas en el sector de las telecomunicaciones, contribuyendo 
                al desarrollo y fortalecimiento del ecosistema digital en la región.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnteRegulador;
