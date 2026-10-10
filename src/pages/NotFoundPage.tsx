import { Link } from '../router';
import { paths } from '../routes';

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
      <h1 className="text-5xl text-ink sm:text-6xl">Page introuvable</h1>
      <p className="mt-6 text-lg text-muted">Cette adresse ne correspond à aucune page. Le lieu a peut-être changé d'adresse.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/#lieux" className="btn-primary">
          Voir tous les lieux
        </Link>
        <Link href={paths.journal} className="btn-ghost">
          Lire le Journal
        </Link>
      </div>
    </section>
  );
}
