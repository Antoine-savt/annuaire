import { useState } from 'react';
import { Venue } from '../types';
import { ArrowLeft, MapPin, Users, Bed, Coins, Phone, Sparkles, Check, X, Mail, Heart } from 'lucide-react';

interface VenueDetailProps {
  venue: Venue;
  onBack: () => void;
}

export function VenueDetail({ venue, onBack }: VenueDetailProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="pb-24 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-sm font-semibold tracking-wide uppercase text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'annuaire
        </button>
      </div>

      {/* Hero Content & Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image Gallery (Bento) */}
          <div className="lg:col-span-2">
            {/* Bento Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] sm:h-[600px]">
              {/* Main Image */}
              <div className="md:col-span-1 h-full relative rounded-2xl sm:rounded-l-3xl overflow-hidden group">
                <img 
                  src={venue.galleryUrls[0] || 'https://images.unsplash.com/photo-1519225426343-a864e2960627?auto=format&fit=crop&w=1200'} 
                  alt={venue.nom_du_lieu} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Stacked Images */}
              <div className="hidden md:grid grid-rows-2 gap-4 h-full relative">
                <div className="h-full relative rounded-tr-3xl overflow-hidden group">
                  <img 
                    src={venue.galleryUrls[1] || 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800'} 
                    alt={`Aperçu 2`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-stone-900 shadow-sm flex items-center gap-2">
                    <Check className="w-3 h-3 text-orange-900" /> Confirmé
                  </div>
                </div>
                <div className="h-full relative rounded-br-3xl overflow-hidden group">
                  <img 
                    src={venue.galleryUrls[2] || 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800'} 
                    alt={`Aperçu 3`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest text-stone-900 shadow-sm hover:bg-stone-900 hover:text-white transition-colors">
                    Voir Photos
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Quick Actions & Title */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-900/5 border border-stone-100">
              {/* Title & Location */}
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight mb-3">
                {venue.nom_du_lieu}
              </h1>
              <div className="flex items-center text-stone-500 text-sm mb-8">
                <MapPin className="w-4 h-4 mr-2" />
                {venue.commune_et_zone}
              </div>

              {/* Quick Info Box */}
              <div className="bg-[#fdfbf9] border border-stone-100 rounded-2xl p-5 space-y-4 mb-8">
                <div className="flex items-center text-stone-700">
                  <Coins className="w-5 h-5 mr-4 text-stone-400 shrink-0" />
                  <span className="text-sm font-medium">À partir de {venue.fourchette_de_prix.replace(' - ', ' à ')}</span>
                </div>
                <div className="w-full h-px bg-stone-100"></div>
                <div className="flex items-center text-stone-700">
                  <Users className="w-5 h-5 mr-4 text-stone-400 shrink-0" />
                  <span className="text-sm font-medium">Capacité: {venue.capacite_accueil}</span>
                </div>
                <div className="w-full h-px bg-stone-100"></div>
                <div className="flex items-center text-stone-700">
                  <Bed className="w-5 h-5 mr-4 text-stone-400 shrink-0" />
                  <span className="text-sm font-medium">Hébergement: {venue.hebergement_sur_place}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="text-center mb-6">
                <p className="text-xs text-orange-900 font-medium mb-3 flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Réponse habituelle sous 24h
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="flex-1 py-4 bg-[#e45b63] rounded-xl text-white text-sm font-bold tracking-wide transition-all hover:bg-[#d4464e] hover:shadow-lg active:scale-95"
                  >
                    Nous contacter
                  </button>
                  <button className="w-14 shrink-0 flex items-center justify-center bg-white border border-[#e45b63] text-[#e45b63] rounded-xl transition-colors hover:bg-stone-50">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3 pt-6 border-t border-stone-100 text-sm text-stone-600">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-stone-400" /> Très sollicité dans le Var
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-stone-400" /> Plus de 150 couples l'ont engagé
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-stone-400" /> Très recommandé dans le Var
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Below Header) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl text-stone-900 mb-6">À propos du domaine</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8 font-sans whitespace-pre-line">
              {venue.description}
              {"\n\n"}
              {venue.detailedDescription}
            </p>

            <div className="bg-orange-50/70 p-8 border border-orange-100 rounded-2xl mb-12">
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 mr-4 mt-1 text-orange-800 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-orange-900 mb-2">L'élément remarquable</h4>
                  <p className="text-stone-800 italic font-serif text-lg leading-relaxed">
                    "{venue.element_differenciant}"
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-stone-900 mb-6">Prestations & Équipements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {venue.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center text-stone-600 bg-stone-50 px-4 py-3 rounded-xl border border-stone-100">
                  <Check className="w-4 h-4 mr-3 text-orange-900" />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
            
            <h3 className="font-serif text-2xl text-stone-900 mb-6">Localisation & Contact</h3>
            <div className="bg-[#fdfbf9] border border-stone-200 rounded-2xl p-8 mb-16">
              <div className="flex flex-col sm:flex-row justify-between gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Adresse</h4>
                  <p className="text-stone-900 font-medium mb-6">{venue.contact.replace('Tél : ', '')}</p>
                  
                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Secteur</h4>
                  <p className="text-stone-900 font-medium">{venue.commune_et_zone}</p>
                </div>
                <div className="flex flex-col gap-3 justify-center sm:items-end">
                  <a
                    href={venue.site_web_officiel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-xl border border-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-stone-50 hover:border-stone-300"
                  >
                    Visiter le site web
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#fdfbf9] w-full max-w-2xl relative shadow-2xl rounded-3xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8 sm:p-12">
              <h3 className="font-serif text-3xl text-stone-900 mb-2">Demande de devis</h3>
              <p className="text-stone-500 mb-8">Pour {venue.nom_du_lieu}</p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsContactModalOpen(false); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Prénom</label>
                    <input 
                      type="text" 
                      className="w-full border-orange-200 bg-white rounded-xl p-3 text-sm focus:border-orange-900 focus:ring-orange-900/20 transition-colors"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Nom</label>
                    <input 
                      type="text" 
                      className="w-full border-orange-200 bg-white rounded-xl p-3 text-sm focus:border-orange-900 focus:ring-orange-900/20 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Date souhaitée</label>
                    <input 
                      type="date" 
                      className="w-full border-orange-200 bg-white rounded-xl p-3 text-sm text-stone-600 focus:border-orange-900 focus:ring-orange-900/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Nombre d'invités</label>
                    <input 
                      type="number" 
                      min="1"
                      className="w-full border-orange-200 bg-white rounded-xl p-3 text-sm focus:border-orange-900 focus:ring-orange-900/20 transition-colors"
                      placeholder="Ex: 120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Votre message</label>
                  <textarea 
                    rows={4}
                    className="w-full border-orange-200 bg-white rounded-xl p-3 text-sm focus:border-orange-900 focus:ring-orange-900/20 transition-colors resize-none"
                    placeholder="Parlez-nous de votre projet de mariage..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-stone-900 rounded-xl text-white text-sm font-bold uppercase tracking-widest transition-colors hover:bg-orange-900"
                  >
                    Envoyer la demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
