import { useEffect, useRef, useState } from 'react';
import { Venue } from '../types';
import { regionOf, venues, venueTarget, zoneHref } from '../data';
import { translator, useLang, usePaths } from '../i18n/lang';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Photo } from '../components/Photo';
import { arrowClass, Chevron } from '../components/VenueGallery';
import { VenueGrid } from '../components/VenueGrid';
import { KeyFigures, Tags } from '../components/VenueListItem';
import { ContactAccess } from '../components/ContactAccess';
import { isSiteChateauClient, SiteChateauCredit } from '../components/SiteChateauOffer';
import { SaveButton } from '../components/SaveButton';
import { Link } from '../router';
import { track } from '../lib/track';
import { checkListing, useCatalogState } from '../catalog';
import { Faq } from '../components/Faq';
import { venueFaq } from '../faq';

function relatedVenues(venue: Venue): Venue[] {
  const sameZone = venues.filter((v) => v.zone.slug === venue.zone.slug && v.slug !== venue.slug);
  const others = venues.filter((v) => v.zone.slug !== venue.zone.slug);
  return [...sameZone, ...others].slice(0, 3);
}

export function VenuePage({ venue }: { venue: Venue }) {
  const [selected, setSelected] = useState(0);
  // The gallery can change when the listing is updated while the page is open.
  const photo = Math.min(selected, venue.gallery.length - 1);
  const count = venue.gallery.length;
  const thumbs = useRef<HTMLUListElement>(null);
  /** Show a photo and bring its thumbnail into view in the strip. */
  const setPhoto = (i: number) => {
    setSelected(i);
    const list = thumbs.current;
    const item = list?.children[i] as HTMLElement | undefined;
    if (list && item) list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2, behavior: 'smooth' });
  };
  const related = relatedVenues(venue);
  const relatedInZone = related.every((v) => v.zone.slug === venue.zone.slug);

  const { refreshed } = useCatalogState();
  const lang = useLang();
  const t = translator(lang);
  const p = usePaths();

  useEffect(() => {
    // Wait for the listings published since the build: a claimed venue's views count for its owner.
    if (!refreshed) return;
    void track('view', venue.slug, venue.ownerUid);
    // Listing managed from a professional account: make sure it is complete and still published.
    if (venue.ownerUid) void checkListing(venue.slug);
  }, [venue.slug, venue.ownerUid, refreshed]);

  // The details a venue has not published are left out.
  const details = [
    { label: t('Cadre', 'Setting'), value: venue.type_de_cadre },
    { label: t('Capacité', 'Capacity'), value: venue.capacite_accueil },
    { label: t('Espaces', 'Spaces'), value: venue.espaces },
    { label: t('Cérémonie laïque', 'Symbolic ceremony'), value: venue.ceremonie_laique },
    { label: t('Hébergement', 'Accommodation'), value: venue.hebergement_sur_place },
    { label: t('Traiteur', 'Catering'), value: venue.traiteur },
    { label: t('Location', 'Hire terms'), value: venue.duree_location },
    { label: t('Fin de soirée', 'End of the party'), value: venue.fin_de_soiree },
    { label: t('Tarifs indicatifs', 'Indicative prices'), value: venue.fourchette_de_prix },
    // Prices per guest have no hire budget band.
    { label: 'Budget', value: venue.budget ? `${venue.budget} ${t('(location)', '(venue hire)')}` : undefined },
    { label: t('Accès', 'Getting there'), value: venue.acces },
    { label: t('Stationnement', 'Parking'), value: venue.stationnement },
  ].filter((d): d is { label: string; value: string } => !!d.value);

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: venue.zone.name, href: zoneHref(venue.zone, lang) ?? `${p.home}#lieux` }, { label: venue.nom_du_lieu }]} />
      </div>

      <article>
        <header className="mx-auto grid max-w-6xl items-start gap-8 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-2 md:gap-12">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage-soft">
              <Photo
                key={venue.gallery[photo]}
                id={venue.gallery[photo]}
                alt={
                  photo === 0
                    ? venue.imageAlt
                    : `${venue.nom_du_lieu}, photo ${photo + 1}${venue.illustrative ? t(' (illustration)', ' (illustrative)') : ''}`
                }
                sizes="(min-width: 768px) 45vw, 100vw"
                priority
              />
              {count > 1 && (
                <>
                  <button type="button" onClick={() => setPhoto((photo - 1 + count) % count)} className={`${arrowClass} left-3`} aria-label={t('Photo précédente', 'Previous photo')}>
                    <Chevron direction="left" />
                  </button>
                  <button type="button" onClick={() => setPhoto((photo + 1) % count)} className={`${arrowClass} right-3`} aria-label={t('Photo suivante', 'Next photo')}>
                    <Chevron direction="right" />
                  </button>
                  <span aria-live="polite" className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
                    {photo + 1} / {count}
                  </span>
                </>
              )}
            </div>
            {/* Five thumbnails in view, the others scroll sideways (the padding keeps the selection ring visible). */}
            <ul
              ref={thumbs}
              className="relative -mx-1 mt-2 flex snap-x scroll-px-1 gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label={t('Choisir une photo', 'Choose a photo')}
            >
              {venue.gallery.map((id, i) => (
                <li key={id} className="w-[calc((100%-2rem)/5)] shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={t(`Afficher la photo ${i + 1}`, `Show photo ${i + 1}`)}
                    aria-pressed={i === photo}
                    className={`block aspect-square w-full overflow-hidden rounded-lg transition ${
                      i === photo ? 'ring-2 ring-pine ring-offset-2 ring-offset-paper' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Photo id={id} alt="" sizes="96px" maxWidth={480} />
                  </button>
                </li>
              ))}
            </ul>
            <figcaption className="mt-2 text-xs text-muted">
              {venue.illustrative
                ? t("Photo d'illustration, ne représente pas le lieu.", 'Illustrative photo, not of the venue itself.')
                : venue.photoCredit
                  ? t(`Photos : ${venue.photoCredit}`, `Photos: ${venue.photoCredit}`)
                  : t('Photos fournies par le lieu.', 'Photos supplied by the venue.')}
            </figcaption>
          </figure>

          <div>
            <p className="text-muted">
              {venue.commune}, {venue.zone.department ? `${venue.zone.name} (${venue.zone.department})` : `${venue.zone.name} ${t('(Var)', '(Var, Provence)')}`}
              {venue.ownerUid && (
                <span className="ml-2 rounded-full bg-sage-soft px-2.5 py-0.5 text-sm text-pine-dark">
                  {t('Fiche gérée par le lieu', 'Listing managed by the venue')}
                </span>
              )}
            </p>
            <h1 className="mt-1 text-[2.5rem] leading-[1.05] text-ink sm:text-[3.4rem]">{venue.nom_du_lieu}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">{venue.summary}</p>
            <div className="mt-5">
              <Tags tags={venue.tags} />
            </div>
            <KeyFigures venue={venue} className="mt-6" />

            <div className="mt-7 rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold text-ink">{t('Contacter le lieu', 'Contact the venue')}</p>
              <p className="mt-1 text-[0.95rem] text-muted">
                {t(
                  'Téléphone et site officiel disponibles en quelques secondes, gratuitement.',
                  'Phone number and official website in a few seconds, free of charge.',
                )}
              </p>
              <ContactAccess target={venueTarget(venue)} className="btn-primary mt-4 w-full sm:w-auto" />
              {isSiteChateauClient(venue.site_web_officiel) && <SiteChateauCredit lang={lang} />}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <SaveButton slug={venue.slug} name={venue.nom_du_lieu} />
              <p className="text-sm text-muted">
                {t('Comparez vos lieux favoris dans', 'Compare your favourite venues in')}{' '}
                <Link href={p.saved} className="link text-ink">
                  {t('Mes lieux', 'Saved venues')}
                </Link>
                .
              </p>
            </div>
          </div>
        </header>

        <div className="border-t border-line bg-white/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr]">
            <section aria-labelledby="presentation">
              <h2 id="presentation" className="text-3xl text-ink">
                {t('Le lieu', 'The venue')}
              </h2>
              <p className="mt-4 text-[1.075rem] leading-[1.75] text-ink/85">{venue.description}</p>

              <h3 className="mt-10 font-sans text-base font-semibold text-ink">{t('Ce qui le distingue', 'What sets it apart')}</h3>
              <p className="mt-2 border-l-2 border-pine pl-4 text-[1.075rem] leading-relaxed text-ink">
                {venue.element_differenciant}
              </p>
            </section>

            <section aria-labelledby="infos">
              <h2 id="infos" className="text-3xl text-ink">
                {t('Infos pratiques', 'Practical details')}
              </h2>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {details.map((d) => (
                  <div key={d.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3">
                    <dt className="text-sm font-semibold text-muted">{d.label}</dt>
                    <dd className="text-[0.975rem] text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-muted">
                {venue.ownerUid
                  ? t(
                      'Informations fournies par le lieu, qui gère cette fiche. À confirmer avec lui selon votre date.',
                      'Information supplied by the venue, which manages this listing. Check it with them for your date.',
                    )
                  : t(
                      'Informations relevées sur des sources publiques (site officiel du lieu, annuaires spécialisés). À confirmer auprès du lieu.',
                      "Information gathered from public sources (the venue's official website, specialist directories). Please confirm it with the venue.",
                    )}
              </p>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
          <Faq
            items={venueFaq(venue, lang)}
            title={t(`Questions fréquentes sur ${venue.nom_du_lieu}`, `Frequently asked questions about ${venue.nom_du_lieu}`)}
          />
        </div>
      </article>

      <section aria-labelledby="autres" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 id="autres" className="mb-10 text-4xl text-ink">
          {relatedInZone
            ? t(`Autres lieux ${venue.zone.where}`, `Other venues ${venue.zone.where}`)
            : regionOf(venue) === 'Var'
              ? t('Autres lieux dans le Var', 'Other venues in the Var')
              : t('Autres lieux de réception', 'Other wedding venues')}
        </h2>
        <VenueGrid venues={related} />
      </section>
    </>
  );
}
