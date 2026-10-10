import { Venue } from '../types';
import { Link } from '../router';
import { paths } from '../routes';
import { VenueGallery } from './VenueGallery';
import { SaveButton } from './SaveButton';

/** The three figures that let you size up a venue at a glance. */
export function KeyFigures({ venue, className = '' }: { venue: Venue; className?: string }) {
  const figures = [
    { label: 'Invités', value: venue.guestsShort },
    { label: 'Hébergement', value: venue.lodgingShort },
    { label: 'Prix', value: venue.priceShort },
  ];
  return (
    <dl className={`grid grid-cols-3 divide-x divide-line border-y border-line ${className}`}>
      {figures.map((f) => (
        <div key={f.label} className="px-3 py-3 first:pl-0 sm:px-4">
          <dt className="text-xs font-semibold text-muted">{f.label}</dt>
          <dd className="mt-0.5 text-[0.95rem] font-semibold leading-snug text-ink sm:text-base">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-sage-soft px-3 py-1 text-sm text-pine-dark">
          {tag}
        </li>
      ))}
    </ul>
  );
}

interface VenueListItemProps {
  venue: Venue;
  headingLevel?: 'h2' | 'h3';
}

/** Full-width directory entry: photo on the left, a quick portrait of the venue on the right. */
export function VenueListItem({ venue, headingLevel: Heading = 'h3' }: VenueListItemProps) {
  const href = paths.venue(venue.slug);

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <VenueGallery venue={venue} href={href} />

      <div className="flex min-w-0 flex-col p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-muted">
            {venue.commune},{' '}
            <Link href={paths.zone(venue.zone.slug)} className="hover:text-pine hover:underline">
              {venue.zone.name}
            </Link>
          </p>
          <p className="shrink-0 text-sm font-semibold text-ink" title="Budget indicatif de location">
            <span className="sr-only">Budget : </span>
            {venue.budget ?? 'Sur devis'}
          </p>
        </div>

        <Heading className="mt-1 text-[1.9rem] leading-tight text-ink">
          <Link href={href} className="transition-colors hover:text-pine">
            {venue.nom_du_lieu}
          </Link>
        </Heading>

        <p className="mt-2 text-[1.05rem] leading-relaxed text-ink/80">{venue.summary}</p>

        <div className="mt-4">
          <Tags tags={venue.tags} />
        </div>

        <KeyFigures venue={venue} className="mt-5" />

        <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-auto md:pt-5">
          {/* Contact details are requested from the listing page, so every request follows a view of it. */}
          <Link href={href} className="btn-primary">
            Obtenir les coordonnées
          </Link>
          <Link href={href} className="btn-ghost">
            Voir la fiche
          </Link>
          <SaveButton slug={venue.slug} name={venue.nom_du_lieu} />
        </div>
      </div>
    </article>
  );
}

export function VenueList({ venues, headingLevel }: { venues: Venue[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="space-y-6">
      {venues.map((venue) => (
        <li key={venue.slug}>
          <VenueListItem venue={venue} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
