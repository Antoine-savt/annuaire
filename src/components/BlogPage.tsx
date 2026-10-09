import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';

const featuredArticle = {
  title: "Organiser un Mariage Haut de Gamme dans le Var : Le Guide Ultime",
  category: "Conseils & Organisation",
  date: "10 Septembre 2026",
  readTime: "8 min",
  excerpt: "Entre le massif de l'Estérel, les vignobles réputés de la Dracénie et les eaux cristallines de la Côte d'Azur, le département du Var (83) s'impose comme une destination incontournable pour les réceptions de prestige. Découvrez comment orchestrer un événement d'exception, du choix du domaine à la sélection des prestataires.",
  imageUrl: "https://images.unsplash.com/photo-1519225426343-a864e2960627?auto=format&fit=crop&w=1600&q=80",
};

const articles = [
  {
    title: "Les plus beaux châteaux viticoles pour un mariage en Provence",
    category: "Lieux d'Exception",
    date: "28 Août 2026",
    readTime: "5 min",
    excerpt: "L'œnotourisme de luxe s'invite dans l'univers du mariage. Les domaines viticoles varois offrent non seulement des vins prestigieux pour votre repas de noces, mais également des cadres architecturaux grandioses entre bastides historiques et chais contemporains.",
    imageUrl: "https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Se marier sur la French Riviera : Bastide historique ou Villa moderne ?",
    category: "Inspiration",
    date: "15 Août 2026",
    readTime: "6 min",
    excerpt: "De Saint-Tropez à Bandol, le littoral varois regorge de trésors cachés. Faut-il privilégier le charme authentique d'une bastide en pierre entourée d'oliviers, ou l'épure d'une villa contemporaine avec vue panoramique sur la mer Méditerranée ?",
    imageUrl: "https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Le calendrier parfait : Quelle saison choisir pour se marier dans le Sud ?",
    category: "Organisation",
    date: "02 Août 2026",
    readTime: "4 min",
    excerpt: "Si l'été reste la haute saison incontestée, les mois de mai, juin et septembre offrent une lumière incomparable et des températures idéales pour vos cérémonies laïques en extérieur et vos cocktails sous les étoiles.",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-71fbce2ae64c?auto=format&fit=crop&w=800&q=80",
  }
];

export function BlogPage() {
  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 mb-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
            Le Journal.
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl font-sans leading-relaxed">
            Inspirations, conseils d'experts et découvertes autour de l'art de recevoir et de l'organisation de mariages en Provence et sur la Côte d'Azur.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Featured Article */}
        <article className="group cursor-pointer mb-24 flex flex-col lg:flex-row bg-white border border-orange-100 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/5 hover:border-orange-200">
          <div className="relative w-full lg:w-3/5 min-h-[400px] lg:min-h-[500px] bg-stone-100 overflow-hidden">
            <img 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-orange-900 shadow-sm">
              À la Une
            </div>
          </div>
          
          <div className="w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
              <span>{featuredArticle.category}</span>
              <span className="w-1 h-1 bg-orange-300 rounded-full"></span>
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {featuredArticle.date}</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight mb-6 group-hover:text-orange-950 transition-colors">
              {featuredArticle.title}
            </h3>
            
            <p className="text-stone-600 text-base leading-relaxed mb-10">
              {featuredArticle.excerpt}
            </p>
            
            <div className="mt-auto flex items-center justify-between border-t border-orange-100 pt-8">
              <span className="flex items-center text-xs font-semibold uppercase tracking-widest text-orange-800/60">
                <Clock className="w-4 h-4 mr-2" /> {featuredArticle.readTime} de lecture
              </span>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:text-orange-700 transition-colors">
                Lire l'article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>

        {/* Section Divider */}
        <div className="flex items-center justify-between border-b border-orange-100 pb-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-800/50">
            Derniers Articles
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer flex flex-col">
              <div className="relative h-72 mb-6 overflow-hidden bg-stone-100 rounded-2xl">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400">
                <span>{article.category}</span>
                <span className="w-1 h-1 bg-orange-300 rounded-full"></span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 leading-snug mb-4 group-hover:text-orange-950 transition-colors">
                {article.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:text-orange-700 transition-colors">
                Lire la suite <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

        {/* SEO Intensive Block */}
        <div className="bg-[#242120] rounded-3xl text-stone-50 p-10 lg:p-16 border border-[#3b3533] shadow-xl">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl mb-6 text-orange-50">L'Excellence du Mariage dans le Var (83)</h2>
            <div className="w-16 h-px bg-orange-900/50 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-300 font-sans">
            <div>
              <p className="mb-6">
                Organiser un <strong>mariage haut de gamme dans le Var (83)</strong> exige une connaissance pointue des lieux les plus exclusifs de la région PACA. Que vous rêviez d'une cérémonie romantique au cœur des vignes de Provence, d'une réception fastueuse dans un <strong>château historique</strong>, ou d'une soirée moderne dans une luxueuse villa dominant la mer Méditerranée, le département du Var offre une diversité de paysages incomparables pour célébrer votre union.
              </p>
              <p>
                Notre annuaire premium est méticuleusement conçu pour les futurs mariés exigeants et les <strong>Wedding Planners de luxe</strong>. Nous avons sélectionné les <em className="text-orange-200/80">meilleurs domaines de mariage du Var</em>, intégrant des critères stricts : capacité d'accueil pour de grandes réceptions, hébergements de prestige sur place (suites nuptiales, bastides d'invités), espaces traiteur professionnels et cadres architecturaux remarquables (orangeries, jardins à la française, parcs arborés).
              </p>
            </div>
            <div>
              <p className="mb-6">
                Des villages perchés du Haut-Var (Tourtour, Fayence, Lorgues) jusqu'au golfe de Saint-Tropez et à la presqu'île de Giens, chaque <strong>lieu de réception pour mariage</strong> listé dans notre collection garantit intimité, exclusivité et services sur-mesure. La location d'un domaine dans le Sud de la France permet de profiter d'un ensoleillement exceptionnel pour vos cocktails en plein air et vos dîners de gala sous les oliviers.
              </p>
              <p>
                Parcourez nos fiches détaillées pour découvrir l'histoire de chaque lieu, ses tarifs indicatifs (budgets premium), et ses atouts uniques. L'Édition vous accompagne dans la première étape cruciale de votre organisation : trouver l'écrin parfait qui sublimera votre <strong>mariage de luxe sur la Côte d'Azur</strong> et marquera à jamais l'esprit de vos invités.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
