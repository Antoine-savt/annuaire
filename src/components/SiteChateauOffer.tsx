/*
 * Site-Chateau.fr, the partner studio that builds websites for venues. Shown to venue owners only
 * (professional pages, French). The links are plain followed links with a descriptive anchor, so they
 * also help the partner site in search engines; the UTM parameters tell it where visitors come from.
 */

const SITE_CHATEAU = 'https://site-chateau.fr/';

export const siteChateauUrl = (placement: string) =>
  `${SITE_CHATEAU}?utm_source=ledition&utm_medium=referral&utm_campaign=${encodeURIComponent(placement)}`;

/** One line under a "website" field: for owners whose venue has no site yet. */
export function SiteChateauLine({ placement }: { placement: string }) {
  return (
    <span className="mt-1.5 block text-xs font-normal leading-relaxed text-muted">
      Pas encore de site pour votre lieu ?{' '}
      <a href={siteChateauUrl(placement)} target="_blank" rel="noopener" className="font-semibold text-pine underline underline-offset-2 hover:text-ink">
        Création de site internet pour lieux de réception
      </a>{' '}
      avec Site-Chateau.fr, notre studio partenaire.
    </span>
  );
}

/** Block for venue owners: what a website brings, and the partner studio that makes them. */
export function SiteChateauCard({ placement, className = '' }: { placement: string; className?: string }) {
  return (
    <aside aria-labelledby={`site-chateau-${placement}`} className={`rounded-2xl border border-line bg-white p-5 sm:p-6 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine">Studio partenaire</p>
      <h3 id={`site-chateau-${placement}`} className="mt-2 font-sans text-lg font-semibold text-ink">
        Votre lieu n’a pas encore de site internet ?
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
        Les couples consultent presque toujours le site du lieu avant d’appeler. Site-Chateau.fr conçoit des sites pour
        les châteaux, domaines viticoles et lieux de réception : galeries photo, demandes de devis, disponibilités et
        référencement local.
      </p>
      <a
        href={siteChateauUrl(placement)}
        target="_blank"
        rel="noopener"
        className="btn-ghost mt-4 !px-5 !py-2.5 text-sm"
      >
        Création de site pour château et domaine
        <span className="sr-only"> (Site-Chateau.fr, nouvel onglet)</span>
      </a>
    </aside>
  );
}
