import { useId, useMemo } from 'react';
import { normalize, venues, venuesInZone, zones } from '../data';
import { OUTSIDE_VAR } from '../departments';
import { articles, formatDate } from '../articles';
import { Venue } from '../types';
import { Link } from '../router';
import { paths } from '../routes';
import { photos } from '../images';
import { Photo } from '../components/Photo';
import { VenueList } from '../components/VenueListItem';
import { Faq } from '../components/Faq';
import { homeFaq } from '../faq';

/** Numeric filters are kept as the raw input text so fields can be left empty. */
export interface Filters {
  query: string;
  zone: string;
  guestsMin: string;
  guestsMax: string;
  budgetMin: string;
  budgetMax: string;
  sleepsMin: string;
  sleepsMax: string;
}

export const emptyFilters: Filters = {
  query: '',
  zone: '',
  guestsMin: '',
  guestsMax: '',
  budgetMin: '',
  budgetMax: '',
  sleepsMin: '',
  sleepsMax: '',
};

type RangeKey = 'guests' | 'budget' | 'sleeps';

/** Parse "12 500", "12500 €" or "" into a number (or null when empty/invalid). */
function toNumber(value: string): number | null {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
}

function matches(v: Venue, f: Filters): boolean {
  const guestsMin = toNumber(f.guestsMin);
  const guestsMax = toNumber(f.guestsMax);
  const budgetMin = toNumber(f.budgetMin);
  const budgetMax = toNumber(f.budgetMax);
  const sleepsMin = toNumber(f.sleepsMin);
  const sleepsMax = toNumber(f.sleepsMax);

  // Guests: the venue's capacity range must overlap the couple's range.
  if (guestsMin !== null || guestsMax !== null) {
    if (v.maxGuests === null) return false;
    if (guestsMin !== null && v.maxGuests < guestsMin) return false;
    if (guestsMax !== null && (v.minGuests ?? 0) > guestsMax) return false;
  }
  // Budget: the lowest published price must sit inside the range.
  if (budgetMin !== null || budgetMax !== null) {
    if (v.priceFrom === null) return false;
    if (budgetMin !== null && v.priceFrom < budgetMin) return false;
    if (budgetMax !== null && v.priceFrom > budgetMax) return false;
  }
  // Accommodation: people who can sleep on site.
  if (sleepsMin !== null && v.sleeps < sleepsMin) return false;
  if (sleepsMax !== null && v.sleeps > sleepsMax) return false;
  return true;
}

const known = <T,>(list: (T | null)[]) => list.filter((x): x is T => x !== null);

/** Figures under the hero, computed at render time since professionals can add venues. */
function heroStats() {
  const largestGroup = Math.max(...known(venues.map((v) => v.maxGuests)));
  const lowestPrice = Math.min(...known(venues.map((v) => v.priceFrom)));
  return [
    { label: "Lieux référencés", value: String(venues.length) },
    { label: "Secteurs du Var", value: String(zones.length) },
    { label: "Invités max", value: largestGroup.toLocaleString("fr-FR") },
    { label: "Location dès", value: `${lowestPrice.toLocaleString("fr-FR")} €` },
  ];
}

interface HomePageProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function HomePage({ filters, onFiltersChange }: HomePageProps) {
  const ids = useId();
  const set = (patch: Partial<Filters>) => onFiltersChange({ ...filters, ...patch });

  const results = useMemo(() => {
    const q = normalize(filters.query.trim());
    return venues.filter((v) => {
      const haystack = normalize(
        `${v.nom_du_lieu} ${v.commune} ${v.zone.name} ${v.type_de_cadre} ${v.summary} ${v.tags.join(' ')} ${v.description}`,
      );
      return (!q || haystack.includes(q)) && (!filters.zone || (filters.zone === OUTSIDE_VAR ? !!v.zone.department : v.zone.slug === filters.zone)) && matches(v, filters);
    });
  }, [filters, venues]);

  const hasFilters = Object.values(filters).some(Boolean);
  const outsideCount = venues.filter((v) => v.zone.department).length;

  const labelClass = 'mb-1.5 block text-sm font-semibold text-ink';
  const fieldClass =
    'w-full rounded-xl border-line bg-white py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';

  const ranges: { key: RangeKey; label: string; unit: string; hint: string; step: number }[] = [
    { key: 'guests', label: "Nombre d'invités", unit: 'invités', hint: 'Lieux pouvant accueillir ce nombre.', step: 10 },
    { key: 'budget', label: 'Budget', unit: '€', hint: 'Prix de départ publié par le lieu.', step: 500 },
    { key: 'sleeps', label: 'Hébergement sur place', unit: 'pers.', hint: 'Personnes pouvant dormir sur place.', step: 5 },
  ];

  const rangeError = (key: RangeKey) => {
    const min = toNumber(filters[`${key}Min`]);
    const max = toNumber(filters[`${key}Max`]);
    return min !== null && max !== null && min > max;
  };

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:pb-24 md:pt-12">
        <div className="order-2 md:order-1">
          <p className="rise text-sm font-semibold text-pine">Guide indépendant des lieux de réception, édition 2026</p>
          <h1 className="rise mt-3 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.6rem]">
            Les lieux de mariage du Var
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted [animation-delay:120ms]">
            Châteaux viticoles, bastides et villas face à la mer : {venues.length} lieux de réception référencés et
            comparés, de la Dracénie au littoral. Capacités, tarifs et hébergement réunis sur une seule page.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3 [animation-delay:220ms]">
            <a href="#lieux" className="btn-primary">
              Voir les {venues.length} lieux
            </a>
            <Link href={paths.article(articles[0].slug)} className="btn-ghost">
              Lire le guide pour s'organiser
            </Link>
          </div>

          <dl className="rise mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4 [animation-delay:300ms]">
            {heroStats().map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-0.5 font-display text-2xl leading-tight text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Lieux par secteur" className="rise mt-8 [animation-delay:380ms]">
            <h2 className="mb-3 font-sans text-sm font-semibold text-ink">Par secteur</h2>
            <ul className="flex flex-wrap gap-2">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={paths.zone(z.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-pine hover:text-pine"
                  >
                    {z.name}
                    <span className="text-muted">{venuesInZone(z.slug).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <figure className="order-1 md:order-2">
          <div className="relative h-[46vh] min-h-72 w-full overflow-hidden rounded-2xl bg-sage-soft md:h-auto md:max-h-[78vh] md:aspect-[735/905]">
            <img
              src="/images/sortie-ceremonie-mariage.jpg"
              alt="Mariés sortant de la cérémonie sous une pluie de riz lancée par leurs invités"
              width={735}
              height={905}
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover object-[50%_70%]"
            />
            {/* A general tip, not a caption: the photo was not taken at one of the listed venues. */}
            <p className="absolute hidden rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur sm:left-4 sm:top-4 sm:block sm:max-w-xs">
              <span className="block text-xs font-semibold text-pine">Le saviez-vous ?</span>
              <span className="mt-1 block text-sm leading-snug text-muted">
                Le lancer de riz à la sortie de la cérémonie est un vœu de prospérité et de fécondité pour les mariés.
              </span>
            </p>
          </div>
          <figcaption className="mt-2 text-xs text-muted">
            La sortie de cérémonie, l'un des moments les plus attendus de la journée.
          </figcaption>
        </figure>
      </section>

      {/* Directory */}
      <section id="lieux" aria-labelledby="lieux-titre" className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <h2 id="lieux-titre" className="text-4xl text-ink sm:text-5xl">
            Trouver le lieu
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Indiquez vos propres chiffres : nombre d'invités, budget et personnes à loger sur place. Laissez vide ce qui
            vous importe peu.
          </p>

          <form
            role="search"
            aria-label="Filtrer les lieux"
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
              <div>
                <label htmlFor={`${ids}-q`} className={labelClass}>
                  Rechercher
                </label>
                <input
                  id={`${ids}-q`}
                  type="search"
                  value={filters.query}
                  onChange={(e) => set({ query: e.target.value })}
                  placeholder="Nom, commune, vue mer, oliveraie…"
                  className={`${fieldClass} px-4`}
                />
              </div>
              <div>
                <label htmlFor={`${ids}-zone`} className={labelClass}>
                  Secteur
                </label>
                <select
                  id={`${ids}-zone`}
                  value={filters.zone}
                  onChange={(e) => set({ zone: e.target.value })}
                  className={`${fieldClass} pl-4`}
                >
                  <option value="">{outsideCount ? 'Tous les secteurs' : 'Tout le Var'}</option>
                  {zones.map((z) => (
                    <option key={z.slug} value={z.slug}>
                      {z.name} ({venuesInZone(z.slug).length})
                    </option>
                  ))}
                  {outsideCount > 0 && <option value={OUTSIDE_VAR}>Hors du Var ({outsideCount})</option>}
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-5 border-t border-line pt-5 md:grid-cols-3">
              {ranges.map((r) => {
                const error = rangeError(r.key);
                return (
                  <fieldset key={r.key}>
                    <legend className={labelClass}>{r.label}</legend>
                    <div className="flex items-center gap-2">
                      {(['Min', 'Max'] as const).map((bound, i) => {
                        const name = `${r.key}${bound}` as keyof Filters;
                        return (
                          <div key={bound} className="contents">
                            {i === 1 && <span aria-hidden className="text-muted">à</span>}
                            <label className="relative block flex-1">
                              <span className="sr-only">
                                {r.label} {bound === 'Min' ? 'minimum' : 'maximum'}
                              </span>
                              <input
                                type="number"
                                inputMode="numeric"
                                min={0}
                                step={r.step}
                                value={filters[name]}
                                onChange={(e) => set({ [name]: e.target.value })}
                                placeholder={bound === 'Min' ? 'Min' : 'Max'}
                                aria-invalid={error || undefined}
                                className={`${fieldClass} pl-3 pr-12 ${error ? 'border-red-700' : ''}`}
                              />
                              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                                {r.unit}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <p className={`mt-1.5 text-xs ${error ? 'text-red-700' : 'text-muted'}`}>
                      {error ? 'Le minimum dépasse le maximum.' : r.hint}
                    </p>
                  </fieldset>
                );
              })}
            </div>

            {hasFilters && (
              <div className="mt-5 border-t border-line pt-4 text-right">
                <button type="button" onClick={() => onFiltersChange(emptyFilters)} className="link text-[0.95rem]">
                  Effacer les filtres
                </button>
              </div>
            )}
          </form>

          <p className="mb-6 mt-10 text-[0.95rem] text-muted" aria-live="polite">
            <strong className="font-semibold text-ink">
              {results.length} lieu{results.length > 1 ? 'x' : ''}
            </strong>{' '}
            {hasFilters ? 'correspondent à votre recherche' : 'dans le Var'}
          </p>

          {results.length > 0 ? (
            <VenueList venues={results} />
          ) : (
            <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <p className="font-display text-2xl text-ink">Aucun lieu ne correspond à ces critères.</p>
              <p className="mt-2 text-muted">
                Élargissez votre budget ou votre nombre d'invités. Les lieux sans tarif publié n'apparaissent pas quand un
                budget est indiqué.
              </p>
              <button type="button" onClick={() => onFiltersChange(emptyFilters)} className="btn-ghost mt-6">
                Effacer les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Editorial */}
      <section aria-labelledby="var-titre" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="arch mt-12 aspect-[3/4] bg-sage-soft">
              <Photo id={photos.confettiCouple} alt="Mariés sous une pluie de confettis" sizes="(min-width: 768px) 22vw, 45vw" maxWidth={800} />
            </div>
            <div className="arch aspect-[3/4] bg-sage-soft">
              <Photo id={photos.longTable} alt="Table de réception dressée en plein air" sizes="(min-width: 768px) 22vw, 45vw" maxWidth={800} />
            </div>
          </div>
          <div>
            <h2 id="var-titre" className="text-4xl leading-tight text-ink sm:text-5xl">
              Se marier dans le Var
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Le Var réunit sur un même territoire des vignobles réputés, des villages perchés, des forêts et plus de
                400 kilomètres de côtes. Chaque secteur a son caractère : la Dracénie pour ses châteaux viticoles, le
                Haut-Var pour ses lieux nature, le littoral pour la vue sur la mer.
              </p>
              <p>
                Pour chaque lieu, nous indiquons la capacité, l'hébergement sur place, une fourchette de prix publique
                et ce qui le rend unique, avec un lien vers son site officiel.
              </p>
            </div>
            <Link href={paths.article(articles[0].slug)} className="link mt-8 inline-block font-semibold text-ink">
              Organiser son mariage dans le Var, étape par étape
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <Faq items={homeFaq()} title="Se marier dans le Var : vos questions" />
        </div>
      </div>

      {/* Journal teaser */}
      <section aria-labelledby="journal-titre" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 id="journal-titre" className="text-4xl text-ink">
              Le Journal
            </h2>
            <Link href={paths.journal} className="link font-semibold">
              Tous les articles
            </Link>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {articles.slice(1, 4).map((a) => (
              <li key={a.slug}>
                <article className="group relative">
                  <div className="aspect-[3/2] overflow-hidden rounded-xl bg-sage-soft">
                    <Photo
                      id={a.image}
                      alt={a.imageAlt}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      maxWidth={800}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                  </p>
                  <h3 className="mt-1 text-2xl leading-snug">
                    <Link href={paths.article(a.slug)} className="after:absolute after:inset-0 group-hover:text-pine">
                      {a.title}
                    </Link>
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
