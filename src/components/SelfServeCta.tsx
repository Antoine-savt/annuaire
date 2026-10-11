import { Link } from '../router';
import { paths } from '../routes';
import { useLang } from '../i18n/lang';

/** Sign-up link that brings the professional straight to a new listing once their account exists. */
export function signupHref(type: 'lieu' | 'prestataire', category?: string): string {
  return `${paths.login}?mode=inscription&suite=${encodeURIComponent(paths.newListing(type, category))}`;
}

/**
 * On English pages, in place of the professional forms and calls-to-action: the listing service
 * (forms, account, terms) exists in French only, so we point to the French page.
 */
export function EnglishProNote({ type, category }: { type: 'lieu' | 'prestataire'; category?: string }) {
  const href = type === 'lieu' ? paths.referencer : `${category ? paths.vendor(category) : paths.prestataires}#referencer`;
  return (
    <p className="leading-relaxed text-muted">
      {type === 'lieu' ? 'Do you run a wedding venue?' : 'Are you a wedding professional?'} Our listing service is in French:{' '}
      <Link href={href} lang="fr" hrefLang="fr" className="link font-semibold text-ink">
        {type === 'lieu' ? 'Référencer mon lieu' : 'Référencer mon activité'}
      </Link>
      .
    </p>
  );
}

/** "Publish it yourself" box shown above the listing request forms (French pages; English pages get a short note). */
export function SelfServeCta({ type, category }: { type: 'lieu' | 'prestataire'; category?: string }) {
  const lang = useLang();
  const next = paths.newListing(type, category);
  if (lang === 'en') return <EnglishProNote type={type} category={category} />;
  return (
    <div className="rounded-2xl border border-pine/30 bg-white p-6">
      <h3 className="font-sans text-lg font-semibold text-ink">Le plus rapide : publiez votre fiche vous-même</h3>
      <p className="mt-2 leading-relaxed text-muted">
        Créez votre compte professionnel et remplissez votre fiche avec vos photos, vos {type === 'lieu' ? 'capacités et vos tarifs' : 'tarifs et vos coordonnées'}.
        Elle est en ligne dès que vous la publiez, vous la modifiez quand vous voulez et vous suivez ses statistiques.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={signupHref(type, category)} className="btn-primary">
          Créer mon compte
        </Link>
        <Link href={`${paths.login}?suite=${encodeURIComponent(next)}`} className="link text-[0.95rem]">
          J’ai déjà un compte
        </Link>
      </div>
    </div>
  );
}
