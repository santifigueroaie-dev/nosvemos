import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Car,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Coffee,
  Compass,
  Crown,
  Fish,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Plane,
  Shield,
  Sparkles,
  Star,
  Sun,
  UserCheck,
  Users,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import type { Destination } from '../data/destinations';

interface DestinationProposalSectionProps {
  destination: Destination;
}

interface IconCard {
  title: string;
  text: string;
  icon: LucideIcon;
}

interface ExperienceCard {
  title: string;
  text: string;
  folder: string;
  fallbacks: string[];
}

interface ProposalConfig {
  heroImage: string;
  finalImage: string;
  title: string;
  intro: string;
  knowEyebrow: string;
  knowTitle: string;
  knowText: string;
  stats: Array<IconCard & { value: string; detail: string }>;
  facts: IconCard[];
  reasons: IconCard[];
  experiences: ExperienceCard[];
  seasonTitle: string;
  seasonText: string;
  seasonGalleryFolder: string;
  seasonFallbacks: string[];
  seasons: Array<{ title: string; months: string; text: string; icon: LucideIcon }>;
  finalTitle: string;
  finalText: string;
}

interface GalleryFrameProps {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  compact?: boolean;
}

const fallbackImages = {
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=86',
  honduras: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=84',
  dock: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1500&q=84',
  turkey: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=84',
  cappadocia: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1600&q=84',
  costaRica: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?auto=format&fit=crop&w=1800&q=84',
  forest: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=84',
  malta: 'https://images.unsplash.com/photo-1566386468037-9351a761d3d9?auto=format&fit=crop&w=1800&q=84',
  mediterranean: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=84',
};

const localImageManifest: Record<string, string[]> = {
  'turquia/estambul-privada': [
    '/destination/turquia/estambul-privada/3bae040b-2afb-4b11-9542-859eeb8ebaf1.webp',
    '/destination/turquia/estambul-privada/9ad822d7-631a-4c10-8dcd-7305d6d5e593-11980-istanbul-galata-tower-tickets---walking-tour--02.jpg',
    '/destination/turquia/estambul-privada/galata-tower.webp',
    '/destination/turquia/estambul-privada/istanbul-4785964_1280.jpg',
    '/destination/turquia/estambul-privada/istanbul-s-famous-blue-mosque-aesthetic-1xm474mw23cufnh6.jpg',
    '/destination/turquia/estambul-privada/R.jpg',
  ],
};

const localGallery = (destinationId: string, folder: string, fallbacks: string[]) => [
  ...(localImageManifest[`${destinationId}/${folder}`] ?? []),
  `/destination/${destinationId}/${folder}/01.jpg`,
  `/destination/${destinationId}/${folder}/02.jpg`,
  `/destination/${destinationId}/${folder}/03.jpg`,
  `/destination/${destinationId}/${folder}/04.jpg`,
  ...fallbacks,
];

const trustItems: IconCard[] = [
  { title: 'Seguro de viaje', text: 'Incluido', icon: Shield },
  { title: 'Conductor privado', text: 'En traslados', icon: Car },
  { title: 'Concierge 24/7', text: 'Atención premium', icon: UserCheck },
  { title: 'Guías certificados', text: 'Expertos locales', icon: Crown },
];

const safety: IconCard[] = [
  { title: 'Seguridad', text: 'Protocolos y aliados confiables durante toda la ruta.', icon: Shield },
  { title: 'Atención 24/7', text: 'Estamos contigo antes, durante y después de tu viaje.', icon: Heart },
  { title: 'Expertos locales', text: 'Guías certificados que conocen cada rincón.', icon: UserCheck },
  { title: 'Traslados privados', text: 'Comodidad y puntualidad en todos tus traslados.', icon: Car },
  { title: 'Experiencias personalizadas', text: 'Diseñamos tu viaje a tu medida.', icon: Star },
];

const proposalConfigs: Record<string, ProposalConfig> = {
  honduras: {
    heroImage: fallbackImages.beach,
    finalImage: fallbackImages.dock,
    title: 'Por qué Honduras Explorer merece estar en tu ruta.',
    intro:
      'Un destino donde la historia antigua se encuentra con arrecifes vibrantes, selvas exuberantes y playas que parecen creadas solo para ti.',
    knowEyebrow: 'Conoce Honduras',
    knowTitle: 'Auténtica, diversa e inolvidable.',
    knowText:
      'Honduras es un mosaico de culturas, paisajes y experiencias que cautivan desde el primer momento. Cada región revela una parte distinta del país, desde ruinas mayas milenarias hasta islas caribeñas de aguas turquesa.',
    stats: [
      { value: '10.6 M', title: 'Población', detail: '(2024 est.)', text: '', icon: Users },
      { value: '112,492 km²', title: 'Extensión territorial', detail: '(Más grande que Suiza)', text: '', icon: MapPin },
      { value: '+90%', title: 'Territorio montañoso', detail: 'y naturaleza virgen', text: '', icon: Mountain },
      { value: '2°', title: 'Arrecife de coral', detail: 'más grande del mundo', text: '', icon: Compass },
      { value: '+2,500 años', title: 'Historia y cultura', detail: 'maya viva', text: '', icon: Landmark },
    ],
    facts: [
      { title: 'El hogar de las Guacamayas Rojas', text: 'Una de las mayores poblaciones de esta especie icónica.', icon: Plane },
      { title: 'Segundo arrecife más grande', text: 'El Sistema Arrecifal Mesoamericano es un paraíso para buceadores.', icon: Fish },
      { title: 'Café de montaña', text: 'Cafés premiados mundialmente nacen en sus tierras altas.', icon: Coffee },
      { title: 'Costa caribeña', text: 'Más de 1,000 km de playas, islas y aguas cristalinas.', icon: Waves },
      { title: 'Hospitalidad cálida', text: 'La cercanía de su gente hace que el viaje se sienta humano.', icon: Star },
    ],
    reasons: [
      { title: 'Aventura', text: 'Selvas, montañas y ríos para explorar.', icon: Plane },
      { title: 'Cultura', text: 'Ruinas mayas, historia y tradiciones vivas.', icon: Building2 },
      { title: 'Relajación', text: 'Playas de ensueño y ritmos caribeños.', icon: Waves },
      { title: 'Gastronomía', text: 'Sabores auténticos que cuentan historias.', icon: Coffee },
      { title: 'Conexión', text: 'Naturaleza pura y experiencias reales.', icon: Sparkles },
    ],
    experiences: [
      { title: 'Historia viva', text: 'Explora Copán, joya del mundo maya.', folder: 'historia-viva', fallbacks: ['https://images.unsplash.com/photo-1585468274952-66591eb14165?auto=format&fit=crop&w=900&q=82'] },
      { title: 'Paraísos submarinos', text: 'Arrecifes llenos de vida y color.', folder: 'paraisos-submarinos', fallbacks: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=82'] },
      { title: 'Playas de ensueño', text: 'Roatán y Utila regalan atardeceres inolvidables.', folder: 'playas-de-ensueno', fallbacks: [fallbackImages.beach] },
      { title: 'Naturaleza exuberante', text: 'Selvas, cascadas y parques nacionales.', folder: 'naturaleza-exuberante', fallbacks: [fallbackImages.forest] },
    ],
    seasonTitle: 'Honduras te recibe todo el año.',
    seasonText: 'Clima cálido todo el año, con dos temporadas marcadas.',
    seasonGalleryFolder: 'honduras-epoca',
    seasonFallbacks: [fallbackImages.honduras, fallbackImages.beach],
    seasons: [
      { title: 'Temporada seca', months: 'Noviembre - Abril', text: 'Días soleados, mar tranquilo y condiciones perfectas para explorar.', icon: Sun },
      { title: 'Temporada verde', months: 'Mayo - Octubre', text: 'Paisajes más verdes, menos turistas y experiencias más auténticas.', icon: CloudRain },
    ],
    finalTitle: 'Tu historia en Honduras comienza aquí.',
    finalText: 'Permítenos diseñar un viaje hecho a tu medida, con experiencias auténticas y momentos que recordarás para siempre.',
  },
  turquia: {
    heroImage: fallbackImages.turkey,
    finalImage: fallbackImages.cappadocia,
    title: 'Por qué Turquía Atemporal merece estar en tu ruta.',
    intro: 'Desde los minaretes de Estambul hasta los amaneceres suspendidos sobre Capadocia, Turquía no se visita: se siente.',
    knowEyebrow: 'Conoce Turquía',
    knowTitle: 'Milenaria, sensorial y profundamente cinematográfica.',
    knowText:
      'Una ruta de 6 días entre arquitectura bizantina, mezquitas iluminadas por el atardecer, hoteles excavados en roca y rituales otomanos.',
    stats: [
      { value: '85 M', title: 'Población', detail: 'puente entre Europa y Asia', text: '', icon: Users },
      { value: '2 continentes', title: 'Geografía única', detail: 'Europa y Asia en una ruta', text: '', icon: MapPin },
      { value: '+10,000 años', title: 'Historia habitada', detail: 'civilizaciones superpuestas', text: '', icon: Landmark },
      { value: '7 regiones', title: 'Paisajes diversos', detail: 'costa, estepa, montañas y valles', text: '', icon: Mountain },
      { value: '3 mares', title: 'Horizonte azul', detail: 'Egeo, Negro y Mediterráneo', text: '', icon: Waves },
    ],
    facts: [
      { title: 'Estambul nunca se agota', text: 'Santa Sofía, Mezquita Azul, Gran Bazar, Bósforo y hammam otomano.', icon: Landmark },
      { title: 'Capadocia parece de otro mundo', text: 'Hotel cueva premium, miradores al atardecer y amaneceres en globo.', icon: Plane },
      { title: 'Cocina de memoria imperial', text: 'Sabores otomanos, meze, especias y desayunos lentos.', icon: Coffee },
      { title: 'Baños y rituales', text: 'Hammams históricos y bienestar con tradición.', icon: Sparkles },
      { title: 'Artesanía viva', text: 'Cerámica, alfombras, cuero y oficios transmitidos por generaciones.', icon: Star },
    ],
    reasons: [
      { title: 'Historia', text: 'Una ruta entre imperios y ciudades sagradas.', icon: Landmark },
      { title: 'Paisaje', text: 'Capadocia, costas y terrazas naturales.', icon: Mountain },
      { title: 'Gastronomía', text: 'Mesas generosas y sabores memorables.', icon: Coffee },
      { title: 'Cultura', text: 'Bazares, talleres y encuentros locales.', icon: Building2 },
      { title: 'Ritmo', text: 'Lujo pausado con hoteles de carácter.', icon: Sparkles },
    ],
    experiences: [
      { title: 'Estambul privado', text: 'Arquitectura bizantina, bazares históricos y experiencias gastronómicas premium.', folder: 'estambul-privada', fallbacks: [fallbackImages.turkey] },
      { title: 'Capadocia en globo', text: 'Amanecer cinematográfico entre valles volcánicos y hoteles excavados en piedra.', folder: 'capadocia-en-globo', fallbacks: [fallbackImages.cappadocia] },
      { title: 'Éfeso clásico', text: 'Uno de los sitios arqueológicos más importantes del Mediterráneo.', folder: 'efeso-legado-clasico', fallbacks: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80'] },
      { title: 'Pamukkale', text: 'Terrazas termales naturales con estética surrealista.', folder: 'rituales-otomanos', fallbacks: ['https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=900&q=80'] },
    ],
    seasonTitle: 'Turquía brilla en primavera y otoño.',
    seasonText: 'Temperaturas suaves, mejor luz y rutas más cómodas para explorar.',
    seasonGalleryFolder: 'turquia-epoca',
    seasonFallbacks: [fallbackImages.cappadocia, fallbackImages.turkey],
    seasons: [
      { title: 'Primavera', months: 'Abril - Junio', text: 'Clima suave, jardines en flor y días largos.', icon: Sun },
      { title: 'Otoño', months: 'Septiembre - Octubre', text: 'Luz dorada, menos calor y ciudades más tranquilas.', icon: CloudRain },
    ],
    finalTitle: 'Tu historia en Turquía comienza aquí.',
    finalText: 'Diseñamos una ruta privada entre Estambul, Capadocia, Éfeso y Pamukkale, con hoteles boutique, transfers privados y experiencias culturales cuidadosamente coordinadas.',
  },
  'costa-rica': {
    heroImage: fallbackImages.costaRica,
    finalImage: fallbackImages.forest,
    title: 'Por qué Costa Rica Pura Vida merece estar en tu ruta.',
    intro: 'Una ruta de selva, volcanes, playas y lodges serenos para viajeros que buscan naturaleza con comodidad y propósito.',
    knowEyebrow: 'Conoce Costa Rica',
    knowTitle: 'Pura vida, naturaleza y hospitalidad serena.',
    knowText:
      'Costa Rica es un santuario de biodiversidad donde cada traslado puede convertirse en paisaje: bosque nuboso, volcanes, playas y vida silvestre.',
    stats: [
      { value: '5%', title: 'Biodiversidad mundial', detail: 'en un país compacto', text: '', icon: Sparkles },
      { value: '30%', title: 'Territorio protegido', detail: 'parques y reservas', text: '', icon: Shield },
      { value: '2 costas', title: 'Pacífico y Caribe', detail: 'dos ritmos de playa', text: '', icon: Waves },
      { value: '+200', title: 'Volcanes', detail: 'activos e inactivos', text: '', icon: Mountain },
      { value: '12 zonas', title: 'Microclimas', detail: 'selva, nube, costa y montaña', text: '', icon: CloudRain },
    ],
    facts: [
      { title: 'Bosques que respiran', text: 'Senderos, puentes colgantes y reservas privadas.', icon: Mountain },
      { title: 'Vida silvestre cercana', text: 'Perezosos, aves tropicales y monos en su hábitat.', icon: Star },
      { title: 'Lodges con intención', text: 'Hoteles integrados al paisaje con excelente hospitalidad.', icon: Building2 },
      { title: 'Aventura suave', text: 'Rafting, canopy, surf y caminatas con guía.', icon: Plane },
      { title: 'Cultura pura vida', text: 'Un estilo de viaje relajado, cálido y consciente.', icon: Heart },
    ],
    reasons: [
      { title: 'Naturaleza', text: 'Selva viva, volcanes y playas.', icon: Mountain },
      { title: 'Bienestar', text: 'Ritmo suave y desconexión real.', icon: Sparkles },
      { title: 'Aventura', text: 'Actividades seguras y memorables.', icon: Plane },
      { title: 'Familia', text: 'Experiencias nobles para todas las edades.', icon: Users },
      { title: 'Conservación', text: 'Turismo con impacto más consciente.', icon: Shield },
    ],
    experiences: [
      { title: 'Bosque nuboso', text: 'Caminatas entre niebla, aves y puentes colgantes.', folder: 'bosque-nuboso', fallbacks: [fallbackImages.forest] },
      { title: 'Volcanes activos', text: 'Aguas termales, senderos y paisajes minerales.', folder: 'volcanes-activos', fallbacks: [fallbackImages.costaRica] },
      { title: 'Playas del Pacífico', text: 'Atardeceres, surf suave y hoteles frente al mar.', folder: 'playas-del-pacifico', fallbacks: [fallbackImages.beach] },
      { title: 'Vida silvestre', text: 'Encuentros responsables con fauna tropical.', folder: 'vida-silvestre', fallbacks: ['https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=82'] },
    ],
    seasonTitle: 'Costa Rica cambia de color durante el año.',
    seasonText: 'Cada temporada ofrece una forma distinta de vivir la naturaleza.',
    seasonGalleryFolder: 'costa-rica-epoca',
    seasonFallbacks: [fallbackImages.costaRica, fallbackImages.forest],
    seasons: [
      { title: 'Temporada seca', months: 'Diciembre - Abril', text: 'Más sol, mejores condiciones de playa y caminos más fáciles.', icon: Sun },
      { title: 'Temporada verde', months: 'Mayo - Noviembre', text: 'Selvas intensas, menos gente y cascadas con más fuerza.', icon: CloudRain },
    ],
    finalTitle: 'Tu historia en Costa Rica comienza aquí.',
    finalText: 'Creamos una ruta natural, cómoda y sensible, con lodges especiales y experiencias que conectan con el paisaje.',
  },
  malta: {
    heroImage: fallbackImages.malta,
    finalImage: fallbackImages.mediterranean,
    title: 'Por qué Malta Caballeresca merece estar en tu ruta.',
    intro: 'Un destino compacto y sofisticado donde piedra dorada, mar azul e historia mediterránea conviven con hoteles boutique.',
    knowEyebrow: 'Conoce Malta',
    knowTitle: 'Mediterránea, histórica y luminosa.',
    knowText:
      'Malta reúne ciudades fortificadas, calas cristalinas, templos antiguos y una mezcla cultural marcada por caballeros, navegantes y tradiciones mediterráneas.',
    stats: [
      { value: '3 islas', title: 'Malta, Gozo y Comino', detail: 'una ruta compacta', text: '', icon: MapPin },
      { value: '+7,000 años', title: 'Historia antigua', detail: 'templos y ciudades fortificadas', text: '', icon: Landmark },
      { value: '300 días', title: 'De sol al año', detail: 'luz mediterránea', text: '', icon: Sun },
      { value: '2 capitales', title: 'La Valeta y Mdina', detail: 'patrimonio vivo', text: '', icon: Building2 },
      { value: 'Azul intenso', title: 'Mar y calas', detail: 'Gozo, Comino y cuevas', text: '', icon: Waves },
    ],
    facts: [
      { title: 'La Valeta es una joya barroca', text: 'Calles de piedra, balcones y fortalezas frente al mar.', icon: Landmark },
      { title: 'Mdina parece detenida en el tiempo', text: 'Una ciudad silenciosa para recorrer sin prisa.', icon: Building2 },
      { title: 'Gozo baja el ritmo', text: 'Paisajes rurales, iglesias y calas de agua clara.', icon: Heart },
      { title: 'Buceo con historia', text: 'Naufragios, cuevas y visibilidad extraordinaria.', icon: Fish },
      { title: 'Mesa mediterránea', text: 'Pescado, aceite de oliva, vinos locales y terrazas.', icon: Coffee },
    ],
    reasons: [
      { title: 'Historia', text: 'Caballeros, fortalezas y templos milenarios.', icon: Landmark },
      { title: 'Mar', text: 'Calas, cuevas y paseos en barco.', icon: Waves },
      { title: 'Escala humana', text: 'Mucho que ver sin grandes distancias.', icon: MapPin },
      { title: 'Boutique', text: 'Hoteles pequeños y llenos de carácter.', icon: Crown },
      { title: 'Luz', text: 'Atardeceres dorados y paisajes fotogénicos.', icon: Sun },
    ],
    experiences: [
      { title: 'La Valeta privada', text: 'Arquitectura barroca, puertos y miradores históricos.', folder: 'la-valeta-privada', fallbacks: [fallbackImages.malta] },
      { title: 'Mdina al atardecer', text: 'Calles silenciosas y piedra dorada al caer la luz.', folder: 'mdina-al-atardecer', fallbacks: [fallbackImages.mediterranean] },
      { title: 'Gozo y Comino', text: 'Islas, calas y mar transparente en ritmo pausado.', folder: 'gozo-y-comino', fallbacks: [fallbackImages.beach] },
      { title: 'Naufragios y cuevas', text: 'Buceo y navegación para descubrir el Mediterráneo.', folder: 'naufragios-y-cuevas', fallbacks: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=82'] },
    ],
    seasonTitle: 'Malta se disfruta mejor con luz suave.',
    seasonText: 'Primavera y otoño ofrecen clima templado y una experiencia más refinada.',
    seasonGalleryFolder: 'malta-epoca',
    seasonFallbacks: [fallbackImages.malta, fallbackImages.mediterranean],
    seasons: [
      { title: 'Primavera', months: 'Abril - Junio', text: 'Temperaturas amables, flores y buen ritmo para caminar.', icon: Sun },
      { title: 'Otoño', months: 'Septiembre - Octubre', text: 'Mar aún cálido, menos visitantes y luz dorada.', icon: CloudRain },
    ],
    finalTitle: 'Tu historia en Malta comienza aquí.',
    finalText: 'Diseñamos una escapada mediterránea con historia, mar, hoteles boutique y un ritmo elegante.',
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: 'easeOut' },
};

const GalleryFrame = ({ images, alt, className = '', imageClassName = 'h-52', compact = false }: GalleryFrameProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  const showNext = () => setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  const handleMissingImage = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };

  return (
    <div className={`group relative overflow-hidden bg-charcoal ${className}`}>
      <img
        src={images[activeIndex]}
        alt={alt}
        loading="lazy"
        onError={handleMissingImage}
        className={`${imageClassName} w-full object-cover transition duration-700 group-hover:scale-105`}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
        <button type="button" onClick={showPrevious} aria-label={`Foto anterior de ${alt}`} className="rounded-full bg-white/90 p-2 text-[#12263a] shadow-soft transition hover:bg-sand">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver foto ${index + 1} de ${alt}`}
              className={`h-1.5 rounded-full transition ${index === activeIndex ? 'w-5 bg-sand' : 'w-1.5 bg-white/75'}`}
            />
          ))}
        </div>
        <button type="button" onClick={showNext} aria-label={`Foto siguiente de ${alt}`} className="rounded-full bg-white/90 p-2 text-[#12263a] shadow-soft transition hover:bg-sand">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {!compact && (
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#12263a] shadow-soft">
          Galería
        </div>
      )}
    </div>
  );
};

const MiniIconCard = ({ item }: { item: IconCard }) => {
  const Icon = item.icon;
  return (
    <motion.article {...fadeUp} className="rounded-lg border border-charcoal/10 bg-white/80 p-5 shadow-soft">
      <Icon className="h-7 w-7 text-mutedGold" />
      <h4 className="mt-5 text-sm font-bold leading-5 text-[#12263a]">{item.title}</h4>
      <p className="mt-3 text-xs leading-5 text-charcoal/70">{item.text}</p>
    </motion.article>
  );
};

const FullProposal = ({ destination, config }: { destination: Destination; config: ProposalConfig }) => {
  return (
    <section className="bg-[#f8f1e4] px-3 pb-4 pt-0 md:px-6 md:pb-8 md:pt-0">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-lg border border-charcoal/10 bg-ivory shadow-[0_26px_80px_rgba(34,48,64,0.16)]">
        <div className="relative min-h-[500px] overflow-hidden md:min-h-[620px]">
          <img src={config.heroImage} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/90 to-ivory/10" />
          <div className="relative z-10 flex min-h-[500px] flex-col justify-between px-5 py-10 md:min-h-[620px] md:px-16 md:py-12">
            <motion.div {...fadeUp} className="max-w-xl">
              <h2 className="text-3xl font-bold leading-tight text-[#12263a] md:text-6xl">{config.title}</h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-charcoal/80">{config.intro}</p>
              <div className="mt-8 h-px w-14 bg-mutedGold" />
            </motion.div>

            <div className="grid gap-4 border-t border-charcoal/10 pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-mutedGold" />
                    <div>
                      <p className="text-xs font-bold text-[#12263a]">{item.title}</p>
                      <p className="mt-1 text-xs text-charcoal/60">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="bg-[#071f34] px-5 py-12 text-white md:px-16 md:py-14">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="eyebrow text-sand">{config.knowEyebrow}</p>
            <h3 className="mt-3 text-3xl font-bold md:text-4xl">{config.knowTitle}</h3>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/80">{config.knowText}</p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {config.stats.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.value} {...fadeUp} className="border-white/20 md:border-r md:pr-6 last:border-r-0">
                  <Icon className="h-8 w-8 text-mutedGold" />
                  <p className="mt-5 text-2xl font-bold">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-white/70">{item.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="px-5 py-12 md:px-16">
          <p className="eyebrow">Datos curiosos</p>
          <h3 className="mt-3 text-2xl font-bold text-[#12263a] md:text-3xl">Pequeños detalles que enamoran.</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {config.facts.map((item) => (
              <MiniIconCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-charcoal/10 px-5 py-12 text-center md:px-16 md:py-14">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
          <div className="relative z-10">
            <p className="eyebrow">¿Qué hace a este destino único?</p>
            <h3 className="mt-3 text-2xl font-bold text-[#12263a] md:text-4xl">Un destino, mil formas de vivirlo.</h3>
            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {config.reasons.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} {...fadeUp} className="px-4">
                    <Icon className="mx-auto h-8 w-8 text-mutedGold" />
                    <p className="mt-4 text-sm font-bold text-[#12263a]">{item.title}</p>
                    <p className="mt-2 text-xs leading-5 text-charcoal/70">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-16 md:py-14">
          <p className="eyebrow">Experiencias que te esperan</p>
          <h3 className="mt-3 text-2xl font-bold text-[#12263a] md:text-4xl">Un viaje que lo tiene todo.</h3>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {config.experiences.map((item) => (
              <motion.article key={item.title} {...fadeUp} className="overflow-hidden rounded-lg bg-white shadow-soft">
                <GalleryFrame images={localGallery(destination.id, item.folder, item.fallbacks)} alt={item.title} imageClassName="h-52" compact />
                <div className="p-5">
                  <h4 className="text-sm font-bold text-[#12263a]">{item.title}</h4>
                  <p className="mt-3 text-xs leading-6 text-charcoal/70">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid overflow-hidden border-y border-charcoal/10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="px-5 py-12 md:px-16 md:py-14">
            <p className="eyebrow">Mejor época para viajar</p>
            <h3 className="mt-3 text-2xl font-bold text-[#12263a] md:text-4xl">{config.seasonTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-charcoal/70">{config.seasonText}</p>
            <div className="mt-8 grid gap-4 rounded-lg bg-white/80 p-5 shadow-soft">
              {config.seasons.map((season, index) => {
                const Icon = season.icon;
                return (
                  <div key={season.title} className={`grid gap-4 md:grid-cols-[180px_1fr] ${index === 0 ? 'border-b border-charcoal/10 pb-5' : ''}`}>
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-mutedGold" />
                      <div>
                        <p className="text-sm font-bold text-[#12263a]">{season.title}</p>
                        <p className="text-xs text-charcoal/60">{season.months}</p>
                      </div>
                    </div>
                    <p className="text-xs leading-6 text-charcoal/70">{season.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <GalleryFrame
            images={localGallery(destination.id, config.seasonGalleryFolder, config.seasonFallbacks)}
            alt={`Mejor época para viajar a ${destination.name}`}
            className="h-[300px] sm:h-[360px] lg:h-[540px]"
            imageClassName="h-full"
          />
        </section>

        <section className="bg-[#071f34] px-5 py-12 text-white md:px-16 md:py-14">
          <p className="eyebrow text-sand">Tu tranquilidad, nuestra prioridad</p>
          <h3 className="mt-3 text-2xl font-bold md:text-4xl">Viaja seguro, viaja acompañado.</h3>
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {safety.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fadeUp} className="border-white/20 md:border-r md:px-5 last:border-r-0">
                  <Icon className="mx-auto h-8 w-8 text-mutedGold md:mx-0" />
                  <p className="mt-4 text-sm font-bold">{item.title}</p>
                  <p className="mt-3 text-xs leading-6 text-white/70">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="grid overflow-hidden md:grid-cols-[1.05fr_0.95fr]">
          <img src={config.finalImage} alt={config.finalTitle} loading="lazy" className="h-72 w-full object-cover md:h-[520px]" />
          <div className="flex items-center px-5 py-12 md:px-16">
            <div>
              <p className="eyebrow">¿Listo para diseñar tu ruta?</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#12263a] md:text-4xl">{config.finalTitle}</h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/70">{config.finalText}</p>
              <Link to="/#propuesta" className="btn-primary mt-7">
                Solicitar propuesta personalizada
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-5 max-w-md text-xs leading-6 text-charcoal/60">
                Este es solo un estimado. El precio final puede variar según disponibilidad, temporada y preferencias.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

const DestinationProposalSection = ({ destination }: DestinationProposalSectionProps) => {
  return <FullProposal destination={destination} config={proposalConfigs[destination.id] ?? proposalConfigs.honduras} />;
};

export default DestinationProposalSection;
