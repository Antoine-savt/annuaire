import { toggleSaved, useSaved } from '../lib/saved';

interface SaveButtonProps {
  slug: string;
  name: string;
  /** "solid" for action rows, "overlay" on top of a photo. */
  variant?: 'solid' | 'overlay';
  className?: string;
}

/** Adds a venue to the couple's selection ("Mes lieux"), or removes it. */
export function SaveButton({ slug, name, variant = 'solid', className = '' }: SaveButtonProps) {
  const saved = useSaved().includes(slug);

  const base =
    variant === 'overlay'
      ? 'rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-md backdrop-blur transition-colors'
      : 'btn';
  const look = saved
    ? 'bg-pine text-white hover:bg-pine-dark'
    : variant === 'overlay'
      ? 'bg-white/90 text-ink hover:bg-white'
      : 'border border-ink/25 text-ink hover:border-ink hover:bg-white';

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Retirer ${name} de mes lieux` : `Enregistrer ${name} dans mes lieux`}
      onClick={() => toggleSaved(slug)}
      className={`${base} ${look} ${className}`}
    >
      {saved ? 'Enregistré' : 'Enregistrer'}
    </button>
  );
}
