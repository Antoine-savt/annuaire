import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { ContactTarget } from '../types';
import { telHref } from '../data';
import { isUnlocked, LeadInput, savedContact, submitLead } from '../lib/leads';
import { track } from '../lib/track';
import { Link } from '../router';
import { site } from '../site';
import { translator, useLang, usePaths } from '../i18n/lang';

interface ContactAccessProps {
  target: ContactTarget;
  className?: string;
  label?: string;
}

/** "Obtenir les coordonnées" button: the phone and website of a venue or vendor are shown only after a short form. */
export function ContactAccess({ target, className = 'btn-primary', label }: ContactAccessProps) {
  const t = translator(useLang());
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
    void track('contact_open', target.id, target.owner);
  };

  return (
    <>
      <button type="button" onClick={openDialog} className={className} aria-haspopup="dialog">
        {label ?? t('Obtenir les coordonnées', 'Get contact details')}
      </button>
      {open && <ContactDialog target={target} onClose={() => setOpen(false)} />}
    </>
  );
}

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';

function ContactDialog({ target, onClose }: { target: ContactTarget; onClose: () => void }) {
  const lang = useLang();
  const t = translator(lang);
  const p = usePaths();
  const noun = target.kind === 'venue' ? t('lieu', 'venue') : t('prestataire', 'vendor');
  const ids = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<'form' | 'sending' | 'revealed'>(() => (isUnlocked(target.id) ? 'revealed' : 'form'));
  const [error, setError] = useState('');
  const [form, setForm] = useState<LeadInput>(() => ({
    firstName: '',
    email: '',
    phone: '',
    weddingDate: '',
    guests: '',
    ...savedContact(),
  }));

  // No close() on cleanup: its asynchronous "close" event would immediately close the next dialog
  // (React runs effects twice in development). Removing the element is enough to dismiss it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const update = (patch: Partial<LeadInput>) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setStep('sending');
    try {
      await submitLead(target.id, form, target.owner);
      setStep('revealed');
    } catch (err) {
      console.error(err);
      setError(
        t(
          "La demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez.",
          'Your request could not be sent. Please check your connection and try again.',
        ),
      );
      setStep('form');
    }
  };

  const website = target.website?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const websiteLabel = target.website?.includes('instagram.com') ? 'Instagram' : t('Site web', 'Website');

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby={`${ids}-title`}
      className="m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{target.place}</p>
            <h2 id={`${ids}-title`} className="mt-1 text-[1.8rem] leading-tight">
              {target.name}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink">
            {t('Fermer', 'Close')}
          </button>
        </div>

        {step === 'revealed' ? (
          <div className="mt-6">
            <p className="text-[0.95rem] text-muted">
              {t(<>Voici les coordonnées du {noun}.</>, <>Here are the {noun}&rsquo;s contact details.</>)}
            </p>
            <dl className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
              <div className="p-4">
                <dt className="text-xs font-semibold text-muted">{t('Téléphone', 'Phone')}</dt>
                <dd className="mt-1">
                  <a
                    href={telHref(target.phone)}
                    onClick={() => void track('phone_click', target.id, target.owner)}
                    className="font-display text-2xl text-pine hover:underline"
                  >
                    {t(target.phone.replace('+33 ', '0'), target.phone)}
                  </a>
                </dd>
              </div>
              {target.website && (
                <div className="p-4">
                  <dt className="text-xs font-semibold text-muted">{websiteLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={target.website}
                      target="_blank"
                      rel="noopener"
                      onClick={() => void track('website_click', target.id, target.owner)}
                      className="link text-lg"
                    >
                      {website}
                      <span className="sr-only">{t(' (nouvel onglet)', ' (opens in a new tab)')}</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <p className="mt-4 rounded-xl bg-sage-soft px-4 py-3 text-[0.95rem]">
              {t(
                <>
                  En les contactant, dites que vous les avez trouvés sur {site.name} : cela les aide à savoir d'où
                  viennent leurs demandes.
                </>,
                <>
                  When you get in touch, mention that you found them on {site.name}: it helps them know where their
                  enquiries come from.
                </>,
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6">
            <p className="text-[0.95rem] leading-relaxed text-muted">
              {t(
                <>
                  Indiquez quelques informations pour afficher le téléphone et le site du {noun}. Vous les contactez
                  ensuite directement.
                </>,
                <>
                  Share a few details to see the {noun}&rsquo;s phone number and website. You then contact them
                  directly.
                </>,
              )}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                {t('Prénom', 'First name')}
                <input
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-semibold">
                {t('E-mail', 'Email')}
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-semibold">
                {t('Date du mariage', 'Wedding date')} <span className="font-normal text-muted">{t('(facultatif)', '(optional)')}</span>
                <input
                  type="date"
                  value={form.weddingDate}
                  onChange={(e) => update({ weddingDate: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-semibold">
                {t("Nombre d'invités", 'Number of guests')} <span className="font-normal text-muted">{t('(facultatif)', '(optional)')}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={5000}
                  value={form.guests}
                  onChange={(e) => update({ guests: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                {t('Téléphone', 'Phone')} <span className="font-normal text-muted">{t('(facultatif)', '(optional)')}</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input
                required
                type="checkbox"
                className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 rounded border-ink/30 text-pine focus:ring-pine/40"
              />
              <span>
                {t(
                  <>
                    J'accepte que {site.name} conserve ces informations pour mesurer l'intérêt pour ce {noun}. Elles ne
                    lui sont pas transmises et ne sont pas revendues.
                  </>,
                  <>
                    I agree that {site.name} may keep this information to measure interest in this {noun}. It is not
                    passed on to the {noun} and is never sold.
                  </>,
                )}{' '}
                <Link href={p.confidentialite} onClick={onClose} className="link text-ink">
                  {t('En savoir plus', 'Learn more')}
                </Link>
              </span>
            </label>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}

            <button type="submit" disabled={step === 'sending'} className="btn-primary mt-6 w-full disabled:opacity-60">
              {step === 'sending' ? t('Envoi…', 'Sending…') : t('Afficher les coordonnées', 'Show contact details')}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
