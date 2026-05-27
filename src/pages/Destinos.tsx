import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Search, Star } from 'lucide-react';
import PremiumDestinationCard from '../components/PremiumDestinationCard';
import DestinationFilters from '../components/DestinationFilters';
import { destinations } from '../data/destinations';

const styleMultipliers = {
  economico: 0.92,
  confort: 1,
  lujo: 1.28,
};

const optionalActivities = [
  { id: 'guias', label: 'Guía privado especializado', price: 180 },
  { id: 'gastronomia', label: 'Experiencia gastronómica', price: 240 },
  { id: 'bienestar', label: 'Día de bienestar o spa', price: 170 },
];

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US')}`;

const Destinos = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popular');
  const [budget, setBudget] = useState(5000);
  const [selectedEstimateId, setSelectedEstimateId] = useState(destinations[0].id);
  const [travelers, setTravelers] = useState(2);
  const [durationDays, setDurationDays] = useState(8);
  const [travelStyle, setTravelStyle] = useState<keyof typeof styleMultipliers>('confort');
  const [enabledActivities, setEnabledActivities] = useState<string[]>(['guias']);

  const filteredDestinations = destinations
    .filter((dest) => {
      const normalizedSearch = search.toLowerCase();
      return (
        search === '' ||
        dest.name.toLowerCase().includes(normalizedSearch) ||
        dest.tagline.toLowerCase().includes(normalizedSearch) ||
        dest.region.toLowerCase().includes(normalizedSearch)
      );
    })
    .filter((dest) => filter === 'all' || dest.id === filter)
    .filter((dest) => budget >= 10000 || dest.priceValue <= budget)
    .sort((a, b) => {
      if (sort === 'price-low-high') return a.priceValue - b.priceValue;
      if (sort === 'price-high-low') return b.priceValue - a.priceValue;
      if (sort === 'name-az') return a.name.localeCompare(b.name);
      if (sort === 'name-za') return b.name.localeCompare(a.name);
      return 0;
    });

  const selectedEstimateDestination =
    destinations.find((destination) => destination.id === selectedEstimateId) ?? destinations[0];

  const activityTotal = useMemo(
    () =>
      optionalActivities
        .filter((activity) => enabledActivities.includes(activity.id))
        .reduce((total, activity) => total + activity.price, 0),
    [enabledActivities],
  );
  const nights = Math.max(durationDays - 1, 1);
  const durationAdjustment = Math.max(durationDays - 8, 0) * 120;
  const estimatePerPerson = Math.round(
    selectedEstimateDestination.priceValue * styleMultipliers[travelStyle] + activityTotal + durationAdjustment,
  );
  const totalEstimate = estimatePerPerson * travelers;

  const toggleActivity = (id: string) => {
    setEnabledActivities((current) =>
      current.includes(id) ? current.filter((activityId) => activityId !== id) : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-ivory pt-16 text-charcoal">
      <section
        className="relative -mt-px flex min-h-[440px] items-center justify-center bg-cover bg-center px-5 text-center text-white sm:min-h-[520px] md:min-h-[calc(700px-4rem)]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 md:px-12">
          <p className="eyebrow mb-4 text-sand">Destinos curados</p>
          <h1 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight drop-shadow-md sm:text-4xl md:text-6xl">
            Donde el alma se encuentra con el mapa
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/90 drop-shadow-sm md:text-lg">
            Descubre experiencias de viaje cuidadosamente curadas que conectan tu espíritu con los lugares más
            extraordinarios del mundo.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-12">
        <div className="premium-card overflow-hidden p-5 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex w-full items-center gap-3 md:max-w-xs">
              <Search className="h-5 w-5 text-charcoal" />
              <input
                type="text"
                placeholder="Buscar destinos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-warmGray/30 bg-white/70 px-4 py-2 text-sm text-charcoal outline-none transition focus:border-mutedGold focus:ring-2 focus:ring-mutedGold/20"
              />
            </label>
            <DestinationFilters
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              budget={budget}
              setBudget={setBudget}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredDestinations.map((destination) => (
            <PremiumDestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold">No encontramos una ruta con esos filtros.</p>
            <p className="mt-2 text-sm text-charcoal/60">Ajusta el presupuesto o explora todos los destinos.</p>
          </div>
        )}

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Link
              to="/experiencias"
              className="group rounded-lg border border-charcoal/10 bg-white/80 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Lo que dicen nuestros viajeros</p>
                <h2 className="mt-3 text-xl font-bold text-[#223040] sm:text-2xl">Historias reales, viajes memorables.</h2>
                </div>
                <ArrowRight className="h-5 w-5 text-mutedGold transition group-hover:translate-x-1" />
              </div>
              <div className="mt-6 rounded-lg bg-ivory p-5">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Viajera de Nos Vemos"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-[#223040]">Mariana G.</p>
                    <p className="text-xs text-charcoal/60">México</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">
                  “Cada detalle del viaje fue perfecto. Nos sentimos acompañados sin perder libertad, con hoteles y
                  experiencias que de verdad tenían intención.”
                </p>
                <div className="mt-4 flex items-center gap-1 text-mutedGold">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm font-bold text-mutedGold">Ver más reseñas</p>
              </div>
            </Link>

            <article className="rounded-lg border border-charcoal/10 bg-white/80 p-6 shadow-soft">
              <p className="eyebrow">Inversión</p>
              <label className="mt-4 block text-sm font-semibold text-charcoal/70">
                Ruta base
                <select
                  value={selectedEstimateId}
                  onChange={(event) => setSelectedEstimateId(event.target.value)}
                  className="mt-2 w-full rounded-md border border-charcoal/10 bg-ivory px-3 py-3 text-sm font-semibold text-[#223040] outline-none focus:border-mutedGold"
                >
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </label>
              <p className="mt-5 text-sm text-charcoal/60">Desde</p>
                <p className="mt-1 text-4xl font-bold text-[#223040] sm:text-5xl">
                {selectedEstimateDestination.price}
                <span className="ml-2 text-lg font-semibold">USD</span>
              </p>
              <p className="mt-3 text-xs leading-6 text-charcoal/60">
                Precio base por persona. Varía según temporada, hoteles, disponibilidad y estilo de viaje.
              </p>
              <Link to={`/destinos/${selectedEstimateDestination.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mutedGold">
                Ver qué incluye
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>

          <article className="rounded-lg border border-charcoal/10 bg-white/90 p-6 shadow-soft">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="eyebrow">Estima tu viaje en segundos</p>
                <h2 className="mt-3 text-xl font-bold text-[#223040] sm:text-2xl">Ajusta viajeros, duración y estilo.</h2>
              </div>
              <p className="rounded-full bg-sand/30 px-4 py-2 text-xs font-bold text-[#223040]">
                Base: {selectedEstimateDestination.name}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-bold text-[#223040]">Viajeros</p>
                <div className="mt-3 flex w-fit items-center rounded-md border border-charcoal/10">
                  <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="p-3">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-bold">{travelers}</span>
                  <button type="button" onClick={() => setTravelers(travelers + 1)} className="p-3">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#223040]">Días</p>
                <div className="mt-3 flex w-fit items-center rounded-md border border-charcoal/10">
                  <button type="button" onClick={() => setDurationDays(Math.max(4, durationDays - 1))} className="p-3">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-bold">{durationDays}</span>
                  <button type="button" onClick={() => setDurationDays(durationDays + 1)} className="p-3">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm font-bold text-[#223040]">Estilo de viaje</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  ['economico', 'Económico'],
                  ['confort', 'Confort'],
                  ['lujo', 'Lujo'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTravelStyle(value as keyof typeof styleMultipliers)}
                    className={`rounded-md border px-2 py-3 text-xs font-bold transition sm:px-4 sm:text-sm ${
                      travelStyle === value
                        ? 'border-[#223040] bg-[#223040] text-white'
                        : 'border-charcoal/10 bg-ivory text-[#223040] hover:border-mutedGold'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm font-bold text-[#223040]">Actividades opcionales</p>
              <div className="mt-4 grid gap-3">
                {optionalActivities.map((activity) => {
                  const enabled = enabledActivities.includes(activity.id);
                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => toggleActivity(activity.id)}
                      className="flex items-center justify-between gap-4 rounded-md border border-charcoal/10 bg-ivory px-4 py-3 text-left"
                    >
                      <span className="text-sm font-semibold text-[#223040]">{activity.label}</span>
                      <span className="flex items-center gap-3 text-sm font-bold text-mutedGold">
                        +{formatCurrency(activity.price)} USD
                        <span className={`flex h-6 w-11 rounded-full p-1 transition ${enabled ? 'bg-mutedGold' : 'bg-charcoal/30'}`}>
                          <span className={`h-4 w-4 rounded-full bg-white transition ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-5 border-t border-charcoal/10 pt-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-charcoal/60">Duración estimada</p>
                <p className="mt-2 text-2xl font-bold text-[#223040]">
                  {durationDays} días / {nights} noches
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal/60">Estimado por persona</p>
                <p className="mt-2 text-3xl font-bold text-[#223040] sm:text-4xl">
                  {formatCurrency(estimatePerPerson)} <span className="text-lg font-semibold">USD</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal/60">Estimado total</p>
                <p className="mt-2 text-3xl font-bold text-[#223040] sm:text-4xl">
                  {formatCurrency(totalEstimate)} <span className="text-lg font-semibold">USD</span>
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-6 text-charcoal/60">
              Este es solo un estimado. El precio final debe confirmarse con nuestro equipo de asesoría.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Destinos;
