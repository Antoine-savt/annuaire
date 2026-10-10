import { useEffect, useState } from 'react';
import { Venue } from '../types';
import { venues, venueTarget } from '../data';
import { paths } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Photo } from '../components/Photo';
import { VenueGrid } from '../components/VenueGrid';
import { KeyFigures, Tags } from '../components/VenueListItem';
import { ContactAccess } from '../components/ContactAccess';
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
  const setPhoto = setSelected;
  const related = relatedVenues(venue);
  const relatedInZone = related.every((v) => v.zone.slug === venue.zone.slug);

  const { refreshed } = useCatalogState();

  useEffect(() => {
    // Wait for the listings published since the build: a claimed venue's views count for its owner.
    if (!refreshed) return;
    void track('view', venue.slug, venue.ownerUid);
    // Listing managed from a professional account: make sure it is complete and still published.
    if (venue.ownerUid) void checkListing(venue.slug);
  }, [venue.slug, venue.ownerUid, refreshed]);

  const details = [
    { label: 'Cadre', value: venue.type_de_cadre },
    { label: 'Capacité', value: venue.capacite_accueil },
    { label: 'Hébergement', value: venue.hebergement_sur_place },
    { label: 'Tarifs indicatifs', value: venue.fourchette_de_prix },
    { label: 'Budget', value: venue.budget ? `${venue.budget} (location)` : 'Sur devis' },
  ];

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: venue.zone.name, href: paths.zone(venue.zone.slug) }, { label: venue.nom_du_lieu }]} />
      </div>

      <article>
        <header className="mx-auto grid max-w-6xl items-start gap-8 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-2 md:gap-12">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sage-soft">
              <Photo
                key={venue.gallery[photo]}
                id={venue.gallery[photo]}
                alt={photo === 0 ? venue.imageAlt : `${venue.nom_du_lieu}, photo ${photo + 1}${venue.illustrative ? ' (illustration)' : ''}`}
                sizes="(min-width: 768px) 45vw, 100vw"
                priority
              />
            </div>
            <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Choisir une photo">
              {venue.gallery.map((id, i) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={`Afficher la photo ${i + 1}`}
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
              {venue.illustrative ? "Photo d'illustration, ne représente pas le lieu." : 'Photos fournies par le lieu.'}
            </figcaption>
          </figure>

          <div>
            <p className="text-muted">
              {venue.commune}, {venue.zone.name} (Var)
              {venue.ownerUid && <span className="ml-2 rounded-full bg-sage-soft px-2.5 py-0.5 text-sm text-pine-dark">Fiche gérée par le lieu</span>}
            </p>
            <h1 className="mt-1 text-[2.5rem] leading-[1.05] text-ink sm:text-[3.4rem]">{venue.nom_du_lieu}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">{venue.summary}</p>
            <div className="mt-5">
              <Tags tags={venue.tags} />
            </div>
            <KeyFigures venue={venue} className="mt-6" />

            <div className="mt-7 rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold text-ink">Contacter le lieu</p>
              <p className="mt-1 text-[0.95rem] text-muted">
                Téléphone et site officiel disponibles en quelques secondes, gratuitement.
              </p>
              <ContactAccess target={venueTarget(venue)} className="btn-primary mt-4 w-full sm:w-auto" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <SaveButton slug={venue.slug} name={venue.nom_du_lieu} />
              <p className="text-sm text-muted">
                Comparez vos lieux favoris dans{' '}
                <Link href={paths.saved} className="link text-ink">
                  Mes lieux
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
                Le lieu
              </h2>
              <p className="mt-4 text-[1.075rem] leading-[1.75] text-ink/85">{venue.description}</p>

              <h3 className="mt-10 font-sans text-base font-semibold text-ink">Ce qui le distingue</h3>
              <p className="mt-2 border-l-2 border-pine pl-4 text-[1.075rem] leading-relaxed text-ink">
                {venue.element_differenciant}
              </p>
            </section>

            <section aria-labelledby="infos">
              <h2 id="infos" className="text-3xl text-ink">
                Infos pratiques
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
                  ? 'Informations fournies par le lieu, qui gère cette fiche. À confirmer avec lui selon votre date.'
                  : 'Informations relevées sur des sources publiques (site officiel du lieu, annuaires spécialisés). À confirmer auprès du lieu.'}
              </p>
            </section>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
          <Faq items={venueFaq(venue)} title={`Questions fréquentes sur ${venue.nom_du_lieu}`} />
        </div>
      </article>

      <section aria-labelledby="autres" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 id="autres" className="mb-10 text-4xl text-ink">
          {relatedInZone ? `Autres lieux ${venue.zone.where}` : 'Autres lieux dans le Var'}
        </h2>
        <VenueGrid venues={related} />
      </section>
    </>
  );
}
