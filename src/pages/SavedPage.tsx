import { useEffect, useState } from 'react';
import { Venue } from '../types';
import { findVenue, venues } from '../data';
import { clearSaved, removeSaved, saveAll, useSaved } from '../lib/saved';
import { Link } from '../router';
import { usePaths, useT } from '../i18n/lang';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Photo } from '../components/Photo';
import { VenueGrid } from '../components/VenueGrid';
import { KeyFigures } from '../components/VenueListItem';

const toVenues = (slugs: string[]) => slugs.map(findVenue).filter((v): v is Venue => v !== undefined);

/** Suggestions shown while the selection is empty. */
const SUGGESTED = ['chateau-sainte-roseline', 'chateau-maravenne', 'domaine-de-la-rotonde'];

/** Side-by-side comparison of the selected venues. */
function Comparison({ list }: { list: Venue[] }) {
  const t = useT();
  const p = usePaths();
  const rows: { label: string; value: (v: Venue) => string }[] = [
    { label: t('Secteur', 'Area'), value: (v) => `${v.commune}, ${v.zone.name}` },
    { label: t('Invités', 'Guests'), value: (v) => v.guestsShort },
    { label: t('Hébergement', 'Accommodation'), value: (v) => v.lodgingShort },
    { label: t('Prix', 'Price'), value: (v) => v.priceShort },
    { label: 'Budget', value: (v) => v.budget ?? t('Sur devis', 'On request') },
    { label: t('Cadre', 'Setting'), value: (v) => v.type_de_cadre },
    { label: t('Le petit plus', 'The extra touch'), value: (v) => v.element_differenciant },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full border-collapse text-left" style={{ minWidth: `${10 + list.length * 15}rem` }}>
        <caption className="sr-only">{t('Comparaison de vos lieux enregistrés', 'Comparison of your saved venues')}</caption>
        <thead>
          <tr className="border-b border-line align-bottom">
            <th scope="col" className="sticky left-0 z-10 w-40 bg-white p-4">
              <span className="sr-only">{t('Critère', 'Criterion')}</span>
            </th>
            {list.map((v) => (
              <th key={v.slug} scope="col" className="min-w-[14rem] p-4 font-normal">
                <div className="h-24 overflow-hidden rounded-xl bg-sage-soft">
                  <Photo id={v.image} alt={v.imageAlt} sizes="240px" maxWidth={480} />
                </div>
                <Link href={p.venue(v.slug)} className="mt-3 block font-display text-xl leading-tight text-ink hover:text-pine">
                  {v.nom_du_lieu}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th scope="row" className="sticky left-0 z-10 bg-white p-4 text-sm font-semibold text-muted">
                {row.label}
              </th>
              {list.map((v) => (
                <td key={v.slug} className="p-4 text-[0.95rem] leading-snug text-ink">
                  {row.value(v)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="align-top">
            <th scope="row" className="sticky left-0 z-10 bg-white p-4 text-sm font-semibold text-muted">
              Contact
            </th>
            {list.map((v) => (
              <td key={v.slug} className="p-4">
                <Link href={p.venue(v.slug)} className="btn-primary !px-4 !py-2 text-sm">
                  {t('Obtenir les coordonnées', 'Get contact details')}
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** One saved venue: photo, key figures and actions. */
function SavedCard({ venue, onRemove }: { venue: Venue; onRemove?: () => void }) {
  const t = useT();
  const p = usePaths();
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <Link href={p.venue(venue.slug)} tabIndex={-1} aria-hidden className="block aspect-[16/10] overflow-hidden bg-sage-soft">
        <Photo id={venue.image} alt={venue.imageAlt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw" maxWidth={800} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">
          {venue.commune}, {venue.zone.name}
        </p>
        <h3 className="mt-1 text-[1.6rem] leading-tight text-ink">
          <Link href={p.venue(venue.slug)} className="hover:text-pine">
            {venue.nom_du_lieu}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{venue.summary}</p>
        <KeyFigures venue={venue} className="mt-4" />
        <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-auto md:pt-5">
          <Link href={p.venue(venue.slug)} className="btn-primary !px-4 !py-2 text-sm">
            {t('Obtenir les coordonnées', 'Get contact details')}
          </Link>
          {onRemove && (
            <button type="button" onClick={onRemove} className="text-sm text-muted underline-offset-2 hover:text-ink hover:underline">
              {t('Retirer', 'Remove')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function SavedPage() {
  const t = useT();
  const p = usePaths();
  const saved = useSaved();
  const [hydrated, setHydrated] = useState(false);
  const [shared, setShared] = useState<string[] | null>(null);
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    setHydrated(true);
    const param = new URLSearchParams(window.location.search).get('lieux');
    if (param) {
      const list = param.split(',').filter((slug) => findVenue(slug));
      if (list.length) setShared(list);
    }
  }, []);

  const mine = toVenues(saved);

  const share = async () => {
    const url = `${window.location.origin}${p.saved}?lieux=${mine.map((v) => v.slug).join(',')}`;
    const text = t(
      `Ma sélection de lieux de mariage dans le Var (${mine.length})`,
      `My shortlist of wedding venues in the Var (${mine.length})`,
    );
    try {
      if (navigator.share) {
        await navigator.share({ title: text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareStatus(
        t(
          'Lien copié : envoyez-le à votre partenaire ou ouvrez-le sur un autre appareil.',
          'Link copied: send it to your partner or open it on another device.',
        ),
      );
    } catch {
      setShareStatus(t(`Copiez ce lien : ${url}`, `Copy this link: ${url}`));
    }
  };

  const keepShared = () => {
    if (shared) saveAll(shared);
    setShared(null);
    window.history.replaceState(window.history.state, '', p.saved);
  };

  const dismissShared = () => {
    setShared(null);
    window.history.replaceState(window.history.state, '', p.saved);
  };

  let content;
  if (!hydrated) {
    content = <p className="text-muted">{t('Chargement de votre sélection…', 'Loading your shortlist…')}</p>;
  } else if (shared) {
    const list = toVenues(shared);
    content = (
      <>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-pine/30 bg-sage-soft px-5 py-4">
          <p className="text-[0.95rem] text-ink">
            {t(
              <>
                <strong className="font-semibold">Sélection partagée avec vous</strong> : {list.length} lieu{list.length > 1 ? 'x' : ''}.
              </>,
              <>
                <strong className="font-semibold">A shortlist shared with you</strong>: {list.length} venue{list.length > 1 ? 's' : ''}.
              </>,
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={keepShared} className="btn-primary !py-2.5 text-sm">
              {t('Ajouter à mes lieux', 'Add to my saved venues')}
            </button>
            <button type="button" onClick={dismissShared} className="btn-ghost !py-2.5 text-sm">
              {t('Voir ma sélection', 'See my shortlist')}
            </button>
          </div>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <li key={v.slug}>
              <SavedCard venue={v} />
            </li>
          ))}
        </ul>
        {list.length > 1 && (
          <section aria-labelledby="comparer" className="mt-16">
            <h2 id="comparer" className="mb-6 text-3xl text-ink">
              {t('Comparer ces lieux', 'Compare these venues')}
            </h2>
            <Comparison list={list} />
          </section>
        )}
      </>
    );
  } else if (mine.length === 0) {
    content = (
      <>
        <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center">
          <h2 className="text-3xl text-ink">{t('Votre sélection est vide', 'Your shortlist is empty')}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
            {t(
              <>
                Cliquez sur « Enregistrer » sur un lieu qui vous plaît : vous le retrouverez ici, prêt à être comparé avec les
                autres et partagé avec votre partenaire.
              </>,
              <>
                Click “Save” on any venue you like: you will find it here, ready to compare with the others and share
                with your partner.
              </>,
            )}
          </p>
          <Link href={`${p.home}#lieux`} className="btn-primary mt-6">
            {t(<>Parcourir les {venues.length} lieux</>, <>Browse all {venues.length} venues</>)}
          </Link>
        </div>
        <section aria-labelledby="suggestions" className="mt-16">
          <h2 id="suggestions" className="mb-8 text-3xl text-ink">
            {t('Pour commencer, trois lieux à découvrir', 'To start, three venues to discover')}
          </h2>
          <VenueGrid venues={toVenues(SUGGESTED)} />
        </section>
      </>
    );
  } else {
    content = (
      <>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mine.map((v) => (
            <li key={v.slug}>
              <SavedCard venue={v} onRemove={() => removeSaved(v.slug)} />
            </li>
          ))}
        </ul>

        {mine.length > 1 ? (
          <section aria-labelledby="comparer" className="mt-16">
            <h2 id="comparer" className="text-3xl text-ink">
              {t('Comparer mes lieux', 'Compare my venues')}
            </h2>
            <p className="mb-6 mt-2 text-muted">
              {t('Les informations clés côte à côte, pour faire votre choix.', 'The key details side by side, to help you choose.')}
            </p>
            <Comparison list={mine} />
          </section>
        ) : (
          <p className="mt-10 text-muted">
            {t(
              'Enregistrez au moins un autre lieu pour les comparer côte à côte.',
              'Save at least one more venue to compare them side by side.',
            )}{' '}
            <Link href={`${p.home}#lieux`} className="link text-ink">
              {t('Voir tous les lieux', 'See all venues')}
            </Link>
          </p>
        )}

        <p className="mt-10 text-sm text-muted">
          {t(
            <>
              Votre sélection est conservée dans ce navigateur. Pour la retrouver sur un autre appareil, utilisez « Partager ma
              sélection ».
            </>,
            <>Your shortlist is kept in this browser. To find it on another device, use “Share my shortlist”.</>,
          )}
        </p>
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: t('Mes lieux', 'Saved venues') }]} />
      </div>

      <header className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 pb-10 pt-10 sm:px-8">
        <div>
          <h1 className="text-[2.5rem] leading-[1.05] text-ink sm:text-6xl">{t('Mes lieux enregistrés', 'Saved venues')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {hydrated && mine.length > 0
              ? t(
                  `${mine.length} lieu${mine.length > 1 ? 'x' : ''} dans votre sélection. Comparez-les, partagez la liste et contactez-les quand vous êtes prêts.`,
                  `${mine.length} venue${mine.length > 1 ? 's' : ''} on your shortlist. Compare them, share the list and get in touch when you are ready.`,
                )
              : t(
                  'Retrouvez ici les lieux que vous avez enregistrés, pour les comparer et les partager.',
                  'The venues you have saved, gathered here to compare and share.',
                )}
          </p>
        </div>
        {hydrated && !shared && mine.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => void share()} className="btn-primary">
              {t('Partager ma sélection', 'Share my shortlist')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(t('Retirer tous les lieux de votre sélection ?', 'Remove every venue from your shortlist?'))) clearSaved();
              }}
              className="btn-ghost"
            >
              {t('Tout effacer', 'Clear all')}
            </button>
          </div>
        )}
      </header>
      {shareStatus && (
        <p role="status" className="mx-auto -mt-4 mb-6 max-w-7xl break-all px-5 text-sm text-pine sm:px-8">
          {shareStatus}
        </p>
      )}

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">{content}</div>
    </>
  );
}
