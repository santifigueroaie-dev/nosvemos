import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Car, Shield, Sparkles, UserCheck, type LucideIcon } from 'lucide-react';
import DestinationPlannerSection from '../components/DestinationPlannerSection';
import DestinationProposalSection from '../components/DestinationProposalSection';
import { destinations } from '../data/destinations';

const trustItems: Array<[string, LucideIcon]> = [
  ['Seguro de viaje', Shield],
  ['Conductor privado', Car],
  ['Concierge 24/7', Sparkles],
  ['Guías certificados', UserCheck],
];

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id) ?? destinations[0];

  return (
    <main className="bg-ivory pt-16 text-charcoal">
      <section className="relative min-h-[500px] overflow-hidden text-white md:min-h-[560px]">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-5 sm:px-6 md:min-h-[560px] md:px-12">
          <div className="max-w-3xl">
            <Link to="/destinos" className="mb-8 inline-flex items-center gap-2 text-sm text-white/75">
              <ArrowLeft className="h-4 w-4" />
              Volver a destinos
            </Link>
            <p className="eyebrow text-sand">{destination.tagline}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">{destination.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">{destination.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-6 md:grid-cols-4 md:px-12 md:py-10">
        {trustItems.map(([label, Icon]) => (
          <div key={label} className="premium-card flex items-center gap-4 p-5">
            <Icon className="h-5 w-5 text-mutedGold" />
            <span className="text-sm font-semibold">{label}</span>
          </div>
        ))}
      </section>

      <DestinationPlannerSection destinationId={destination.id} />
      <DestinationProposalSection destination={destination} />
    </main>
  );
};

export default DestinationDetail;
