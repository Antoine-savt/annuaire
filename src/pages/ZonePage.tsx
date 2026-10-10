import { Zone } from '../types';
import { venuesInZone, zones } from '../data';
import { Link } from '../router';
import { paths } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VenueList } from '../components/VenueListItem';
import { Faq } from '../components/Faq';
import { findArticle } from '../articles';
import { zoneFaq } from '../faq';
import { parseBlocks, RichText } from '../lib/richtext';

export function ZonePage({ zone }: { zone: Zone }) {
  const list = venuesInZone(zone.slug);
  const otherZones = zones.filter((z) => z.slug !== zone.slug);
  const guides = zone.articles.map(findArticle).filter((a) => a !== undefined);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: zone.name }]} />
      </div>

      <header className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 md:pb-16">
        <h1 className="max-w-4xl text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">Lieux de mariage {zone.where}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{zone.intro}</p>
        <p className="mt-6 font-semibold text-ink">
          {list.length} lieu{list.length > 1 ? 'x' : ''} sélectionné{list.length > 1 ? 's' : ''}
        </p>
      </header>

      <section aria-label={`Lieux ${zone.where}`} className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <VenueList venues={list} headingLevel="h2" />
      </section>

      <div className="border-t border-line bg-white/50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="max-w-3xl">
            <RichText blocks={parseBlocks(zone.body)} />
            <div className="mt-14">
              <Faq items={zoneFaq(zone)} />
            </div>
          </div>

          {guides.length > 0 && (
            <aside aria-labelledby="guides" className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="guides" className="text-2xl text-ink">
                Pour préparer votre mariage
              </h2>
              <ul className="mt-4 space-y-3">
                {guides.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={paths.article(a.slug)}
                      className="block rounded-xl border border-line bg-white p-4 transition-colors hover:border-pine"
                    >
                      <span className="text-sm text-muted">{a.category}</span>
                      <span className="mt-1 block font-display text-lg leading-snug text-ink">{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>

      <nav aria-labelledby="autres-secteurs" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 id="autres-secteurs" className="mb-6 text-3xl text-ink">
            Les autres secteurs du Var
          </h2>
          <ul className="flex flex-wrap gap-2">
            {otherZones.map((z) => (
              <li key={z.slug}>
                <Link
                  href={paths.zone(z.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-4 py-2 text-ink transition-colors hover:border-pine hover:text-pine"
                >
                  {z.name}
                  <span className="text-sm text-muted">{venuesInZone(z.slug).length}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#lieux" className="inline-flex rounded-full px-4 py-2 font-semibold text-pine hover:underline">
                Tous les lieux
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
