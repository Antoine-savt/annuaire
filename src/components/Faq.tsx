import { FaqItem } from '../types';
import { inline } from '../lib/richtext';
import { useT } from '../i18n/lang';

/** Visible questions and answers (also published as FAQPage structured data by the page's SEO). */
export function Faq({ items, title, id = 'questions' }: { items: FaqItem[]; title?: string; id?: string }) {
  const t = useT();
  if (items.length === 0) return null;
  title ??= t('Questions fréquentes', 'Frequently asked questions');
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.q} className="py-5">
            <dt className="font-sans text-lg font-semibold text-ink">{item.q}</dt>
            <dd className="mt-2 max-w-3xl text-[1.02rem] leading-relaxed text-ink/80">{inline(item.a)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
