import { articles, formatDate } from '../articles';
import { readingMinutes } from '../lib/richtext';
import { Link } from '../router';
import { paths } from '../routes';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Photo } from '../components/Photo';

export function JournalPage() {
  const [featured, ...others] = articles;
  const rest = [...others].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Journal' }]} />
      </div>

      <header className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8">
        <h1 className="text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">Le Journal</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Conseils pratiques pour organiser un mariage dans le Var : choisir son lieu, sa saison et ses prestataires.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <article className="group relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sage-soft">
            <Photo
              id={featured.image}
              alt={featured.imageAlt}
              sizes="(min-width: 768px) 55vw, 100vw"
              priority
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div>
            <p className="text-sm text-muted">
              {featured.category}, <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            </p>
            <h2 className="mt-2 text-4xl leading-tight text-ink">
              <Link href={paths.article(featured.slug)} className="after:absolute after:inset-0 group-hover:text-pine">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-6 font-semibold text-pine">Lire l'article ({readingMinutes(featured.body)} min)</p>
          </div>
        </article>

        <ul className="mt-20 grid gap-12 border-t border-line pt-14 md:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug}>
              <article className="group relative">
                <div className="aspect-[3/2] overflow-hidden rounded-xl bg-sage-soft">
                  <Photo
                    id={a.image}
                    alt={a.imageAlt}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    maxWidth={800}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-sm text-muted">
                  {a.category}, <time dateTime={a.date}>{formatDate(a.date)}</time>
                </p>
                <h2 className="mt-1 text-2xl leading-snug text-ink">
                  <Link href={paths.article(a.slug)} className="after:absolute after:inset-0 group-hover:text-pine">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 text-muted">{a.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
