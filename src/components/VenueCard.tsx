import { useState } from 'react';
import { Venue } from '../types';
import { MapPin, Users, Bed, Coins, Phone, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const maxImages = Math.min(venue.galleryUrls?.length || 1, 4);
  const showOverlay = imageIndex === maxImages;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex < maxImages) {
      setImageIndex((prev) => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="flex flex-col lg:flex-row bg-white rounded-2xl border border-orange-100/80 group cursor-pointer hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-300"
    >
      {/* Image Side */}
      <div 
        className="relative w-full lg:w-[40%] min-h-[250px] lg:min-h-full shrink-0 bg-stone-100 overflow-hidden rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl"
        onMouseLeave={() => setImageIndex(0)}
      >
        {showOverlay ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 text-white transition-opacity duration-500 p-8 text-center">
            <span className="font-serif text-3xl mb-4 leading-tight">Découvrir<br/>{venue.nom_du_lieu}</span>
            <span className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-orange-200">
              Voir la fiche détaillée
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </div>
        ) : venue.galleryUrls && venue.galleryUrls.length > 0 ? (
          <img 
            src={venue.galleryUrls[imageIndex]} 
            alt={venue.nom_du_lieu} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
            loading="lazy"
          />
        ) : venue.imageUrl ? (
          <img 
            src={venue.imageUrl} 
            alt={venue.nom_du_lieu} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-serif italic">
            Visuel indisponible
          </div>
        )}

        {/* Carousel controls - only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevImage}
            disabled={imageIndex === 0}
            className={`p-2 rounded-full bg-white/90 text-stone-900 hover:bg-white shadow-sm transition-all ${imageIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-100 hover:scale-105'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextImage}
            className="p-2 rounded-full bg-white/90 text-stone-900 hover:bg-white shadow-sm transition-all opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Dots indicator */}
        {!showOverlay && maxImages > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {Array.from({ length: maxImages }).map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === imageIndex ? 'bg-white' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col w-full">
        <div className="mb-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-tight mb-2 group-hover:text-stone-600 transition-colors">
            {venue.nom_du_lieu}
          </h3>
          <div className="flex items-center text-stone-500 text-sm font-medium">
            <MapPin className="w-4 h-4 mr-1.5" />
            {venue.commune_et_zone}
          </div>
        </div>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 line-clamp-3">
          {venue.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center text-stone-700">
            <Users className="w-4 h-4 mr-3 text-stone-400" />
            <span className="text-sm font-medium">{venue.capacite_accueil}</span>
          </div>
          <div className="flex items-center text-stone-700">
            <Bed className="w-4 h-4 mr-3 text-stone-400" />
            <span className="text-sm font-medium">{venue.hebergement_sur_place}</span>
          </div>
          <div className="flex items-center text-stone-700">
            <Coins className="w-4 h-4 mr-3 text-stone-400" />
            <span className="text-sm font-medium">{venue.fourchette_de_prix}</span>
          </div>
          <div className="flex items-center text-stone-700">
            <Phone className="w-4 h-4 mr-3 text-stone-400" />
            <span className="text-sm font-medium">{venue.contact}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start flex-1">
            <Sparkles className="w-4 h-4 mr-2 text-orange-800 shrink-0 mt-0.5" />
            <p className="text-sm text-stone-800 italic font-serif line-clamp-2">
              {venue.element_differenciant}
            </p>
          </div>
          <span
            className="shrink-0 inline-flex items-center justify-center text-sm font-bold uppercase tracking-widest text-stone-900 group-hover:text-orange-700 transition-colors"
          >
            Découvrir
            <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </div>
      </div>
    </div>
  );
}
