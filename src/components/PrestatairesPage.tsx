import { Utensils, Flower2, Music, Sparkles, ChefHat, Palette, Video } from 'lucide-react';

const categories = [
  {
    name: "Traiteurs & Gastronomie",
    icon: ChefHat,
    desc: "Chefs créatifs, brigades étoilées et artisans du goût pour un dîner qui marquera les esprits.",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Design Floral",
    icon: Flower2,
    desc: "Scénographies végétales, arches fleuries et bouquets sur-mesure pour sublimer votre domaine.",
    imageUrl: "https://images.unsplash.com/photo-1507308197771-460d3d5f1712?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Musique & Ambiance",
    icon: Music,
    desc: "Groupes live, saxophonistes et DJ premium pour faire vibrer vos invités jusqu'au bout de la nuit.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Vidéastes",
    icon: Video,
    desc: "Réalisateurs et monteurs passionnés pour un film de mariage à l'esthétique cinématographique.",
    imageUrl: "https://images.unsplash.com/photo-1522201949034-507737bce479?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Wedding Planners",
    icon: Sparkles,
    desc: "Les architectes de votre événement pour une organisation sans faille et une sérénité totale.",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mise en Beauté",
    icon: Palette,
    desc: "Maquilleurs et coiffeurs studio pour une mise en beauté élégante, lumineuse et naturelle.",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80"
  }
];

export function PrestatairesPage() {
  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 mb-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
            Le Carnet d'Adresses.
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl font-sans leading-relaxed">
            Une sélection pointue des meilleurs artisans et créateurs du mariage dans le Var. Des professionnels passionnés et rigoureusement choisis pour leur excellence, au service de votre événement.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer bg-white rounded-3xl border border-orange-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-900/5 hover:border-orange-200 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-sm group-hover:bg-orange-50 transition-colors">
                  <category.icon className="w-6 h-6 text-orange-800" />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-orange-950 transition-colors">
                  {category.name}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1">
                  {category.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-orange-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 group-hover:text-orange-700 transition-colors">
                    Explorer la catégorie
                  </span>
                  <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:bg-orange-900 group-hover:border-orange-900 transition-all">
                    <Sparkles className="w-3 h-3 text-stone-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Placeholder for future specific vendors or call to action */}
        <div className="mt-24 bg-orange-50/70 rounded-3xl p-10 lg:p-16 border border-orange-100/60 text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-stone-900 mb-4">Vous êtes un prestataire d'exception ?</h2>
          <p className="text-stone-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Nous enrichissons continuellement notre carnet d'adresses. Si vous partagez nos valeurs d'excellence, d'esthétisme et d'amour du travail bien fait, contactez-nous pour rejoindre l'Édition.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 rounded-xl text-white text-sm font-bold uppercase tracking-widest transition-colors hover:bg-orange-900">
            Proposer votre candidature
          </button>
        </div>
      </main>
    </div>
  );
}
