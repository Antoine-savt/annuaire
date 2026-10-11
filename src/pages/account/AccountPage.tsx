import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { ListingDoc, UserProfile } from '../../types';
import { staticVenues } from '../../data';
import { categoryLabel } from '../../vendors';
import {
  authErrorMessage,
  refreshVerification,
  resendVerification,
  sendPasswordReset,
  useAuthUser,
} from '../../lib/auth';
import {
  Claim,
  createClaim,
  deleteAccount,
  deleteListing,
  deletePhoto,
  emptyProfile,
  emptyStats,
  getProfile,
  ListingStats,
  myClaims,
  myListings,
  myStats,
  saveProfile,
  setListingStatus,
  uploadPhoto,
} from '../../lib/account';
import { removeListingLocally, upsertListingLocally } from '../../catalog';
import { forgetPro, rememberPro } from '../../lib/proHint';
import { Link, useRouter } from '../../router';
import { paths } from '../../routes';
import { PricingNotice } from '../../components/PricingNotice';
import { SiteChateauCard } from '../../components/SiteChateauOffer';
import { Photo } from '../../components/Photo';
import { SignOutButton } from '../../components/SignOutButton';

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';
const cardClass = 'rounded-2xl border border-line bg-white p-5 sm:p-6';

const STATUS: Record<ListingDoc['status'], { label: string; className: string }> = {
  published: { label: 'Publiée', className: 'bg-pine text-white' },
  draft: { label: 'Brouillon', className: 'bg-sage-soft text-pine-dark' },
  hidden: { label: 'Masquée par L’Édition', className: 'bg-red-50 text-red-800' },
};

const CLAIM_STATUS: Record<string, string> = {
  pending: 'En cours de vérification',
  approved: 'Acceptée : la fiche est dans « Mes fiches »',
  rejected: 'Refusée',
};

/** Public address of a listing. */
function listingUrl(l: ListingDoc): string {
  return l.type === 'lieu' ? paths.venue(l.slug) : paths.vendorPage(l.category, l.slug);
}

function ListingCard({
  listing,
  stats,
  onChanged,
}: {
  listing: ListingDoc;
  stats: ListingStats;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const status = STATUS[listing.status];

  const act = async (action: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try {
      await action();
      onChanged();
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="grid overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-[12rem_1fr]">
      <div className={`bg-sage-soft ${listing.photos[0] ? "aspect-[16/10] sm:aspect-auto" : ""}`}>
        {listing.photos[0] ? (
          <Photo id={listing.photos[0]} alt="" sizes="200px" />
        ) : (
          <div className="flex h-full min-h-20 items-center justify-center font-display text-4xl text-pine/50 sm:min-h-32 sm:text-5xl">
            {listing.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>{status.label}</span>
          <span className="text-sm text-muted">{listing.type === 'lieu' ? 'Lieu de réception' : categoryLabel(listing.category)}</span>
        </div>
        <h3 className="mt-2 text-2xl leading-tight text-ink">{listing.name}</h3>
        <p className="text-sm text-muted">{listing.commune}</p>

        <dl className="mt-4 grid grid-cols-3 gap-3 sm:max-w-md">
          {[
            ['Visiteurs', stats.visitors],
            ['Enregistrements', stats.saves],
            ['Demandes', stats.leads],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-sage-soft/60 px-3 py-2">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="font-display text-2xl text-ink tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {listing.status === 'published' && (
            <Link href={listingUrl(listing)} className="link font-semibold">
              Voir la fiche
            </Link>
          )}
          {listing.status !== 'hidden' && (
            <Link href={paths.editListing(listing.id)} className="link font-semibold">
              Modifier
            </Link>
          )}
          {listing.status === 'published' && (
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void act(async () => {
                  await setListingStatus(listing.id, 'draft');
                  removeListingLocally(listing.id);
                })
              }
              className="link text-muted"
            >
              Dépublier
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (!window.confirm(`Supprimer définitivement la fiche « ${listing.name} » et ses photos ?`)) return;
              void act(async () => {
                await deleteListing(listing);
                removeListingLocally(listing.id);
              });
            }}
            className="link text-red-700"
          >
            Supprimer
          </button>
        </div>
        {listing.status === 'hidden' && (
          <p className="mt-3 text-sm text-red-800">
            Cette fiche a été masquée car elle ne respecte pas les conditions d’utilisation. Contactez-nous pour en savoir plus.
          </p>
        )}
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </li>
  );
}

function ProfileForm({ user, profile, isNew, onSaved }: { user: User; profile: UserProfile; isNew: boolean; onSaved: (p: UserProfile) => void }) {
  const [form, setForm] = useState(profile);
  /** Photos replaced or removed since the last save, deleted once the profile is saved. */
  const [replaced, setReplaced] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const update = (patch: Partial<UserProfile>) => setForm((f) => ({ ...f, ...patch }));

  const onPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const url = await uploadPhoto(user.uid, 'profile', file);
      if (form.photoURL) setReplaced((r) => [...r, form.photoURL]);
      update({ photoURL: url });
    } catch (err) {
      console.error(err);
      setError('La photo n’a pas pu être envoyée. Vérifiez qu’il s’agit bien d’une image (JPEG, PNG ou WebP).');
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');
    try {
      const next = { ...form, email: user.email ?? form.email };
      await saveProfile(user.uid, next, isNew);
      onSaved(next);
      void Promise.all(replaced.filter((p) => p !== next.photoURL).map(deletePhoto));
      setReplaced([]);
      setMessage('Profil enregistré.');
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const toggleIntent = (intent: string, on: boolean) =>
    update({ intents: on ? [...new Set([...form.intents, intent])] : form.intents.filter((i) => i !== intent) });

  return (
    <form onSubmit={onSubmit} className={cardClass}>
      <div className="flex flex-wrap items-center gap-5">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-sage-soft">
          {form.photoURL ? (
            <img src={form.photoURL} alt="Photo de profil" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-3xl text-pine/60">
              {(form.firstName || user.email || '?').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="btn-ghost cursor-pointer !py-2 text-sm">
            {form.photoURL ? 'Changer la photo' : 'Ajouter une photo'}
            <input type="file" accept="image/*" onChange={(e) => void onPhoto(e)} className="sr-only" />
          </label>
          {form.photoURL && (
            <button
              type="button"
              onClick={() => {
                setReplaced((r) => [...r, form.photoURL]);
                update({ photoURL: '' });
              }}
              className="text-sm text-muted hover:text-ink hover:underline"
            >
              Retirer
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Prénom
          <input required value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Nom
          <input required value={form.lastName} onChange={(e) => update({ lastName: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Téléphone
          <input type="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          E-mail
          <input value={user.email ?? ''} readOnly className={`${fieldClass} bg-sage-soft/50 text-muted`} />
        </label>
        <label className={labelClass}>
          Entreprise ou domaine
          <input value={form.company} onChange={(e) => update({ company: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Fonction
          <select value={form.role} onChange={(e) => update({ role: e.target.value })} className={fieldClass}>
            <option value="">Choisir</option>
            {['Propriétaire', 'Gérant ou directeur', 'Responsable événementiel', 'Prestataire indépendant', 'Autre'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className={labelClass}>Vous proposez</legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
          <label className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={form.intents.includes('lieu')}
              onChange={(e) => toggleIntent('lieu', e.target.checked)}
              className="h-4 w-4 rounded border-ink/30 text-pine focus:ring-pine/40"
            />
            Un lieu de réception
          </label>
          <label className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={form.intents.includes('prestataire')}
              onChange={(e) => toggleIntent('prestataire', e.target.checked)}
              className="h-4 w-4 rounded border-ink/30 text-pine focus:ring-pine/40"
            />
            Une activité de prestataire
          </label>
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? 'Enregistrement…' : isNew ? 'Créer mon profil' : 'Enregistrer mon profil'}
        </button>
        {message && <p className="text-sm text-pine">{message}</p>}
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

/** Venue to claim from a link sent to its owner, e.g. "/compte?revendiquer=chateau-de-berne". */
function claimFromLink(): string {
  const slug = new URLSearchParams(window.location.search).get('revendiquer') ?? '';
  return staticVenues.some((v) => v.slug === slug) ? slug : '';
}

function ClaimForm({ user, name, claims, onSent }: { user: User; name: string; claims: Claim[]; onSent: () => void }) {
  const [slug, setSlug] = useState(claimFromLink);
  const [open, setOpen] = useState(() => slug !== '');
  const cardRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const claimed = new Set(claims.map((c) => c.venueSlug));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await createClaim(user, name, slug, message);
      setOpen(false);
      setSlug('');
      setMessage('');
      onSent();
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  // Opened from a claim link: bring the form into view.
  useEffect(() => {
    if (claimFromLink()) cardRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div ref={cardRef} id="revendiquer" className={cardClass}>
      <h3 className="font-sans text-lg font-semibold text-ink">Votre lieu est déjà dans l’annuaire ?</h3>
      <p className="mt-1 text-[0.95rem] text-muted">
        Revendiquez sa fiche pour la gérer vous-même. Nous vérifions que vous en êtes bien le propriétaire ou le gérant,
        puis la fiche passe dans votre compte.
      </p>
      {claims.length > 0 && (
        <ul className="mt-4 space-y-1 text-[0.95rem]">
          {claims.map((c) => (
            <li key={c.id}>
              <strong className="font-semibold">{staticVenues.find((v) => v.slug === c.venueSlug)?.nom_du_lieu ?? c.venueSlug}</strong> :{' '}
              {CLAIM_STATUS[c.status] ?? c.status}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <label className={labelClass}>
            Le lieu
            <select required value={slug} onChange={(e) => setSlug(e.target.value)} className={fieldClass}>
              <option value="">Choisir le lieu</option>
              {staticVenues
                .filter((v) => !claimed.has(v.slug))
                .map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.nom_du_lieu} ({v.commune})
                  </option>
                ))}
            </select>
          </label>
          <label className={labelClass}>
            Message <span className="font-normal text-muted">(votre fonction, un moyen de vérifier)</span>
            <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${fieldClass} resize-y`} />
          </label>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
              Envoyer la demande
            </button>
            <button type="button" onClick={() => setOpen(false)} className="btn-ghost">
              Annuler
            </button>
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}
        </form>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn-ghost mt-4">
          Revendiquer une fiche
        </button>
      )}
    </div>
  );
}

export default function AccountPage() {
  const user = useAuthUser();
  const { navigate } = useRouter();
  const [profile, setProfile] = useState<UserProfile | null | undefined>(undefined);
  const [listings, setListings] = useState<ListingDoc[]>([]);
  const [stats, setStats] = useState<Map<string, ListingStats>>(new Map());
  const [claims, setClaims] = useState<Claim[]>([]);
  const [verified, setVerified] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user === null) navigate(`${paths.login}?suite=${encodeURIComponent(paths.account)}`);
    if (user) setVerified(user.emailVerified);
  }, [user, navigate]);

  const load = async (u: User) => {
    try {
      const [p, l, s, c] = await Promise.all([getProfile(u.uid), myListings(u.uid), myStats(u.uid), myClaims(u.uid)]);
      setProfile(p);
      if (p) rememberPro({ name: p.firstName || u.email || '', photoURL: p.photoURL });
      setListings(l);
      setStats(s);
      setClaims(c);
      // Keep the public catalog of this browser in line with the account.
      l.forEach((x) => (x.status === 'published' ? upsertListingLocally(x) : removeListingLocally(x.id)));
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
      setProfile((p) => (p === undefined ? null : p));
    }
  };

  useEffect(() => {
    if (user) void load(user);
  }, [user]);

  if (!user || profile === undefined) {
    return <p className="mx-auto max-w-6xl px-5 py-16 text-muted sm:px-8">Chargement de votre compte…</p>;
  }

  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user.displayName || user.email || '';
  const passwordAccount = user.providerData.some((p) => p.providerId === 'password');

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-pine">Espace professionnel</p>
          <h1 className="mt-1 text-4xl text-ink sm:text-5xl">Bonjour {profile?.firstName || name}</h1>
          <p className="mt-1 text-muted">{user.email}</p>
        </div>
        <SignOutButton onSignedOut={() => navigate('/')} />
      </header>

      {!verified && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ochre/40 bg-[#fbf6ea] px-5 py-4">
          <p className="text-[0.95rem] text-ink">
            <strong className="font-semibold">Confirmez votre adresse e-mail</strong> pour publier vos fiches : cliquez sur le
            lien que nous vous avons envoyé.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void resendVerification(user).then(() => setNotice('E-mail de confirmation renvoyé.'))}
              className="btn-ghost !py-2 text-sm"
            >
              Renvoyer l’e-mail
            </button>
            <button
              type="button"
              onClick={() =>
                void refreshVerification(user).then((ok) => {
                  setVerified(ok);
                  setNotice(ok ? 'Adresse confirmée : vous pouvez publier.' : 'Pas encore confirmée : vérifiez vos e-mails, y compris les indésirables.');
                })
              }
              className="btn-primary !py-2 text-sm"
            >
              J’ai confirmé
            </button>
          </div>
        </div>
      )}
      {notice && (
        <p role="status" className="mt-3 text-sm text-pine">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <section aria-labelledby="mes-fiches" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="mes-fiches" className="text-3xl text-ink">
            Mes fiches
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href={paths.newListing('lieu')} className="btn-primary">
              Proposer un lieu
            </Link>
            <Link href={paths.newListing('prestataire')} className="btn-ghost">
              Ajouter mon activité de prestataire
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-line px-6 py-10 text-center">
            <p className="font-display text-2xl text-ink">Vous n’avez pas encore de fiche</p>
            <p className="mx-auto mt-2 max-w-xl text-muted">
              Publiez votre lieu de réception ou votre activité de prestataire : la fiche est en ligne dès que vous la
              publiez, et vous suivez ici ses statistiques.
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} stats={stats.get(l.id) ?? emptyStats} onChanged={() => void load(user)} />
            ))}
          </ul>
        )}

        <div className="mt-6">
          <ClaimForm user={user} name={name} claims={claims} onSent={() => void load(user)} />
        </div>
      </section>

      <section aria-labelledby="profil" className="mt-14 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <h2 id="profil" className="mb-5 text-3xl text-ink">
            Mon profil
          </h2>
          <ProfileForm
            user={user}
            profile={profile ?? { ...emptyProfile, email: user.email ?? '' }}
            isNew={profile === null}
            onSaved={(p) => {
              setProfile(p);
              rememberPro({ name: p.firstName || user.email || '', photoURL: p.photoURL });
            }}
          />
        </div>
        <aside className="space-y-6 lg:pt-14">
          <PricingNotice />
          {(profile?.intents.includes('lieu') || listings.some((l) => l.type === 'lieu')) && <SiteChateauCard placement="compte" />}
          <div className={cardClass}>
            <h3 className="font-sans text-lg font-semibold text-ink">Sécurité et compte</h3>
            {passwordAccount && (
              <button
                type="button"
                onClick={() => void sendPasswordReset(user.email ?? '').then(() => setNotice('E-mail de changement de mot de passe envoyé.'))}
                className="link mt-3 block text-[0.95rem]"
              >
                Changer mon mot de passe
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (!window.confirm('Supprimer votre compte, vos fiches et vos photos ? Cette action est définitive.')) return;
                void deleteAccount(user, profile ?? null)
                  .then(() => {
                    forgetPro();
                    navigate('/');
                  })
                  .catch((err) => setError(authErrorMessage(err)));
              }}
              className="mt-3 block text-[0.95rem] text-red-700 hover:underline"
            >
              Supprimer mon compte
            </button>
            <p className="mt-3 text-xs text-muted">
              Voir les{' '}
              <Link href={paths.terms} className="link">
                conditions d’utilisation
              </Link>{' '}
              et la{' '}
              <Link href={paths.confidentialite} className="link">
                confidentialité
              </Link>
              .
            </p>
          </div>
        </aside>
      </section>
    </section>
  );
}
