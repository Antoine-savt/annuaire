import { useState } from 'react';
import { Venue } from '../types';
import { Link, useRouter } from '../router';
import { translator, useLang } from '../i18n/lang';
import { Photo } from './Photo';

export function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === 'left' ? 'M12.5 4.5 7 10l5.5 5.5' : 'M7.5 4.5 13 10l-5.5 5.5'} />
    </svg>
  );
}

export const arrowClass =
  'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-white';

/** Photos shown in a venue's preview in the lists. */
const PREVIEW_PHOTOS = 8;

/**
 * Photo preview with arrows. After the last photo, the next click opens the full venue page.
 */
export function VenueGallery({ venue, href }: { venue: Venue; href: string }) {
  const { navigate } = useRouter();
  const t = translator(useLang());
  const [index, setIndex] = useState(0);
  // A few photos are enough to make couples want more: the venue page shows them all.
  const photos = venue.gallery.slice(0, PREVIEW_PHOTOS);
  const last = photos.length - 1;
  const onLast = index === last;

  const next = () => (onLast ? navigate(href) : setIndex(index + 1));

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-sage-soft md:aspect-auto md:min-h-80"
      role="group"
      aria-roledescription={t('carrousel', 'carousel')}
      aria-label={t(`Photos de ${venue.nom_du_lieu}`, `Photos of ${venue.nom_du_lieu}`)}
    >
      {photos.map((id, i) =>
        // Render the visible photo and preload the next one.
        i === index || i === index + 1 ? (
          <div key={id} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-300 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
            <Photo
              id={id}
              alt={
                i === 0
                  ? venue.imageAlt
                  : `${venue.nom_du_lieu}, photo ${i + 1} ${t('sur', 'of')} ${photos.length}${venue.illustrative ? t(' (illustration)', ' (illustrative)') : ''}`
              }
              sizes="(min-width: 768px) 560px, 100vw"
              maxWidth={1200}
            />
          </div>
        ) : null,
      )}

      <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0" />

      {index > 0 && (
        <button type="button" onClick={() => setIndex(index - 1)} className={`${arrowClass} left-3`} aria-label={t('Photo précédente', 'Previous photo')}>
          <Chevron direction="left" />
        </button>
      )}

      {onLast ? (
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-pine py-2.5 pl-4 pr-3 text-sm font-semibold text-white shadow-md transition hover:bg-pine-dark"
        >
          {t('Voir la fiche', 'View venue')}
          <Chevron direction="right" />
        </button>
      ) : (
        <button type="button" onClick={next} className={`${arrowClass} right-3`} aria-label={t('Photo suivante', 'Next photo')}>
          <Chevron direction="right" />
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/45 to-transparent px-4 pb-3 pt-8 text-xs text-white">
        <span aria-live="polite">
          {index + 1} / {photos.length}
        </span>
        <span className="flex gap-1.5" aria-hidden>
          {photos.map((id, i) => (
            <span key={id} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/55'}`} />
          ))}
        </span>
      </div>
    </div>
  );
}
