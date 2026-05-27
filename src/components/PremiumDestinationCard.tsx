import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, MapPin } from 'lucide-react';

interface PremiumDestinationCardProps {
  destination: {
    id: string;
    name: string;
    tagline: string;
    price: string;
    highlights: string[];
    image: string;
    routePreview: string[];
  };
}

const PremiumDestinationCard = ({ destination }: PremiumDestinationCardProps) => {
  return (
    <Link 
      to={`/destinos/${destination.id}`} 
      className="group block overflow-hidden rounded-lg border border-charcoal/10 bg-white/80 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <img 
          src={destination.image} 
          alt={destination.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-5 text-mutedGold" />
          <h3 className="font-semibold text-charcoal text-lg">{destination.name}</h3>
        </div>
        <p className="mb-4 text-sm text-charcoal/60">{destination.tagline}</p>
        
        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.highlights.map((highlight, index) => (
            <span 
              key={index} 
              className="rounded-full bg-warmGray/20 px-3 py-1 text-xs font-medium text-charcoal/70"
            >
              {highlight}
            </span>
          ))}
        </div>
        
        {/* Route Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.routePreview.map((location, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 text-xs bg-mutedGold/20 rounded-full text-mutedGold"
            >
              {location}
            </span>
          ))}
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between border-t border-warmGray/20 pt-4">
          <div className="flex items-baseline gap-2">
            <DollarSign className="h-4 w-5 text-mutedGold" />
            <span className="font-bold text-2xl text-charcoal">{destination.price}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-mutedGold group-hover:text-charcoal transition-colors duration-200"/>
        </div>
      </div>
    </Link>
  );
};

export default PremiumDestinationCard;
