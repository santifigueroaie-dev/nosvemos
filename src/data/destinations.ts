export interface Destination {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceValue: number;
  region: string;
  style: string;
  image: string;
  gallery: string[];
  highlights: string[];
  routePreview: string[];
  description: string;
}

export const destinations: Destination[] = [
  {
    id: 'honduras',
    name: 'Honduras Explorer',
    tagline: 'La belleza del Caribe en su estado más puro',
    price: '$3,200',
    priceValue: 3200,
    region: 'Caribe',
    style: 'Naturaleza',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Arrecifes cristalinos', 'Cultura garífuna', 'Islas de la Bahía'],
    routePreview: ['Roatán', 'Utila', 'Copán'],
    description:
      'Una ruta privada entre playas luminosas, arrecifes vivos y encuentros culturales cuidados con sensibilidad local.',
  },
  {
    id: 'turquia',
    name: 'Turquía Atemporal',
    tagline: 'Desde los minaretes de Estambul hasta los amaneceres sobre Capadocia',
    price: '$1,730',
    priceValue: 1730,
    region: 'Europa y Asia',
    style: 'Cultura',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Estambul privada', 'Capadocia en globo', 'Éfeso clásico'],
    routePreview: ['Estambul', 'Capadocia', 'Éfeso', 'Pamukkale'],
    description:
      'Un recorrido premium de 6 días entre imperios, mezquitas iluminadas, hoteles excavados en roca y rituales otomanos.',
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica Pura Vida',
    tagline: 'Selva, volcanes y hospitalidad serena',
    price: '$2,800',
    priceValue: 2800,
    region: 'Centroamérica',
    style: 'Aventura',
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['Bosque nuboso', 'Playas del Pacífico', 'Volcanes activos'],
    routePreview: ['San José', 'Monteverde', 'Manuel Antonio'],
    description:
      'Una ruta de naturaleza con ritmo flexible, lodges con intención y experiencias suaves para conectar con el paisaje.',
  },
  {
    id: 'malta',
    name: 'Malta Caballeresca',
    tagline: 'Piedra dorada, mar azul y memoria mediterránea',
    price: '$3,500',
    priceValue: 3500,
    region: 'Mediterráneo',
    style: 'Historia',
    image: 'https://images.unsplash.com/photo-1566386468037-9351a761d3d9?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: ['La Valeta privada', 'Mdina al atardecer', 'Gozo y Comino'],
    routePreview: ['La Valeta', 'Mdina', 'Gozo', 'Comino'],
    description:
      'Una escapada mediterránea de ritmo elegante, pensada para viajeros que buscan historia, mar y hoteles boutique.',
  },
];
