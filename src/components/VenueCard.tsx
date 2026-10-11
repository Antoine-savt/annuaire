import { Venue } from '../types';
import { Link } from '../router';
import { formatNumber, Lang, translator, useLang, usePaths } from '../i18n/lang';
import { Photo } from './Photo';
import { SaveButton } from './SaveButton';

export function capacityLabel(venue: Venue, lang: Lang = 'fr'): string {
  const t = translator(lang);
  return venue.maxGuests
    ? t(`Jusqu'à ${formatNumber(venue.maxGuests, lang)} invités`, `Up to ${formatNumber(venue.maxGuests, lang)} guests`)
    : t('Capacité sur demande', 'Capacity on request');
}

interface VenueCardProps {
  venue: Venue;
  headingLevel?: 'h2' | 'h3';
}

/** Compact card used for suggestions (related venues, venues mentioned in articles). */
export function VenueCard({ venue, headingLevel: Heading = 'h3' }: VenueCardProps) {
  const t = translator(useLang());
  const p = usePaths();
  const guests = venue.maxGuests
    ? t(`${venue.guestsShort} invités`, `${venue.guestsShort} guests`)
    : t('Capacité sur demande', 'Capacity on request');

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-[16/10] overflow-hidden bg-sage-soft">
        <Photo
          id={venue.image}
          alt={venue.imageAlt}
          sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 100vw"
          maxWidth={1200}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      {/* Above the card-wide link so it stays clickable. */}
      <SaveButton slug={venue.slug} name={venue.nom_du_lieu} variant="overlay" className="absolute right-3 top-3 z-10" />

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">
          {venue.commune}, {venue.zone.name}
        </p>
        <Heading className="mt-1 text-[1.6rem] leading-tight text-ink">
          <Link href={p.venue(venue.slug)} className="after:absolute after:inset-0 group-hover:text-pine">
            {venue.nom_du_lieu}
          </Link>
        </Heading>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{venue.summary}</p>
        <p className="mt-auto pt-4 text-sm font-semibold text-ink">
          {guests}, {venue.priceShort.charAt(0).toLowerCase() + venue.priceShort.slice(1)}
        </p>
      </div>
    </article>
  );
}
