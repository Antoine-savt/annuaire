import { Article } from '../types';
import { formatDate, relatedArticles } from '../articles';
import { findVenue } from '../data';
import { Link } from '../router';
import { usePaths, useT } from '../i18n/lang';
import { parseBlocks, readingMinutes, RichText } from '../lib/richtext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Faq } from '../components/Faq';
import { Photo } from '../components/Photo';
import { VenueGrid } from '../components/VenueGrid';

export function ArticlePage({ article }: { article: Article }) {
  const blocks = parseBlocks(article.body);
  const toc = blocks.flatMap((b) => (b.kind === 'h2' ? [{ id: b.id, text: b.text }] : []));
  const mentioned = article.venues.map(findVenue).filter((v) => v !== undefined);
  const others = relatedArticles(article.slug);
  const t = useT();
  const p = usePaths();

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Journal', href: p.journal }, { label: article.title }]} />
      </div>

      <article>
        <header className="mx-auto max-w-3xl px-5 pb-10 pt-10 sm:px-8">
          <p className="text-sm text-muted">
            {article.category}, {t('publié le', 'published')} <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.updated && article.updated !== article.date && (
              <>
                , {t('mis à jour le', 'updated')} <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </>
            )}
            . {readingMinutes(article.body)} {t('min de lecture', 'min read')}
          </p>
          <h1 className="mt-3 text-[2.3rem] leading-[1.1] text-ink sm:text-[3.3rem]">{article.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{article.excerpt}</p>
        </header>

        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-sage-soft">
            <Photo id={article.image} alt={article.imageAlt} sizes="(min-width: 1024px) 960px, 100vw" priority />
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          {toc.length > 2 && (
            <nav aria-labelledby="sommaire" className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="sommaire" className="font-sans text-sm font-semibold text-ink">
                {t('Sommaire', 'Contents')}
              </h2>
              <ol className="mt-3 space-y-2 border-l border-line text-[0.95rem]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-muted transition-colors hover:border-pine hover:text-ink">
                      {item.text}
                    </a>
                  </li>
                ))}
                {article.faq.length > 0 && (
                  <li>
                    <a href="#questions" className="-ml-px block border-l-2 border-transparent pl-4 text-muted transition-colors hover:border-pine hover:text-ink">
                      {t('Questions fréquentes', 'Frequently asked questions')}
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          <div className={`max-w-3xl ${toc.length > 2 ? '' : 'lg:col-span-2 lg:mx-auto'}`}>
            <RichText blocks={blocks} />
            {article.faq.length > 0 && (
              <div className="mt-14" id="questions-bloc">
                <Faq items={article.faq} title={t('Questions fréquentes', 'Frequently asked questions')} />
              </div>
            )}
          </div>
        </div>
      </article>

      {mentioned.length > 0 && (
        <section aria-labelledby="lieux-cites" className="border-t border-line bg-white/50">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <h2 id="lieux-cites" className="mb-10 text-4xl text-ink">
              {t('Les lieux cités', 'Venues mentioned')}
            </h2>
            <VenueGrid venues={mentioned} />
          </div>
        </section>
      )}

      <nav aria-labelledby="a-lire" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 id="a-lire" className="text-3xl text-ink">
              {t('À lire aussi', 'Further reading')}
            </h2>
            <Link href={p.journal} className="link font-semibold">
              {t('Tous les articles', 'All articles')}
            </Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  href={p.article(a.slug)}
                  className="block h-full rounded-xl border border-line bg-white/60 p-5 transition-colors hover:border-pine"
                >
                  <span className="text-sm text-muted">{a.category}</span>
                  <span className="mt-1 block font-display text-xl leading-snug text-ink">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
