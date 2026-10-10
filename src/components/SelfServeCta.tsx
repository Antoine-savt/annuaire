import { Link } from '../router';
import { paths } from '../routes';

/** Sign-up link that brings the professional straight to a new listing once their account exists. */
export function signupHref(type: 'lieu' | 'prestataire', category?: string): string {
  return `${paths.login}?mode=inscription&suite=${encodeURIComponent(paths.newListing(type, category))}`;
}

/** "Publish it yourself" box shown above the listing request forms. */
export function SelfServeCta({ type, category }: { type: 'lieu' | 'prestataire'; category?: string }) {
  const next = paths.newListing(type, category);
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
