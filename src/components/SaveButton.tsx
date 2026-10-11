import { toggleSaved, useSaved } from '../lib/saved';
import { useT } from '../i18n/lang';

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
  const t = useT();

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
      aria-label={
        saved
          ? t(`Retirer ${name} de mes lieux`, `Remove ${name} from saved venues`)
          : t(`Enregistrer ${name} dans mes lieux`, `Add ${name} to your saved venues`)
      }
      onClick={() => toggleSaved(slug)}
      className={`${base} ${look} ${className}`}
    >
      {saved ? t('Enregistré', 'Saved') : t('Enregistrer', 'Save')}
    </button>
  );
}
