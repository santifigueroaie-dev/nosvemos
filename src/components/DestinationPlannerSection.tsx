import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, MapPin, Minus, Plus, RefreshCcw, Users, X } from 'lucide-react';

export interface PlannerDestination {
  id: string;
  title: string;
  days: string;
  nights: number;
  price: number;
  enabled: boolean;
  description: string;
  image: string;
}

interface DestinationPlannerSectionProps {
  destinationId?: string;
  destinations?: PlannerDestination[];
  travelers?: number;
}

type TravelPlan = 'economico' | 'confort' | 'lujo';

interface PlanDetails {
  label: string;
  multiplier: number;
  eyebrow: string;
  headline: string;
  text: string;
  image: string;
  thumb: string;
  includes: string[];
  bestFor: string;
}

const destinationNames: Record<string, string> = {
  honduras: 'Honduras',
  turquia: 'Turquía',
  'costa-rica': 'Costa Rica',
  malta: 'Malta',
};

const plannerDestinations: Record<string, PlannerDestination[]> = {
  honduras: [
    {
      id: 'roatan',
      title: 'Roatán',
      days: 'Días 1 - 3',
      nights: 2,
      price: 950,
      enabled: true,
      description: 'Playas de ensueño, arrecifes de coral y experiencias privadas frente al mar.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'utila',
      title: 'Utila',
      days: 'Días 4 - 5',
      nights: 2,
      price: 750,
      enabled: true,
      description: 'Buceo extraordinario y ambiente relajado en una isla auténtica y vibrante.',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'copan',
      title: 'Copán',
      days: 'Días 6 - 7',
      nights: 2,
      price: 650,
      enabled: true,
      description: 'Historia viva, cultura maya y paisajes de montaña inolvidables.',
      image: 'https://images.unsplash.com/photo-1585468274952-66591eb14165?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'pico-bonito',
      title: 'Pico Bonito',
      days: 'Días 8 - 9',
      nights: 2,
      price: 550,
      enabled: false,
      description: 'Naturaleza exuberante, ríos cristalinos y aventura suave en el corazón de Honduras.',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'la-ceiba-tela',
      title: 'La Ceiba & Tela',
      days: 'Día 10',
      nights: 1,
      price: 450,
      enabled: false,
      description: 'Playas, cultura caribeña y un cierre cálido para una ruta profundamente hondureña.',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=82',
    },
  ],
  turquia: [
    {
      id: 'estambul',
      title: 'Estambul',
      days: 'Días 1 - 2',
      nights: 2,
      price: 650,
      enabled: true,
      description: 'Llegada, transfer privado, Santa Sofía, Mezquita Azul, Gran Bazar y cena frente al Bósforo.',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'capadocia',
      title: 'Capadocia',
      days: 'Días 3 - 4',
      nights: 2,
      price: 450,
      enabled: true,
      description: 'Hotel cueva premium, sunset viewpoint, vuelo en globo y recorrido por Göreme.',
      image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'efeso',
      title: 'Éfeso',
      days: 'Día 5',
      nights: 1,
      price: 330,
      enabled: true,
      description: 'Excursión privada a uno de los sitios arqueológicos más importantes del Mediterráneo.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'pamukkale',
      title: 'Pamukkale',
      days: 'Día 5',
      nights: 0,
      price: 300,
      enabled: true,
      description: 'Terrazas termales naturales con estética surrealista antes del regreso a Estambul.',
      image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=900&q=80',
    },
  ],
  'costa-rica': [
    {
      id: 'monteverde',
      title: 'Monteverde',
      days: 'Días 1 - 3',
      nights: 2,
      price: 780,
      enabled: true,
      description: 'Bosque nuboso, puentes colgantes y lodges integrados al paisaje.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'arenal',
      title: 'Arenal',
      days: 'Días 4 - 5',
      nights: 2,
      price: 860,
      enabled: true,
      description: 'Volcán, aguas termales y naturaleza con ritmo sereno.',
      image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'manuel-antonio',
      title: 'Manuel Antonio',
      days: 'Días 6 - 8',
      nights: 2,
      price: 920,
      enabled: true,
      description: 'Playas del Pacífico, fauna tropical y atardeceres cálidos.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'tortuguero',
      title: 'Tortuguero',
      days: 'Días 9 - 10',
      nights: 2,
      price: 640,
      enabled: false,
      description: 'Canales, selva caribeña y observación responsable de fauna.',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=82',
    },
  ],
  malta: [
    {
      id: 'la-valeta',
      title: 'La Valeta',
      days: 'Días 1 - 2',
      nights: 2,
      price: 900,
      enabled: true,
      description: 'Arquitectura barroca, puertos históricos y hoteles boutique.',
      image: 'https://images.unsplash.com/photo-1566386468037-9351a761d3d9?auto=format&fit=crop&w=900&q=82',
    },
    {
      id: 'mdina',
      title: 'Mdina',
      days: 'Día 3',
      nights: 1,
      price: 520,
      enabled: true,
      description: 'La ciudad silenciosa al atardecer, piedra dorada y calles íntimas.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'gozo',
      title: 'Gozo',
      days: 'Días 4 - 5',
      nights: 2,
      price: 760,
      enabled: true,
      description: 'Isla pausada, calas cristalinas y paisaje rural mediterráneo.',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'comino',
      title: 'Comino',
      days: 'Día 6',
      nights: 1,
      price: 430,
      enabled: false,
      description: 'Mar azul intenso, navegación privada y cuevas luminosas.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=82',
    },
  ],
};

const planDetails: Record<TravelPlan, PlanDetails> = {
  economico: {
    label: 'Económico',
    multiplier: 0.88,
    eyebrow: 'Viaje esencial',
    headline: 'Una ruta inteligente, cuidada y accesible.',
    text:
      'Ideal si quieres vivir el destino con buena logística, alojamientos con encanto sencillo y experiencias esenciales sin elevar demasiado la inversión.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=82',
    thumb: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=500&q=82',
    includes: ['Hoteles boutique sencillos', 'Traslados coordinados', 'Guías locales en visitas clave', 'Soporte durante el viaje'],
    bestFor: 'Viajeros que priorizan experiencia, orden y buen valor.',
  },
  confort: {
    label: 'Confort',
    multiplier: 1,
    eyebrow: 'Viaje tu confort',
    headline: 'El equilibrio más completo entre privacidad y valor.',
    text:
      'Nuestro estándar recomendado: hoteles boutique superiores, conductor privado en traslados principales y guías certificados para las experiencias más importantes.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=82',
    thumb: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=500&q=82',
    includes: ['Hoteles boutique superiores', 'Conductor privado en traslados principales', 'Tours privados seleccionados', 'Concierge 24/7'],
    bestFor: 'Viajeros que quieren comodidad, fluidez y una experiencia premium sin excesos.',
  },
  lujo: {
    label: 'Lujo',
    multiplier: 1.32,
    eyebrow: 'Viaje en lujo',
    headline: 'La versión más privada, elevada y personalizada.',
    text:
      'Pensado para quienes desean hoteles de alta gama, conductor privado durante la ruta, experiencias a puerta cerrada y atención prioritaria del atelier.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=82',
    thumb: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=82',
    includes: ['Hoteles 5 estrellas o villas', 'Conductor privado completo', 'Tours privados y experiencias exclusivas', 'Concierge prioritario'],
    bestFor: 'Viajeros que buscan máxima comodidad, privacidad y momentos difíciles de replicar.',
  },
};

const planOrder: TravelPlan[] = ['economico', 'confort', 'lujo'];

const localPlanImage = (destinationId: string, plan: TravelPlan) => `/destination/${destinationId}/paquete-${plan}/01.jpg`;

const destinationPlanMultipliers: Partial<Record<string, Partial<Record<TravelPlan, number>>>> = {
  turquia: {
    economico: 0.82,
    confort: 1,
    lujo: 3770 / 1730,
  },
};

const extraDayRates: Record<string, number> = {
  honduras: 180,
  turquia: 220,
  'costa-rica': 170,
  malta: 190,
};

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US')}`;

const DestinationPlannerSection = ({ destinationId = 'honduras', destinations, travelers = 2 }: DestinationPlannerSectionProps) => {
  const plannerItems = useMemo(
    () => destinations ?? plannerDestinations[destinationId] ?? plannerDestinations.honduras,
    [destinationId, destinations],
  );
  const [items, setItems] = useState(plannerItems);
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan>('confort');
  const [travelerCount, setTravelerCount] = useState(travelers);
  const [customDays, setCustomDays] = useState<number | null>(null);

  useEffect(() => {
    setItems(plannerItems);
    setSelectedPlan('confort');
    setTravelerCount(travelers);
    setCustomDays(null);
  }, [plannerItems, travelers]);

  const activePlan = planDetails[selectedPlan];
  const activeMultiplier = destinationPlanMultipliers[destinationId]?.[selectedPlan] ?? activePlan.multiplier;
  const selectedItems = useMemo(() => items.filter((item) => item.enabled), [items]);
  const basePricePerPerson = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const baseRouteDays = selectedItems.length === 0 ? 0 : selectedItems.reduce((sum, item) => sum + item.nights, 1);
  const totalDays = selectedItems.length === 0 ? 0 : Math.max(customDays ?? baseRouteDays, 1);
  const totalNights = Math.max(totalDays - 1, 0);
  const extraDays = Math.max(totalDays - baseRouteDays, 0);
  const dayRatio = baseRouteDays > 0 ? Math.min(totalDays / baseRouteDays, 1) : 0;
  const durationAdjustedBase = Math.round(basePricePerPerson * dayRatio);
  const extraDayPrice = extraDays * (extraDayRates[destinationId] ?? 175);
  const pricePerPerson = Math.round((durationAdjustedBase + extraDayPrice) * activeMultiplier);
  const totalPrice = pricePerPerson * travelerCount;
  const destinationName = destinationNames[destinationId] ?? 'tu destino';

  const toggleDestination = (id: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)));
  };

  const removeDestination = (id: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, enabled: false } : item)));
  };

  const resetSelection = () => {
    setItems(plannerItems);
    setCustomDays(null);
  };

  return (
    <section className="bg-[#fffaf0] px-4 pb-8 pt-12 sm:px-6 md:px-12 md:pb-10 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Diseña tu ruta</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#223040] md:text-5xl">
            Elige destinos, nivel de servicio y recibe tu estimado.
          </h2>
          <p className="mt-4 text-base leading-8 text-charcoal/70">
            Activa los lugares que quieres visitar y cambia entre Económico, Confort o Lujo para ver cómo evoluciona la inversión.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="grid gap-4">
            {items.map((destination, index) => (
              <motion.article
                key={destination.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={`group relative overflow-hidden rounded-lg border bg-white/90 p-3 shadow-[0_18px_45px_rgba(34,48,64,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(34,48,64,0.13)] sm:p-4 ${
                  destination.enabled ? 'border-mutedGold/50' : 'border-charcoal/10 opacity-60'
                }`}
              >
                {destination.enabled && <div className="absolute left-0 top-0 h-full w-1 bg-mutedGold" />}
                <div className="grid gap-4 md:grid-cols-[190px_1fr_140px] md:items-center">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      loading="lazy"
                      className="h-36 w-full object-cover transition duration-700 group-hover:scale-105 md:h-28"
                    />
                  </div>

                  <div className="md:border-r md:border-charcoal/10 md:pr-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-mutedGold">{destination.days}</p>
                    <h3 className="mt-2 text-xl font-bold text-[#223040] sm:text-2xl">{destination.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-charcoal/70">{destination.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-5 md:flex-col md:items-end">
                    <button
                      type="button"
                      onClick={() => toggleDestination(destination.id)}
                      aria-pressed={destination.enabled}
                      className={`flex h-8 w-14 items-center rounded-full p-1 transition ${
                        destination.enabled ? 'bg-mutedGold' : 'bg-charcoal/50'
                      }`}
                    >
                      <span className={`h-6 w-6 rounded-full bg-white shadow-md transition ${destination.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-charcoal/60">Desde</p>
                      <p className={`text-2xl font-bold ${destination.enabled ? 'text-[#223040]' : 'text-charcoal/50'}`}>
                        {formatCurrency(destination.price)}
                      </p>
                      <p className="text-xs font-semibold text-charcoal/60">USD por persona</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="rounded-lg bg-[#223040] p-4 text-white shadow-[0_26px_70px_rgba(34,48,64,0.28)] sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Tu cálculo de ruta</p>
              <button
                type="button"
                onClick={resetSelection}
                className="inline-flex items-center gap-2 rounded-md border border-sand/50 px-3 py-2 text-xs font-bold text-sand transition hover:bg-sand hover:text-[#223040]"
              >
                Reiniciar
                <RefreshCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold">Nivel de servicio</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {planOrder.map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`rounded-md border px-3 py-2 text-xs font-bold transition ${
                      selectedPlan === plan
                        ? 'border-sand bg-sand text-[#223040]'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-sand hover:text-sand'
                    }`}
                  >
                    {planDetails[plan].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold">Viajeros</p>
                <div className="mt-3 flex w-fit items-center rounded-md border border-white/20">
                  <button type="button" onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))} className="p-3">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-bold">{travelerCount}</span>
                  <button type="button" onClick={() => setTravelerCount(travelerCount + 1)} className="p-3">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold">Días</p>
                <div className="mt-3 flex w-fit items-center rounded-md border border-white/20">
                  <button
                    type="button"
                    onClick={() => setCustomDays(Math.max(1, totalDays - 1))}
                    disabled={selectedItems.length === 0}
                    className="p-3 disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-bold">{totalDays}</span>
                  <button
                    type="button"
                    onClick={() => setCustomDays(Math.max(1, totalDays) + 1)}
                    disabled={selectedItems.length === 0}
                    className="p-3 disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-7 min-h-[210px]">
              <AnimatePresence initial={false}>
                {selectedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[52px_1fr_auto] items-center gap-3 border-b border-white/10 py-2.5"
                  >
                    <img src={item.image} alt={item.title} className="h-10 w-[52px] rounded-md object-cover" loading="lazy" />
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-white/65">{item.days}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-right text-sm font-bold leading-tight">
                        {formatCurrency(Math.round(item.price * activeMultiplier))}
                        <span className="block text-[10px] font-medium uppercase tracking-[0.08em] text-white/65">USD pp</span>
                      </p>
                      <button type="button" onClick={() => removeDestination(item.id)} aria-label={`Quitar ${item.title}`}>
                        <X className="h-3.5 w-3.5 text-white/60 transition hover:text-sand" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {selectedItems.length === 0 && (
                <div className="flex min-h-[180px] items-center justify-center rounded-md border border-dashed border-white/20 text-center text-sm text-white/70">
                  Activa al menos un destino para calcular tu estimado.
                </div>
              )}
            </div>

            <div className="mt-8">
              <h4 className="font-bold">Resumen de tu viaje</h4>
              <div className="mt-4 grid gap-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-white/80"><CalendarDays className="h-4 w-4 text-mutedGold" /> Duración total</span>
                  <motion.span key={`${totalDays}-${totalNights}`} className="font-semibold">
                    {totalDays} días / {totalNights} noches
                  </motion.span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-white/80"><MapPin className="h-4 w-4 text-mutedGold" /> Lugares incluidos</span>
                  <motion.span key={selectedItems.length} className="font-semibold">
                    {selectedItems.length} lugares
                  </motion.span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-white/80"><Users className="h-4 w-4 text-mutedGold" /> Viajeros</span>
                  <span className="font-semibold">{travelerCount} adultos</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-white/20 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white/80">Estimado por persona</p>
                <motion.p key={pricePerPerson} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {formatCurrency(pricePerPerson)} <span className="text-lg font-medium">USD</span>
                </motion.p>
              </div>
              <div className="sm:border-l sm:border-white/20 sm:pl-7">
                <p className="text-sm font-semibold text-white/80">Total estimado</p>
                <motion.p key={totalPrice} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {formatCurrency(totalPrice)} <span className="text-lg font-medium">USD</span>
                </motion.p>
              </div>
            </div>

            <Link to="/#propuesta" className="mt-7 flex w-full items-center justify-center gap-3 rounded-md bg-sand px-5 py-4 text-sm font-bold text-[#223040] transition hover:bg-mutedGold hover:text-white">
              Solicitar propuesta personalizada
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-5 text-center text-xs leading-6 text-white/70">
              Este es solo un estimado. El precio final puede variar según disponibilidad, temporada y preferencias.
            </p>
          </aside>
        </div>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-[0.82fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">Elige tu estilo de viaje</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#223040] md:text-4xl">
                Tres formas de vivir {destinationName}, tú eliges cómo.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-charcoal/60 md:justify-self-end">
              Cada estilo ha sido diseñado para ofrecerte la mejor experiencia según tus preferencias, con distintos niveles de servicio,
              privacidad y comodidad.
            </p>
          </div>

          <motion.article
            key={selectedPlan}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-8 overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-[0_24px_70px_rgba(34,48,64,0.11)]"
          >
            <div className="grid lg:h-[560px] lg:grid-cols-[0.78fr_1.42fr]">
              <div className="flex flex-col justify-center p-6 md:p-9 lg:h-full lg:min-h-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-mutedGold">{activePlan.eyebrow}</p>
                <h4 className="mt-4 text-3xl font-bold text-[#223040]">{activePlan.label}</h4>
                <div className="mt-4 h-px w-12 bg-mutedGold" />
                <p className="mt-5 text-sm leading-7 text-charcoal/70">{activePlan.text}</p>
                <div className="mt-6 grid gap-3">
                  {activePlan.includes.map((item) => (
                    <p key={item} className="flex items-start gap-3 text-sm font-medium text-[#223040]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mutedGold" />
                      {item}
                    </p>
                  ))}
                </div>
                <p className="mt-7 text-sm leading-7 text-charcoal/65">{activePlan.bestFor}</p>
              </div>

              <div className="relative h-[280px] overflow-hidden p-3 sm:h-[320px] sm:p-4 md:h-[420px] lg:h-full">
                <img
                  src={localPlanImage(destinationId, selectedPlan)}
                  alt={`Paquete ${activePlan.label}`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = activePlan.image;
                  }}
                  className="h-full w-full rounded-md object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 flex justify-end rounded-b-md bg-gradient-to-t from-black/45 via-black/10 to-transparent p-4">
                  <Link
                    to="/#propuesta"
                    className="inline-flex items-center justify-center gap-3 rounded-md bg-mutedGold px-5 py-3 text-sm font-bold text-white shadow-[0_16px_35px_rgba(0,0,0,0.2)] transition hover:bg-[#223040] sm:px-7 sm:py-4"
                  >
                    Ver detalle del plan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {planOrder.map((plan) => {
              const option = planDetails[plan];
              const isSelected = selectedPlan === plan;

              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`group relative h-28 overflow-hidden rounded-lg border text-left shadow-soft transition duration-300 hover:-translate-y-0.5 ${
                    isSelected ? 'border-[#223040] bg-[#223040] text-white' : 'border-charcoal/10 bg-white text-[#223040]'
                  }`}
                >
                  <img
                    src={localPlanImage(destinationId, plan)}
                    alt={`Vista previa ${option.label}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = option.thumb;
                    }}
                    className="absolute inset-y-0 right-0 h-full w-1/2 object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#223040] via-[#223040]/95 to-[#223040]/30'
                        : 'bg-gradient-to-r from-white via-white/95 to-white/30'
                    }`}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-center px-6">
                    <div className="flex items-center gap-3">
                      <p className={`text-xl font-bold ${isSelected ? 'text-sand' : 'text-[#223040]'}`}>{option.label}</p>
                      {isSelected && <Check className="h-5 w-5 rounded-full border border-sand/50 p-0.5 text-sand" />}
                    </div>
                    <p className={`mt-3 text-sm font-medium ${isSelected ? 'text-white/75' : 'text-charcoal/60'}`}>
                      {isSelected ? 'Plan seleccionado' : 'Descubre más'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-7 grid gap-4 rounded-lg bg-white/60 p-5 shadow-soft md:grid-cols-4">
          {[
            ['Pago seguro', '100% protegido'],
            ['Atención personalizada', 'Diseñamos tu viaje ideal'],
            ['Viajes a medida', 'Experiencias únicas'],
            ['Soporte 24/7', 'Estamos contigo siempre'],
          ].map(([title, text]) => (
            <div key={title} className="flex items-center gap-3 md:justify-center">
              <Check className="h-5 w-5 text-mutedGold" />
              <div>
                <p className="text-xs font-bold text-[#223040]">{title}</p>
                <p className="text-xs text-charcoal/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationPlannerSection;
