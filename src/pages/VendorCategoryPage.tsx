import { VendorCategory } from '../types';
import { vendorCategories } from '../vendors';
import { Link } from '../router';
import { useLang, usePaths, useT } from '../i18n/lang';
import { site } from '../site';
import { parseBlocks, RichText } from '../lib/richtext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Faq } from '../components/Faq';
import { PricingNotice } from '../components/PricingNotice';
import { Photo } from '../components/Photo';
import { VendorListingForm } from '../components/VendorListingForm';
import { EnglishProNote, SelfServeCta } from '../components/SelfServeCta';
import { vendorsIn } from '../vendorListings';
import { VendorCard } from '../components/VendorCard';

export function VendorCategoryPage({ category: c }: { category: VendorCategory }) {
  const listed = vendorsIn(c.slug);
  const others = vendorCategories.filter((x) => x.slug !== c.slug);
  const lang = useLang();
  const t = useT();
  const p = usePaths();
  // "Music and DJs" → "music and DJs": only the first letter is lowered in English.
  const lowerName = lang === 'en' ? c.name.charAt(0).toLowerCase() + c.name.slice(1) : c.name.toLowerCase();
  const aPro = `${/^[aeiou]/i.test(c.pro) ? 'an' : 'a'} ${c.pro}`;

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: t('Prestataires', 'Vendors'), href: p.prestataires }, { label: c.name }]} />
      </div>

      <header className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 md:grid-cols-2 md:gap-14">
        <div>
          <h1 className="text-[2.4rem] leading-[1.05] text-ink sm:text-[3.4rem]">{c.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{c.intro}</p>
          <p className="mt-6 inline-block rounded-full bg-sage-soft px-4 py-2 text-[0.95rem] text-pine-dark">
            {t(
              <>
                À réserver : <strong className="font-semibold">{c.bookAhead}</strong> le mariage
              </>,
              <>
                Book <strong className="font-semibold">{c.bookAhead}</strong>
              </>,
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#conseils" className="btn-primary">
              {t('Nos conseils', 'Our advice')}
            </a>
            <a href="#referencer" className="btn-ghost">
              {t(<>Vous êtes {c.pro} ?</>, <>Are you {aPro}?</>)}
            </a>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sage-soft">
          <Photo id={c.image} alt={c.imageAlt} sizes="(min-width: 768px) 45vw, 100vw" priority />
        </div>
      </header>

      <section aria-labelledby="selection" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 id="selection" className="text-3xl text-ink">
          {listed.length > 0
            ? t(`Les professionnels référencés (${listed.length})`, `Listed professionals (${listed.length})`)
            : t(`${c.name} dans le Var`, `${c.name} in the Var`)}
        </h2>
        <div className="mt-6 space-y-6">
          {listed.length > 0 ? (
            <ul className="space-y-6">
              {listed.map((v) => (
                <li key={v.slug}>
                  <VendorCard vendor={v} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-line px-6 py-8 leading-relaxed text-muted">
              {t(
                <>
                  L’annuaire des {c.name.toLowerCase()} du Var est en cours de constitution. En attendant, nos conseils
                  ci-dessous vous aident à bien choisir. Vous êtes {c.pro} ?{' '}
                  <a href="#referencer" className="link text-ink">
                    Publiez votre fiche
                  </a>
                  .
                </>,
                <>
                  Our directory of {lowerName} in the Var is still being put together. In the meantime, the advice below
                  will help you choose well.
                </>,
              )}
            </p>
          )}
        </div>
      </section>

      <div id="conseils" className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <RichText blocks={parseBlocks(c.body)} />
          <div className="mt-14">
            <Faq items={c.faq} title={t('Questions fréquentes', 'Frequently asked questions')} />
          </div>
        </div>
      </div>

      {lang === 'en' ? (
        <section id="referencer" aria-label="For wedding professionals" className="border-t border-line bg-sage-soft/60">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <EnglishProNote type="prestataire" category={c.slug} />
          </div>
        </section>
      ) : (
        <section id="referencer" aria-labelledby="referencer-titre" className="border-t border-line bg-sage-soft/60">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
            <h2 id="referencer-titre" className="text-3xl text-ink sm:text-4xl">
              Vous êtes {c.pro} dans le Var ?
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Faites-vous référencer sur {site.name} et présentez votre activité aux couples qui préparent leur mariage dans le
              Var.
            </p>
            <div className="mt-6">
              <PricingNotice />
            </div>
            <div className="mt-6">
              <SelfServeCta type="prestataire" category={c.slug} />
            </div>
            <p className="mt-10 leading-relaxed text-muted">Ou envoyez-nous une demande, nous vous recontactons :</p>
            <div className="mt-4">
              <VendorListingForm category={c} />
            </div>
          </div>
        </section>
      )}

      <nav aria-labelledby="autres-metiers" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="autres-metiers" className="mb-6 text-3xl text-ink">
            {t('Les autres prestataires', 'Other vendors')}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((x) => (
              <li key={x.slug}>
                <Link
                  href={p.vendor(x.slug)}
                  className="inline-flex rounded-full border border-line bg-white/60 px-4 py-2 text-ink transition-colors hover:border-pine hover:text-pine"
                >
                  {x.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${p.home}#lieux`} className="inline-flex rounded-full px-4 py-2 font-semibold text-pine hover:underline">
                {t('Trouver son lieu de réception', 'Find your reception venue')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
