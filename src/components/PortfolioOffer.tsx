import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { vendorCategories } from '../vendors';
import { PortfolioContext, PortfolioInput, submitPortfolioRequest } from '../lib/portfolio';
import { Link } from '../router';
import { paths } from '../routes';
import { site } from '../site';

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';
const optional = <span className="font-normal text-muted">(facultatif)</span>;

interface PortfolioOfferProps {
  /** Known details, to prefill the form. */
  defaults?: Partial<PortfolioInput>;
  context?: PortfolioContext;
}

/**
 * Line under a portfolio field: "Déléguez la création de votre portfolio à L'Édition". It opens a short
 * contact form; the requests are listed in /admin.
 */
export function PortfolioOffer({ defaults, context }: PortfolioOfferProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span className="mt-1.5 block text-xs font-normal leading-relaxed text-muted">
        Pas encore de portfolio ?{' '}
        <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="font-semibold text-pine underline underline-offset-2 hover:text-ink">
          Déléguez la création de votre portfolio à {site.name}
        </button>{' '}
        et bénéficiez d'une réduction sur son prix.
      </span>
      {/* Rendered in <body>: this line usually sits inside another form, and forms cannot be nested. */}
      {open && createPortal(<PortfolioDialog defaults={defaults} context={context} onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function PortfolioDialog({ defaults, context, onClose }: PortfolioOfferProps & { onClose: () => void }) {
  const ids = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState<PortfolioInput>(() => ({
    name: '',
    company: '',
    category: '',
    email: '',
    phone: '',
    current: '',
    message: '',
    ...defaults,
  }));
  const update = (patch: Partial<PortfolioInput>) => setForm((f) => ({ ...f, ...patch }));

  // Same pattern as the contact dialog: no close() on cleanup, removing the element dismisses it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      await submitPortfolioRequest(form, context);
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setError("La demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez.");
      setStatus('idle');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby={`${ids}-title`}
      className="m-auto w-[min(36rem,calc(100vw-2rem))] rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-pine">Portfolio</p>
            <h2 id={`${ids}-title`} className="mt-1 text-[1.8rem] leading-tight">
              Déléguez la création de votre portfolio à {site.name}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink">
            Fermer
          </button>
        </div>

        {status === 'sent' ? (
          <div role="status" className="mt-6">
            <p className="font-display text-2xl text-ink">Merci, votre demande est bien envoyée.</p>
            <p className="mt-2 leading-relaxed text-muted">
              Nous revenons vers vous rapidement à l'adresse {form.email} avec une proposition pour votre portfolio.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-6">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-5">
            <p className="text-[0.95rem] leading-relaxed text-muted">
              Nous créons pour vous un portfolio en ligne qui présente vos plus beaux mariages. Laissez vos coordonnées et
              quelques mots sur votre projet : nous revenons vers vous avec une proposition.
            </p>
            <p className="mt-3 rounded-xl bg-sage-soft px-4 py-3 text-[0.95rem] text-ink">
              <strong className="font-semibold">Tarif réduit :</strong> en confiant votre portfolio à {site.name}, vous
              bénéficiez d'une réduction sur le prix de sa création.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Prénom et nom
                <input required autoComplete="name" maxLength={120} value={form.name} onChange={(e) => update({ name: e.target.value })} className={fieldClass} />
              </label>
              <label className={labelClass}>
                Entreprise
                <input required autoComplete="organization" maxLength={120} value={form.company} onChange={(e) => update({ company: e.target.value })} className={fieldClass} />
              </label>
              <label className={labelClass}>
                E-mail
                <input required type="email" autoComplete="email" maxLength={200} value={form.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
              </label>
              <label className={labelClass}>
                Téléphone
                <input required type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={fieldClass} />
              </label>
              <label className={labelClass}>
                Métier
                <select value={form.category} onChange={(e) => update({ category: e.target.value })} className={fieldClass}>
                  <option value="">Choisir</option>
                  {vendorCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Site ou portfolio actuel {optional}
                <input inputMode="url" maxLength={200} value={form.current} onChange={(e) => update({ current: e.target.value })} placeholder="www.votre-site.fr" className={fieldClass} />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                Votre projet {optional}
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => update({ message: e.target.value })}
                  placeholder="Ce que vous aimeriez montrer, vos délais, vos questions…"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input required type="checkbox" className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 rounded border-ink/30 text-pine focus:ring-pine/40" />
              <span>
                J'accepte que {site.name} utilise ces informations pour me recontacter au sujet de mon portfolio.{' '}
                <Link href={paths.confidentialite} onClick={onClose} className="link text-ink">
                  En savoir plus
                </Link>
              </span>
            </label>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full disabled:opacity-60">
              {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
