import { useState, useMemo } from 'react';
import { venues } from './data';
import { Venue } from './types';
import { VenueCard } from './components/VenueCard';
import { NavBar } from './components/NavBar';
import { PhotographyPage } from './components/PhotographyPage';
import { PrestatairesPage } from './components/PrestatairesPage';
import { BlogPage } from './components/BlogPage';
import { VenueDetail } from './components/VenueDetail';
import { Search, Sparkles, Compass, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'venues' | 'photography' | 'prestataires' | 'blog'>('venues');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  // Filters state
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [filterAccom, setFilterAccom] = useState<boolean>(false);

  // Extract unique zones
  const zones = useMemo(() => {
    const allZones = venues.map((v) => {
      const match = v.commune_et_zone.match(/\((.*?)\)/);
      return match ? match[1] : 'Autre';
    });
    return Array.from(new Set(allZones)).sort();
  }, []);

  const budgets = [
    { id: '€', label: 'Abordable (€)' },
    { id: '€€', label: 'Moyen (€€)' },
    { id: '€€€', label: 'Premium (€€€)' }
  ];

  const capacities = [
    { id: 'c1', label: 'Moins de 50 pers.', min: 0, max: 49 },
    { id: 'c2', label: '50 à 100 pers.', min: 50, max: 99 },
    { id: 'c3', label: '100 à 150 pers.', min: 100, max: 149 },
    { id: 'c4', label: '150 à 200 pers.', min: 150, max: 199 },
    { id: 'c5', label: '200 à 300 pers.', min: 200, max: 299 },
    { id: 'c6', label: 'Plus de 300 pers.', min: 300, max: 9999 },
  ];

  const filteredVenues = useMemo(() => {
    return venues.filter((v) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        v.nom_du_lieu.toLowerCase().includes(searchLower) || 
        v.description.toLowerCase().includes(searchLower) ||
        v.commune_et_zone.toLowerCase().includes(searchLower);

      const zoneName = v.commune_et_zone.match(/\((.*?)\)/)?.[1] || 'Autre';
      const matchesZone = selectedZones.length === 0 || selectedZones.includes(zoneName) || selectedZones.some(z => v.commune_et_zone.includes(z));
      
      const matchesBudget = selectedBudgets.length === 0 || selectedBudgets.includes(v.budgetCategory);
      
      const matchesGuests = selectedCapacities.length === 0 || selectedCapacities.some(capId => {
        const cap = capacities.find(c => c.id === capId);
        return cap && v.maxGuests >= cap.min && v.maxGuests <= cap.max;
      });
      
      const matchesAccom = !filterAccom || v.hasAccommodation;
      
      return matchesZone && matchesSearch && matchesBudget && matchesGuests && matchesAccom;
    });
  }, [selectedZones, searchQuery, selectedBudgets, selectedCapacities, filterAccom]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedZones([]);
    setSelectedBudgets([]);
    setSelectedCapacities([]);
    setFilterAccom(false);
  };

  const toggleZone = (zone: string) => {
    setSelectedZones(prev => prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]);
  };

  const toggleBudget = (budget: string) => {
    setSelectedBudgets(prev => prev.includes(budget) ? prev.filter(b => b !== budget) : [...prev, budget]);
  };

  const toggleCapacity = (capId: string) => {
    setSelectedCapacities(prev => prev.includes(capId) ? prev.filter(c => c !== capId) : [...prev, capId]);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] font-sans text-stone-900 selection:bg-orange-200/60 flex flex-col">
      <NavBar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          setSelectedVenue(null);
        }} 
      />
      
      {selectedVenue ? (
        <VenueDetail venue={selectedVenue} onBack={() => setSelectedVenue(null)} />
      ) : currentView === 'photography' ? (
        <PhotographyPage />
      ) : currentView === 'prestataires' ? (
        <PrestatairesPage />
      ) : currentView === 'blog' ? (
        <BlogPage />
      ) : (
        <div className="pb-32 animate-in fade-in duration-1000">
          
          {/* Spectacular Editorial Hero */}
          <div className="relative w-full h-[85vh] min-h-[600px] mb-20 lg:mb-32 flex items-center justify-center overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-4 sm:inset-8 lg:inset-12 bg-stone-100 rounded-[3rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519225426343-a864e2960627?auto=format&fit=crop&w=2400&q=80" 
                alt="Domaine de réception dans le Var" 
                className="w-full h-full object-cover opacity-90 scale-105 animate-in zoom-in duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
            </div>

            {/* Typography Overlays */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-20 h-full flex flex-col justify-end pb-16 lg:pb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white/90 mb-6 border border-white/20 self-start">
                <Sparkles className="w-3 h-3" />
                <span>Le guide d'exception</span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[7rem] text-white leading-[0.95] mb-8 mix-blend-overlay drop-shadow-sm">
                Réceptions<br/>
                <span className="italic font-light opacity-90 text-orange-100">dans le Var.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-12 w-full">
                <p className="text-white/90 text-lg sm:text-xl font-sans leading-relaxed max-w-xl font-light">
                  Une collection confidentielle et indépendante des plus beaux écrins de la Méditerranée. Bastides historiques, châteaux et domaines viticoles pour des événements uniques.
                </p>
                <a 
                  href="#annuaire" 
                  className="shrink-0 inline-flex items-center justify-center px-10 py-5 bg-white text-stone-900 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-orange-50 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] relative overflow-hidden group"
                >
                  <span className="relative z-10">Découvrir la collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100/0 via-orange-100/50 to-orange-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                </a>
              </div>
            </div>
          </div>

          {/* L'Esprit du Sud Section */}
          <section className="bg-orange-50/70 py-24 mb-24 border-y border-orange-100/60 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
              <div className="flex-1 space-y-8">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-900/60 mb-4">L'Art de Vivre</h2>
                <h3 className="font-serif text-4xl lg:text-5xl text-stone-900 leading-tight">
                  Sous le soleil <br/>
                  <span className="italic text-orange-900/80">de la Méditerranée.</span>
                </h3>
                <p className="text-stone-600 text-lg leading-relaxed font-sans">
                  Un mariage dans le Var, c'est la promesse d'une lumière exceptionnelle, du chant lointain des cigales et d'une douceur de vivre incomparable. Nous avons sélectionné avec cœur des lieux où la joie, le partage et l'élégance prennent tout leur sens.
                </p>
              </div>
              <div className="flex-1 w-full grid grid-cols-2 gap-4">
                <div className="pt-12">
                  <img 
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0a1?auto=format&fit=crop&w=600&q=80" 
                    alt="Joie et mariage" 
                    className="w-full h-[300px] object-cover rounded-tl-full rounded-br-full shadow-sm"
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=600&q=80" 
                    alt="Table de réception ensoleillée" 
                    className="w-full h-[300px] object-cover rounded-tr-full rounded-bl-full shadow-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide pr-4">
                <div className="space-y-8 pb-12">
                  
                  {/* Search */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Recherche</h3>
                  <div className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      className="w-full pl-7 pr-0 py-2 bg-transparent border-b border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                      placeholder="Mot-clé, nom..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Zone Filter */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Secteur</h3>
                  <ul className="space-y-2.5">
                    {zones.map((zone) => {
                      const isSelected = selectedZones.includes(zone);
                      return (
                        <li key={zone}>
                          <label className="flex items-center cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded-sm border-orange-200 text-orange-800 focus:ring-orange-800 focus:ring-offset-0 mr-3 transition-colors" 
                              checked={isSelected} 
                              onChange={() => toggleZone(zone)} 
                            />
                            <span className={`text-sm transition-colors ${
                              isSelected ? 'text-orange-950 font-medium' : 'text-stone-600 group-hover:text-stone-900'
                            }`}>
                              {zone}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Budget</h3>
                  <ul className="space-y-2.5">
                    {budgets.map((budget) => {
                      const isSelected = selectedBudgets.includes(budget.id);
                      return (
                        <li key={budget.id}>
                          <label className="flex items-center cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded-sm border-orange-200 text-orange-800 focus:ring-orange-800 focus:ring-offset-0 mr-3 transition-colors" 
                              checked={isSelected} 
                              onChange={() => toggleBudget(budget.id)} 
                            />
                            <span className={`text-sm transition-colors ${
                              isSelected ? 'text-orange-950 font-medium' : 'text-stone-600 group-hover:text-stone-900'
                            }`}>
                              {budget.label}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Capacity Filter */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Capacité</h3>
                  <ul className="space-y-2.5">
                    {capacities.map((cap) => {
                      const isSelected = selectedCapacities.includes(cap.id);
                      return (
                        <li key={cap.id}>
                          <label className="flex items-center cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded-sm border-orange-200 text-orange-800 focus:ring-orange-800 focus:ring-offset-0 mr-3 transition-colors" 
                              checked={isSelected} 
                              onChange={() => toggleCapacity(cap.id)} 
                            />
                            <span className={`text-sm transition-colors ${
                              isSelected ? 'text-orange-950 font-medium' : 'text-stone-600 group-hover:text-stone-900'
                            }`}>
                              {cap.label}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Checkbox Amenities */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Critères</h3>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded-sm border-orange-200 text-orange-800 focus:ring-orange-800 focus:ring-offset-0 mr-3 transition-colors" 
                      checked={filterAccom} 
                      onChange={(e) => setFilterAccom(e.target.checked)} 
                    />
                    <span className={`text-sm transition-colors ${filterAccom ? 'text-orange-950 font-medium' : 'text-stone-600 group-hover:text-stone-900'}`}>
                      Hébergement sur place
                    </span>
                  </label>
                </div>

                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                  Résultats
                </span>
                <span className="text-sm font-medium text-stone-900">
                  {filteredVenues.length} domaine{filteredVenues.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Venue List */}
              <div className="flex flex-col gap-10">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} onClick={() => setSelectedVenue(venue)} />
                ))}
                
                {filteredVenues.length === 0 && (
                  <div className="text-center py-32">
                    <p className="text-stone-500 font-serif text-2xl mb-6">
                      Aucun lieu ne correspond à ces critères.
                    </p>
                    <button 
                      onClick={resetFilters} 
                      className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors"
                    >
                      Réinitialiser la sélection
                    </button>
                  </div>
                )}
              </div>
            </main>

          </div>
        </div>
      )}

      {/* Spectacular Custom Footer */}
      <footer className="bg-[#1a1715] text-stone-300 pt-20 pb-8 mt-auto relative overflow-hidden border-t border-orange-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Top: Newsletter / CTA */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-white/5 pb-16">
            <div className="max-w-xl">
              <h3 className="font-serif text-4xl sm:text-5xl text-orange-50 mb-6 leading-tight">L'Inspiration,<br/><span className="text-stone-400 italic font-light">dans votre boîte de réception.</span></h3>
              <p className="text-stone-400 font-light leading-relaxed text-sm">Rejoignez notre cercle privé pour recevoir nos dernières découvertes de lieux d'exception, nos conseils d'artisans et nos inspirations esthétiques, avant tout le monde.</p>
            </div>
            <div className="w-full lg:w-auto flex-1 max-w-md">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Votre adresse email..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-16 py-4 text-orange-50 placeholder:text-stone-500 font-light focus:outline-none focus:border-orange-300/50 focus:bg-white/10 transition-all duration-300" 
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-orange-100 rounded-full flex items-center justify-center text-orange-950 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Middle: Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 font-light text-sm">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40 mb-6">Découvrir</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setCurrentView('venues')} className="hover:text-orange-200 transition-colors">Les Domaines</button></li>
                <li><button onClick={() => setCurrentView('prestataires')} className="hover:text-orange-200 transition-colors">Le Carnet d'Adresses</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40 mb-6">Inspiration</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setCurrentView('photography')} className="hover:text-orange-200 transition-colors">L'Art de l'Image</button></li>
                <li><button onClick={() => setCurrentView('blog')} className="hover:text-orange-200 transition-colors">Le Journal</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40 mb-6">L'Édition</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-orange-200 transition-colors">La Vision</a></li>
                <li><a href="#" className="hover:text-orange-200 transition-colors">Proposer un lieu</a></li>
                <li><a href="#" className="hover:text-orange-200 transition-colors">Contact presse</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40 mb-6">Légal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-orange-200 transition-colors">Mentions légales</a></li>
                <li><a href="#" className="hover:text-orange-200 transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom: Giant Typography & Copyright */}
          <div className="relative w-full flex flex-col items-center justify-center pt-8 border-t border-white/5">
            <h2 className="font-serif text-[15vw] leading-[0.8] text-[#24201d] whitespace-nowrap select-none tracking-tighter opacity-80 mt-8 mb-4 pointer-events-none">
              L'ÉDITION
            </h2>
            <div className="absolute top-12 w-full flex flex-col sm:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold px-4">
              <span className="mb-4 sm:mb-0">© {new Date().getFullYear()} L'Édition Var</span>
              <span>Design exclusif pour l'excellence</span>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
