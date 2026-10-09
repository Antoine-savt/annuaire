import { MapPin, Camera } from 'lucide-react';

interface NavBarProps {
  currentView: 'venues' | 'photography' | 'prestataires' | 'blog';
  onViewChange: (view: 'venues' | 'photography' | 'prestataires' | 'blog') => void;
}

export function NavBar({ currentView, onViewChange }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100/50 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => onViewChange('venues')}
          >
            <span className="font-serif text-xl text-orange-950 tracking-[0.3em] uppercase group-hover:opacity-70 transition-opacity">
              L'Édition.
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-10">
            <button
              onClick={() => onViewChange('venues')}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center ${
                currentView === 'venues' 
                  ? 'text-orange-900' 
                  : 'text-stone-400 hover:text-orange-800'
              }`}
            >
              Domaines
            </button>
            <button
              onClick={() => onViewChange('photography')}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center ${
                currentView === 'photography' 
                  ? 'text-orange-900' 
                  : 'text-stone-400 hover:text-orange-800'
              }`}
            >
              Photographes
            </button>
            <button
              onClick={() => onViewChange('prestataires')}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center ${
                currentView === 'prestataires' 
                  ? 'text-orange-900' 
                  : 'text-stone-400 hover:text-orange-800'
              }`}
            >
              Prestataires
            </button>
            <button
              onClick={() => onViewChange('blog')}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center ${
                currentView === 'blog' 
                  ? 'text-orange-900' 
                  : 'text-stone-400 hover:text-orange-800'
              }`}
            >
              Le Journal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
