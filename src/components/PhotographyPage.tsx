import { MapPin, Instagram, Globe } from 'lucide-react';

export function PhotographyPage() {
  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 mb-20">
        <div className="relative w-full h-[40vh] min-h-[400px] mb-8 bg-stone-100 rounded-3xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1542044801-39fb9dc297e6?auto=format&fit=crop&w=2000&q=80" 
            alt="Photographie de mariage" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
            L'Art de l'Image.
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl font-sans leading-relaxed">
            Un regard unique pour sublimer votre événement et l'architecture des lieux. Une approche sur-mesure pour les mariages d'exception et la mise en valeur de domaines.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white border border-orange-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-orange-900/5 transition-shadow duration-500">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80" 
              alt="Atelier Lumière" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Content */}
          <div className="p-10 lg:p-16 flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-400 mb-4">
              Photographe Exclusif
            </p>
            <h3 className="font-serif text-4xl text-stone-900 mb-6">Atelier Lumière</h3>
            
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center text-stone-600 text-sm">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                Reportages de Mariages
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                Photographie d'Architecture & Domaines
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                Var & Provence-Alpes-Côte d'Azur
              </div>
            </div>
            
            <p className="text-stone-600 text-base leading-relaxed mb-10">
              Avec une approche inspirée de la photographie Fine Art et du reportage documentaire, notre studio partenaire capture l'essence de votre mariage et la majesté des lieux de réception. 
              <br/><br/>
              Nous privilégions la lumière naturelle, les compositions épurées et les instants authentiques pour créer des images intemporelles, dignes des plus beaux magazines.
            </p>
            
            <div className="pt-8 border-t border-orange-100 flex items-center justify-between">
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 bg-stone-900 rounded-xl text-white text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-orange-900">
                Découvrir le Portfolio
              </a>
              <div className="flex space-x-4 text-orange-300">
                <Globe className="w-5 h-5 hover:text-orange-900 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-orange-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
