import { FormEvent, useEffect, useId, useState } from 'react';
import {
  authErrorMessage,
  sendPasswordReset,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  useAuthUser,
} from '../../lib/auth';
import { emptyProfile, getProfile, saveProfile } from '../../lib/account';
import { firebaseConfigured } from '../../lib/firebase';
import { Link, useRouter } from '../../router';
import { paths } from '../../routes';
import { site } from '../../site';
import { PricingNotice } from '../../components/PricingNotice';

type Tab = 'login' | 'signup' | 'reset';

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';

/** Where to go after signing in: only paths of this site. */
function nextPath(): string {
  const next = new URLSearchParams(window.location.search).get('suite');
  return next && next.startsWith('/') && !next.startsWith('//') ? next : paths.account;
}

export default function LoginPage() {
  const ids = useId();
  const user = useAuthUser();
  const { navigate } = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    lieu: false,
    prestataire: false,
  });
  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('mode') === 'inscription') setTab('signup');
  }, []);

  // Already signed in: go straight to the account.
  useEffect(() => {
    if (user && !busy) navigate(nextPath());
  }, [user, busy, navigate]);

  const run = async (action: () => Promise<void>) => {
    setError('');
    setInfo('');
    setBusy(true);
    try {
      await action();
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
      setBusy(false);
    }
  };

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await signInWithEmail(form.email, form.password);
      navigate(nextPath());
    });
  };

  const onSignup = (e: FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('Choisissez un mot de passe d’au moins 6 caractères.');
      return;
    }
    void run(async () => {
      const { user: created } = await signUpWithEmail(form.email, form.password, `${form.firstName} ${form.lastName}`.trim());
      await saveProfile(
        created.uid,
        {
          ...emptyProfile,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          intents: [form.lieu && 'lieu', form.prestataire && 'prestataire'].filter((x): x is string => !!x),
        },
        true,
      );
      navigate(nextPath());
    });
  };

  const onGoogle = () =>
    void run(async () => {
      const { user: g } = await signInWithGoogle();
      if (!(await getProfile(g.uid))) {
        const [firstName = '', ...rest] = (g.displayName ?? '').split(' ');
        await saveProfile(
          g.uid,
          { ...emptyProfile, firstName, lastName: rest.join(' '), email: g.email ?? '', photoURL: g.photoURL ?? '' },
          true,
        );
      }
      navigate(nextPath());
    });

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await sendPasswordReset(form.email);
      setBusy(false);
      setInfo('Si un compte existe avec cette adresse, vous allez recevoir un e-mail pour choisir un nouveau mot de passe.');
    });
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'login', label: 'Se connecter' },
    { key: 'signup', label: 'Créer un compte' },
  ];

  if (!firebaseConfigured) {
    return (
      <section className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <h1 className="text-4xl text-ink">Espace professionnel</h1>
        <p className="mt-4 text-muted">L’espace professionnel n’est pas encore disponible.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_28rem] lg:gap-16">
      <div className="lg:pt-6">
        <p className="text-sm font-semibold text-pine">Espace professionnel</p>
        <h1 className="mt-2 text-[2.4rem] leading-[1.05] text-ink sm:text-5xl">
          Publiez votre lieu ou votre activité sur {site.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Propriétaires de domaines et prestataires de mariage dans le Var : créez votre compte, publiez votre fiche en
          quelques minutes et suivez combien de couples la consultent.
        </p>
        <ul className="mt-8 max-w-xl space-y-3 text-[1.02rem] text-ink">
          <li className="border-l-2 border-pine pl-4">Votre fiche en ligne immédiatement, avec vos photos et vos tarifs.</li>
          <li className="border-l-2 border-pine pl-4">Modifiable à tout moment depuis votre compte.</li>
          <li className="border-l-2 border-pine pl-4">Vos statistiques : vues, enregistrements, demandes de coordonnées.</li>
        </ul>
        <div className="mt-8 max-w-xl">
          <PricingNotice />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        {tab !== 'reset' && (
          <div role="tablist" aria-label="Connexion ou inscription" className="grid grid-cols-2 gap-1 rounded-full bg-sage-soft p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => {
                  setTab(t.key);
                  setError('');
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === t.key ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {tab !== 'reset' && (
          <>
            <button
              type="button"
              onClick={onGoogle}
              disabled={busy}
              className="btn-ghost mt-6 w-full disabled:opacity-60"
            >
              Continuer avec Google
            </button>
            <p className="mt-2 text-center text-xs leading-relaxed text-muted">
              En continuant avec Google, vous acceptez les{' '}
              <Link href={paths.terms} className="link">
                conditions d’utilisation
              </Link>
              .
            </p>
            <div className="my-6 flex items-center gap-3 text-xs text-muted" aria-hidden>
              <span className="h-px flex-1 bg-line" />
              ou avec votre e-mail
              <span className="h-px flex-1 bg-line" />
            </div>
          </>
        )}

        {tab === 'login' && (
          <form onSubmit={onLogin} className="space-y-4">
            <label className={labelClass}>
              E-mail
              <input required type="email" autoComplete="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Mot de passe
              <input
                required
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => update({ password: e.target.value })}
                className={fieldClass}
              />
            </label>
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? 'Connexion…' : 'Se connecter'}
            </button>
            <button type="button" onClick={() => setTab('reset')} className="link block text-sm text-muted">
              Mot de passe oublié ?
            </button>
          </form>
        )}

        {tab === 'signup' && (
          <form onSubmit={onSignup} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Prénom
                <input required autoComplete="given-name" value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} className={fieldClass} />
              </label>
              <label className={labelClass}>
                Nom
                <input required autoComplete="family-name" value={form.lastName} onChange={(e) => update({ lastName: e.target.value })} className={fieldClass} />
              </label>
            </div>
            <label className={labelClass}>
              E-mail
              <input required type="email" autoComplete="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Téléphone <span className="font-normal text-muted">(facultatif)</span>
              <input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Mot de passe <span className="font-normal text-muted">(6 caractères minimum)</span>
              <input
                required
                type="password"
                autoComplete="new-password"
                minLength={6}
                value={form.password}
                onChange={(e) => update({ password: e.target.value })}
                className={fieldClass}
              />
            </label>
            <fieldset>
              <legend className={labelClass}>Vous souhaitez référencer</legend>
              <div className="mt-2 space-y-2 text-[0.95rem]">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={form.lieu} onChange={(e) => update({ lieu: e.target.checked })} className="h-4 w-4 rounded border-ink/30 text-pine focus:ring-pine/40" />
                  Un lieu de réception
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.prestataire}
                    onChange={(e) => update({ prestataire: e.target.checked })}
                    className="h-4 w-4 rounded border-ink/30 text-pine focus:ring-pine/40"
                  />
                  Mon activité de prestataire de mariage
                </label>
              </div>
            </fieldset>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input required type="checkbox" id={`${ids}-cgu`} className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/30 text-pine focus:ring-pine/40" />
              <span>
                J’accepte les{' '}
                <Link href={paths.terms} className="link text-ink">
                  conditions d’utilisation
                </Link>{' '}
                et la{' '}
                <Link href={paths.confidentialite} className="link text-ink">
                  politique de confidentialité
                </Link>
                .
              </span>
            </label>
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? 'Création du compte…' : 'Créer mon compte'}
            </button>
          </form>
        )}

        {tab === 'reset' && (
          <form onSubmit={onReset} className="space-y-4">
            <h2 className="text-2xl text-ink">Mot de passe oublié</h2>
            <p className="text-[0.95rem] text-muted">Indiquez votre e-mail : nous vous envoyons un lien pour en choisir un nouveau.</p>
            <label className={labelClass}>
              E-mail
              <input required type="email" autoComplete="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
            </label>
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              Envoyer le lien
            </button>
            <button type="button" onClick={() => setTab('login')} className="link block text-sm text-muted">
              Retour à la connexion
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        )}
        {info && (
          <p role="status" className="mt-4 text-sm text-pine">
            {info}
          </p>
        )}
      </div>
    </section>
  );
}
