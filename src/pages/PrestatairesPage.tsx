import { findVendorCategory, vendorCategories } from '../vendors';
import { vendorsIn } from '../vendorListings';

/** Recommended booking order after the venue: the most sought-after vendors first. */
const BOOKING_ORDER = [
  'wedding-planners',
  'photographes',
  'traiteurs',
  'videastes',
  'musique-dj',
  'robes-costumes',
  'officiants',
  'fleuristes',
  'decoration',
  'coiffure-maquillage',
  'papeterie',
  'patissiers',
  'transport',
  'animations',
  'alliances',
];
import { vendorsHubFaq } from '../faq';
import { Link } from '../router';
import { useLang, usePaths, useT } from '../i18n/lang';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Faq } from '../components/Faq';
import { PricingNotice } from '../components/PricingNotice';
import { Photo } from '../components/Photo';
import { VendorListingForm } from '../components/VendorListingForm';
import { EnglishProNote, SelfServeCta } from '../components/SelfServeCta';

/** Hub of all vendor categories, with the booking order and a listing form for vendors. */
export function PrestatairesPage() {
  const bookingOrder = BOOKING_ORDER.map(findVendorCategory).filter((c) => c !== undefined);
  const lang = useLang();
  const t = useT();
  const p = usePaths();

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: t('Prestataires', 'Vendors') }]} />
      </div>

      <header className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8">
        <h1 className="max-w-4xl text-[2.5rem] leading-[1.05] text-ink sm:text-6xl">
          {t('Les prestataires de mariage dans le Var', 'Wedding vendors in the Var')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {t(
            <>
              Photographe, traiteur, DJ, fleuriste, wedding planner : les {vendorCategories.length} métiers à réunir autour de
              votre lieu de réception, ce qu'il faut leur demander et quand les réserver.
            </>,
            <>
              Photographer, caterer, DJ, florist, wedding planner: the {vendorCategories.length} trades to bring together around
              your reception venue, what to ask them and when to book them.
            </>,
          )}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#metiers" className="btn-primary">
            {t('Voir les métiers', 'Browse the trades')}
          </a>
          <a href="#referencer" className="btn-ghost">
            {t('Vous êtes prestataire ?', 'Are you a wedding professional?')}
          </a>
        </div>
      </header>

      <section id="metiers" aria-label={t('Les métiers du mariage', 'Wedding trades')} className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {vendorCategories.map((c) => (
            <li key={c.slug}>
              <article className="group relative">
                <div className="aspect-[3/2] overflow-hidden rounded-xl bg-sage-soft">
                  <Photo
                    id={c.image}
                    alt={c.imageAlt}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                    maxWidth={800}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="mt-4 text-[1.6rem] leading-tight text-ink">
                  <Link href={p.vendor(c.slug)} className="after:absolute after:inset-0 group-hover:text-pine">
                    {c.name}
                  </Link>
                </h2>
                <p className="mt-1 text-muted">{c.menuDesc}</p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {t('À réserver : ', 'Book ')}
                  {c.bookAhead}
                  {vendorsIn(c.slug).length > 0 && (
                    <span className="ml-2 font-normal text-pine">
                      {vendorsIn(c.slug).length}
                      {t(' prestataire', ' vendor')}
                      {vendorsIn(c.slug).length > 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ordre" className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <h2 id="ordre" className="text-3xl text-ink sm:text-4xl">
            {t('Dans quel ordre réserver ses prestataires', 'In what order to book your vendors')}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {t(
              "Les prestataires les plus demandés se réservent en premier, juste après le lieu. Voici l'ordre conseillé pour un mariage en haute saison dans le Var.",
              'The most sought-after vendors are booked first, right after the venue. Here is the order we recommend for a high-season wedding in the Var.',
            )}
          </p>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
              <Link href={`${p.home}#lieux`} className="link font-semibold text-ink">
                {t('1. Le lieu de réception', '1. The reception venue')}
              </Link>
              <span className="text-sm text-muted">{t('12 à 18 mois avant', '12 to 18 months ahead')}</span>
            </li>
            {bookingOrder.map((c, i) => (
              <li key={c.slug} className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <Link href={p.vendor(c.slug)} className="link font-semibold text-ink">
                  {i + 2}. {c.name}
                </Link>
                <span className="text-sm text-muted">{c.bookAhead}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {lang === 'en' ? (
        <section id="referencer" aria-label="For wedding professionals" className="border-t border-line bg-sage-soft/60">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <EnglishProNote type="prestataire" />
          </div>
        </section>
      ) : (
        <section id="referencer" aria-labelledby="referencer-titre" className="border-t border-line bg-sage-soft/60">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
            <h2 id="referencer-titre" className="text-3xl text-ink sm:text-4xl">
              Vous êtes prestataire de mariage dans le Var ?
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Présentez votre activité aux couples qui préparent leur mariage dans le Var : publiez votre fiche depuis votre
              compte professionnel, ou envoyez-nous une demande et nous la préparons avec vous.
            </p>
            <div className="mt-6">
              <PricingNotice />
            </div>
            <div className="mt-6">
              <SelfServeCta type="prestataire" />
            </div>
            <p className="mt-10 leading-relaxed text-muted">Ou envoyez-nous une demande, nous vous recontactons :</p>
            <div className="mt-4">
              <VendorListingForm />
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <Faq items={vendorsHubFaq(lang)} title={t('Questions fréquentes', 'Frequently asked questions')} />
      </div>
    </>
  );
}
