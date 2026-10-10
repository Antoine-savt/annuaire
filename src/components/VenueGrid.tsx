import { Venue } from '../types';
import { VenueCard } from './VenueCard';

export function VenueGrid({ venues, headingLevel }: { venues: Venue[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
      {venues.map((venue) => (
        <li key={venue.slug} className="flex">
          <VenueCard venue={venue} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
