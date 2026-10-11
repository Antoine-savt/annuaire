import { useEffect, useState } from 'react';
import { Vendor, VendorCategory } from '../types';
import { vendorsIn, vendorTarget } from '../vendorListings';
import { track } from '../lib/track';
import { checkListing, useCatalogState } from '../catalog';
import { Link } from '../router';
import { paths } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactAccess } from '../components/ContactAccess';
import { Photo } from '../components/Photo';
import { Tags } from '../components/VenueListItem';

/** Page of one vendor: photos, presentation and the gated contact form. */
export function VendorPage({ vendor: v, category: c }: { vendor: Vendor; category: VendorCategory }) {
  const target = vendorTarget(v);
  const photos = [v.image, ...(v.photos ?? [])].filter((p, i, all): p is string => !!p && all.indexOf(p) === i);
  const [selected, setPhoto] = useState(0);
  const photo = Math.max(0, Math.min(selected, photos.length - 1));
  const others = vendorsIn(c.slug).filter((x) => x.slug !== v.slug).slice(0, 6);

  const { refreshed } = useCatalogState();

  useEffect(() => {
    if (!refreshed) return;
    void track('view', target.id, target.owner);
    if (target.owner) void checkListing(target.id);
  }, [target.id, target.owner, refreshed]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs
          items={[
            { label: 'Prestataires', href: paths.prestataires },
            { label: c.name, href: paths.vendor(c.slug) },
            { label: v.name },
          ]}
        />
      </div>

      <article>
        <header className="mx-auto grid max-w-6xl items-start gap-8 px-5 pb-14 pt-8 sm:px-8 md:grid-cols-2 md:gap-12">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sage-soft">
              {photos.length > 0 ? (
                <Photo key={photos[photo]} id={photos[photo]} alt={v.imageAlt ?? v.name} sizes="(min-width: 768px) 45vw, 100vw" priority />
              ) : (
                <div aria-hidden className="flex h-full items-center justify-center font-display text-8xl text-pine/50">
                  {v.name.charAt(0)}
                </div>
              )}
            </div>
            {photos.length > 1 && (
              <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Choisir une photo">
                {photos.slice(0, 10).map((id, i) => (
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
            )}
          </figure>

          <div>
            <p className="text-muted">
              <Link href={paths.vendor(c.slug)} className="hover:text-ink hover:underline">
                {c.name}
              </Link>
              , {v.commune} ({v.zone})
            </p>
            <h1 className="mt-1 text-[2.5rem] leading-[1.05] text-ink sm:text-[3.2rem]">{v.name}</h1>
            {v.ownerUid && (
              <p className="mt-3 inline-block rounded-full bg-sage-soft px-3 py-1 text-sm text-pine-dark">Fiche gérée par le prestataire</p>
            )}
            <p className="mt-4 text-lg leading-relaxed text-ink/85">{v.summary}</p>
            {v.tags.length > 0 && (
              <div className="mt-5">
                <Tags tags={v.tags} />
              </div>
            )}
            {v.priceFrom && <p className="mt-5 text-[1.05rem] font-semibold text-ink">Tarifs : {v.priceFrom}</p>}

            <div className="mt-7 rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold text-ink">Contacter {v.name}</p>
              <p className="mt-1 text-[0.95rem] text-muted">Téléphone et site disponibles en quelques secondes, gratuitement.</p>
              <ContactAccess target={target} className="btn-primary mt-4 w-full sm:w-auto" />
            </div>
            {v.portfolio && (
              <a
                href={v.portfolio}
                target="_blank"
                rel="noopener"
                onClick={() => void track('portfolio_click', target.id, target.owner)}
                className="btn-ghost mt-4 w-full sm:w-auto"
              >
                Voir le portfolio
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            )}
          </div>
        </header>

        {v.description && (
          <section aria-labelledby="presentation" className="border-t border-line bg-white/60">
            <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
              <h2 id="presentation" className="text-3xl text-ink">
                Présentation
              </h2>
              <p className="mt-4 whitespace-pre-line text-[1.075rem] leading-[1.8] text-ink/85">{v.description}</p>
            </div>
          </section>
        )}
      </article>

      <nav aria-labelledby="autres" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="autres" className="mb-6 text-3xl text-ink">
            {others.length ? `Autres ${c.name.toLowerCase()} dans le Var` : `Bien choisir : nos conseils`}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((x) => (
              <li key={x.slug}>
                <Link
                  href={paths.vendorPage(x.category, x.slug)}
                  className="inline-flex rounded-full border border-line bg-white/60 px-4 py-2 text-ink transition-colors hover:border-pine hover:text-pine"
                >
                  {x.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={paths.vendor(c.slug)} className="inline-flex rounded-full px-4 py-2 font-semibold text-pine hover:underline">
                Tous les {c.name.toLowerCase()} et nos conseils
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
