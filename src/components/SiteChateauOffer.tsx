/*
 * Site-Chateau.fr, the partner studio that builds websites for venues. The offer is shown to venue
 * owners (professional pages, French); a credit appears on the page of a venue whose website it built.
 * The links are plain followed links with varied, descriptive anchors (plus the Journal guide for venue
 * owners), so they also help the partner site in search engines; the UTM parameters tell it where
 * visitors come from, and its canonical tag keeps them out of its indexed addresses.
 */

const SITE_CHATEAU = 'https://site-chateau.fr/';

/** A page of the partner site ("" for the home page, "tarifs", "realisations/…"), tagged with where the link is. */
export const siteChateauUrl = (placement: string, page = '') =>
  `${SITE_CHATEAU}${page}?utm_source=ledition&utm_medium=referral&utm_campaign=${encodeURIComponent(placement)}`;

/**
 * Websites built by Site-Chateau.fr for venues listed on L'Édition (host names, without "www.").
 * Their venue page credits the studio. Add a host here when a client's venue is in the directory.
 */
const CLIENT_HOSTS: string[] = ['lemasdefontbelle.fr', 'chateau-de-la-presidente.fr'];

/** Whether a venue's website was built by Site-Chateau.fr. */
export function isSiteChateauClient(website: string): boolean {
  try {
    return CLIENT_HOSTS.includes(new URL(website).hostname.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

/** Credit under the contact box of a venue whose website the studio built. */
export function SiteChateauCredit({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <p className="mt-3 text-sm text-muted">
      {lang === 'en' ? 'Venue website by ' : 'Site internet du lieu réalisé par '}
      <a href={siteChateauUrl('credit-fiche-lieu')} target="_blank" rel="noopener" className="link text-ink">
        Site-Chateau.fr
      </a>
      {lang === 'en' ? ', web design for châteaux and wedding venues.' : ', création de sites pour châteaux et lieux de réception.'}
    </p>
  );
}

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
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={siteChateauUrl(placement)} target="_blank" rel="noopener" className="btn-ghost !px-5 !py-2.5 text-sm">
          Création de site pour château et domaine
          <span className="sr-only"> (Site-Chateau.fr, nouvel onglet)</span>
        </a>
        <a href={siteChateauUrl(placement, 'realisations/chateau-de-la-presidente')} target="_blank" rel="noopener" className="link text-sm text-ink">
          Une réalisation dans le Var
        </a>
        <a href={siteChateauUrl(placement, 'tarifs')} target="_blank" rel="noopener" className="link text-sm text-ink">
          Les formules
        </a>
      </div>
    </aside>
  );
}
