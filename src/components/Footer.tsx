import { Link } from '../router';
import { paths } from '../routes';
import { venuesInZone, zones } from '../data';
import { articles } from '../articles';
import { site } from '../site';
import { vendorCategories } from '../vendors';

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/75 print:hidden">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
          <div className="max-w-xs">
            <p className="font-display text-2xl uppercase tracking-[0.28em] text-white">{site.name}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              Un annuaire indépendant des lieux de réception pour se marier dans le Var : châteaux, bastides,
              domaines viticoles et villas face à la mer.
            </p>
          </div>

          <nav aria-label="Lieux par secteur">
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Lieux par secteur</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={paths.zone(z.slug)} className="transition-colors hover:text-white">
                    {z.name} <span className="text-white/40">({venuesInZone(z.slug).length})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Prestataires">
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Prestataires</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {vendorCategories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={paths.vendor(c.slug)} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={paths.prestataires} className="font-semibold text-white transition-colors hover:text-white/80">
                  Tous les prestataires
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Journal">
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Journal</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link href={paths.article(a.slug)} className="transition-colors hover:text-white">
                    {a.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={paths.journal} className="font-semibold text-white transition-colors hover:text-white/80">
                  Tous les articles
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Le guide">
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Le guide</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li><Link href="/" className="transition-colors hover:text-white">Tous les lieux</Link></li>
              <li><Link href={paths.referencer} className="font-semibold text-white transition-colors hover:text-white/80">Référencer mon lieu</Link></li>
              <li><Link href={`${paths.prestataires}#referencer`} className="transition-colors hover:text-white">Référencer mon activité</Link></li>
              <li><Link href={paths.login} className="transition-colors hover:text-white">Espace professionnel</Link></li>
              <li><Link href={paths.confidentialite} className="transition-colors hover:text-white">Confidentialité</Link></li>
              <li><Link href={paths.terms} className="transition-colors hover:text-white">Conditions professionnels</Link></li>
              {site.contactEmail && (
                <li>
                  <a href={`mailto:${site.contactEmail}?subject=Proposer%20un%20lieu`} className="transition-colors hover:text-white">
                    Proposer un lieu
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tarifs et capacités indicatifs, à confirmer auprès de chaque lieu.</p>
          <p>Photos d'illustration : Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
