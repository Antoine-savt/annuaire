import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { ListingDoc } from '../../types';
import { findZone, zones } from '../../data';
import { departmentZone, departments, departmentZoneSlug } from '../../departments';
import { findVendorCategory, vendorCategories } from '../../vendors';
import { authErrorMessage, refreshVerification, resendVerification, useAuthUser } from '../../lib/auth';
import {
  createListing,
  deletePhoto,
  draftFromListing,
  getListing,
  getProfile,
  ListingDraft,
  updateListing,
  uploadPhoto,
} from '../../lib/account';
import { listingToVenue } from '../../lib/listings';
import { removeListingLocally, upsertListingLocally } from '../../catalog';
import { Link, useRouter } from '../../router';
import { paths } from '../../routes';
import { KeyFigures, Tags } from '../../components/VenueListItem';
import { Photo } from '../../components/Photo';
import { PortfolioOffer } from '../../components/PortfolioOffer';

const MAX_PHOTOS = 8;
const VAR_WIDE = 'Tout le Var';
const VENUE_TYPES = ['Château', 'Domaine viticole', 'Bastide', 'Mas', 'Villa', 'Hôtel', 'Restaurant', 'Salle de réception', 'Autre'];

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30 disabled:bg-sage-soft/50 disabled:text-muted';
const labelClass = 'block text-sm font-semibold text-ink';

function emptyDraft(type: ListingDoc['type'], category: string): ListingDraft {
  return {
    type,
    category: type === 'lieu' ? 'lieu' : category,
    name: '',
    commune: '',
    zone: type === 'prestataire' ? VAR_WIDE : '',
    summary: '',
    description: '',
    tags: ['', '', ''],
    highlight: '',
    phone: '',
    website: '',
    instagram: '',
    portfolio: '',
    photos: [],
    venueType: '',
    guestsMin: '',
    guestsMax: '',
    sleeps: '',
    priceFrom: '',
    priceDetails: '',
  };
}

/** What a listing still needs before it can be published (same checks as the public catalog). */
function missingForPublishing(d: ListingDraft): string[] {
  const missing: string[] = [];
  if (d.type === 'prestataire' && !findVendorCategory(d.category)) missing.push('la catégorie');
  if (!d.name.trim()) missing.push('le nom');
  if (!d.commune.trim()) missing.push('la commune');
  if (!d.zone) missing.push(d.type === 'lieu' ? 'le secteur' : 'la zone d’intervention');
  if (!d.summary.trim()) missing.push('le résumé');
  if (!d.phone.trim()) missing.push('le téléphone');
  if (d.type === 'lieu' && d.photos.length === 0) missing.push('une photo');
  return missing;
}

/** "a", "a et b", "a, b et c". */
function listFr(items: string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;
}

const digits = (value: string) => value.replace(/[^\d]/g, '');
const toNumber = (value: string) => (digits(value) ? Number(digits(value)) : null);

/** The draft as a listing, to preview it with the same components as the public pages. */
function previewListing(d: ListingDraft): ListingDoc {
  return {
    id: 'apercu',
    ownerUid: '',
    type: d.type,
    category: d.category,
    slug: 'apercu',
    status: 'draft',
    name: d.name.trim() || (d.type === 'lieu' ? 'Nom de votre lieu' : 'Nom de votre activité'),
    commune: d.commune.trim() || 'Commune',
    zone: d.zone,
    summary: d.summary.trim() || 'Votre résumé apparaîtra ici : une ou deux phrases qui donnent envie d’en savoir plus.',
    description: d.description,
    tags: d.tags.map((t) => t.trim()).filter(Boolean),
    highlight: d.highlight,
    phone: d.phone,
    website: d.website,
    instagram: d.instagram,
    portfolio: d.portfolio,
    photos: d.photos,
    venueType: d.venueType,
    guestsMin: toNumber(d.guestsMin),
    guestsMax: toNumber(d.guestsMax),
    sleeps: toNumber(d.sleeps) ?? 0,
    priceFrom: toNumber(d.priceFrom),
    priceDetails: d.priceDetails,
    createdAt: 0,
    updatedAt: 0,
  };
}

function errorCode(error: unknown): string {
  return typeof error === 'object' && error && 'code' in error ? String((error as { code: unknown }).code) : '';
}

function photoErrorMessage(error: unknown): string {
  switch (errorCode(error)) {
    case 'storage/unauthorized':
      return 'Envoi refusé : la photo doit être une image de moins de 5 Mo.';
    case 'storage/retry-limit-exceeded':
    case 'storage/canceled':
      return 'L’envoi a été interrompu. Vérifiez votre connexion et réessayez.';
    case 'storage/quota-exceeded':
    case 'storage/unknown':
    case 'storage/bucket-not-found':
    case 'storage/project-not-found':
    case 'storage/no-default-bucket':
      return 'L’envoi de photos est momentanément indisponible. Réessayez plus tard.';
    default:
      return 'Cette image n’a pas pu être lue. Essayez avec une photo JPEG ou PNG.';
  }
}

function Section({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 className="text-2xl text-ink">{title}</h2>
      {intro && <p className="mt-1 text-[0.95rem] text-muted">{intro}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function Counter({ value, max }: { value: string; max: number }) {
  return (
    <span className={`float-right text-xs font-normal tabular-nums ${value.length > max * 0.9 ? 'text-ochre' : 'text-muted'}`}>
      {value.length}/{max}
    </span>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-xs font-normal text-muted">{children}</span>;
}

type LoadState = 'loading' | 'ready' | 'missing';

export default function ListingEditorPage() {
  const user = useAuthUser();
  const { navigate } = useRouter();
  const [state, setState] = useState<LoadState>('loading');
  const [listing, setListing] = useState<ListingDoc | null>(null);
  const [draft, setDraft] = useState<ListingDraft>(() => emptyDraft('lieu', ''));
  const [removedPhotos, setRemovedPhotos] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<{ done: number; total: number } | null>(null);
  const [photoError, setPhotoError] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState<ListingDoc['status'] | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (user === null) {
      navigate(`${paths.login}?suite=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
      return;
    }
    if (!user) return;
    setVerified(user.emailVerified);
    let active = true;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    void (async () => {
      try {
        if (id) {
          const doc = await getListing(id);
          if (!active) return;
          if (!doc || doc.ownerUid !== user.uid) {
            setState('missing');
            return;
          }
          setListing(doc);
          setDraft(draftFromListing(doc));
        } else {
          const type = params.get('type') === 'prestataire' ? 'prestataire' : 'lieu';
          const next = emptyDraft(type, findVendorCategory(params.get('categorie') ?? '')?.slug ?? '');
          const profile = await getProfile(user.uid).catch(() => null);
          if (!active) return;
          if (profile) {
            next.name = profile.company;
            next.phone = profile.phone;
          }
          setDraft(next);
        }
        setState('ready');
      } catch (err) {
        console.error(err);
        if (active) setState('missing');
      }
    })();
    return () => {
      active = false;
    };
  }, [user, navigate]);

  // Warn before leaving the page with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  if (user === undefined || user === null || state === 'loading') {
    return <p className="mx-auto max-w-6xl px-5 py-16 text-muted sm:px-8">Chargement de la fiche…</p>;
  }

  if (state === 'missing') {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="text-4xl text-ink">Fiche introuvable</h1>
        <p className="mt-3 text-muted">Cette fiche n’existe plus, ou elle n’est pas rattachée à votre compte.</p>
        <Link href={paths.account} className="btn-primary mt-8">
          Retour à mon compte
        </Link>
      </section>
    );
  }

  if (listing?.status === 'hidden') {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <h1 className="text-4xl text-ink">{listing.name}</h1>
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-900">
          Cette fiche a été masquée par L’Édition car elle ne respecte pas les conditions d’utilisation. Elle ne peut
          plus être modifiée depuis votre compte : écrivez-nous pour en discuter.
        </p>
        <Link href={paths.account} className="btn-ghost mt-8">
          Retour à mon compte
        </Link>
      </section>
    );
  }

  const isVenue = draft.type === 'lieu';
  const category = findVendorCategory(draft.category);
  const missing = missingForPublishing(draft);
  const published = listing?.status === 'published';
  const publicUrl = listing && (isVenue ? paths.venue(listing.slug) : paths.vendorPage(listing.category, listing.slug));

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setDirty(true);
    setSaved(null);
  };

  const onFiles = async (e: ChangeEvent<HTMLInputElement>, u: User) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (!files.length) return;
    const room = MAX_PHOTOS - draft.photos.length;
    if (room <= 0) {
      setPhotoError(`${MAX_PHOTOS} photos maximum : retirez-en une pour en ajouter une autre.`);
      return;
    }
    const batch = files.slice(0, room);
    setPhotoError('');
    setUploading({ done: 0, total: batch.length });
    for (const [i, file] of batch.entries()) {
      try {
        const url = await uploadPhoto(u.uid, 'listings', file);
        update({});
        setDraft((d) => ({ ...d, photos: [...d.photos, url].slice(0, MAX_PHOTOS) }));
        setUploading({ done: i + 1, total: batch.length });
      } catch (err) {
        console.error(err);
        setPhotoError(photoErrorMessage(err));
        break;
      }
    }
    setUploading(null);
    if (files.length > room) setPhotoError(`Seules ${room} photo${room > 1 ? 's ont été ajoutées' : ' a été ajoutée'} : ${MAX_PHOTOS} maximum par fiche.`);
  };

  const removePhoto = (url: string) => {
    update({ photos: draft.photos.filter((p) => p !== url) });
    setRemovedPhotos((r) => [...r, url]);
  };

  const makeCover = (url: string) => update({ photos: [url, ...draft.photos.filter((p) => p !== url)] });

  const save = async (status: 'published' | 'draft') => {
    setError('');
    setSaved(null);
    if (!draft.name.trim()) {
      setError('Indiquez au moins le nom de la fiche pour l’enregistrer.');
      return;
    }
    if (status === 'published') {
      if (missing.length) {
        setError(`Pour publier, ajoutez ${listFr(missing)}.`);
        return;
      }
      if (!verified) {
        setError('Confirmez d’abord votre adresse e-mail (bandeau ci-dessus) : la fiche est enregistrée en brouillon en attendant.');
        status = 'draft';
      }
    }
    const min = toNumber(draft.guestsMin);
    const max = toNumber(draft.guestsMax);
    if (isVenue && min !== null && max !== null && min > max) {
      setError('Le nombre minimum d’invités est plus grand que le maximum.');
      return;
    }
    setBusy(true);
    try {
      const doc = listing ? await updateListing(listing.id, draft, status) : await createListing(user.uid, draft, status);
      setListing(doc);
      setDraft(draftFromListing(doc));
      if (doc.status === 'published') upsertListingLocally(doc);
      else removeListingLocally(doc.id);
      const gone = removedPhotos.filter((p) => !doc.photos.includes(p));
      setRemovedPhotos([]);
      void Promise.all(gone.map(deletePhoto));
      // The page now edits the saved listing: give it its own address.
      if (!listing) history.replaceState(history.state, '', paths.editListing(doc.id));
      setDirty(false);
      setSaved(doc.status);
    } catch (err) {
      console.error(err);
      setError(
        errorCode(err) === 'permission-denied' && status === 'published'
          ? 'Publication refusée : confirmez votre adresse e-mail avec le lien reçu, puis cliquez sur « J’ai confirmé ».'
          : authErrorMessage(err),
      );
    } finally {
      setBusy(false);
    }
  };

  const preview = previewListing(draft);
  const previewVenue = listingToVenue(preview);
  const zoneName = isVenue ? (findZone(draft.zone) ?? departmentZone(draft.zone))?.name : draft.zone;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
      <Link href={paths.account} className="text-sm text-muted hover:text-ink hover:underline">
        Mon compte
      </Link>
      <h1 className="mt-2 text-4xl leading-tight text-ink sm:text-5xl">
        {listing ? listing.name : isVenue ? 'Proposer un lieu de réception' : 'Ajouter mon activité de prestataire'}
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        {listing
          ? published
            ? 'Fiche publiée : vos modifications sont visibles dès que vous les enregistrez.'
            : 'Brouillon : la fiche n’est pas visible sur le site tant que vous ne la publiez pas.'
          : 'Remplissez la fiche à votre rythme : vous pouvez l’enregistrer en brouillon et la publier quand elle est prête.'}
      </p>

      {!verified && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ochre/40 bg-[#fbf6ea] px-5 py-4">
          <p className="max-w-2xl text-[0.95rem] text-ink">
            <strong className="font-semibold">Confirmez votre adresse e-mail pour publier.</strong> Vous pouvez déjà
            préparer la fiche et l’enregistrer en brouillon.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                void resendVerification(user).then(
                  () => setNotice('E-mail de confirmation renvoyé.'),
                  (err) => setNotice(authErrorMessage(err)),
                )
              }
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
          {notice && (
            <p role="status" className="w-full text-sm text-pine">
              {notice}
            </p>
          )}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <Section title="Identité">
            {!isVenue && (
              <label className={labelClass}>
                Catégorie
                <select
                  value={draft.category}
                  disabled={!!listing}
                  onChange={(e) => update({ category: e.target.value })}
                  className={fieldClass}
                >
                  <option value="">Choisir votre métier</option>
                  {vendorCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {listing && <Hint>La catégorie fait partie de l’adresse de la fiche : elle ne peut plus être modifiée.</Hint>}
              </label>
            )}
            <label className={labelClass}>
              <Counter value={draft.name} max={120} />
              {isVenue ? 'Nom du lieu' : 'Nom de votre entreprise'}
              <input
                value={draft.name}
                maxLength={120}
                onChange={(e) => update({ name: e.target.value })}
                placeholder={isVenue ? 'Château des Oliviers' : 'Atelier Lumière'}
                className={fieldClass}
              />
              {listing && <Hint>L’adresse de la fiche ({publicUrl}) reste la même si vous changez le nom.</Hint>}
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Commune
                <input value={draft.commune} maxLength={80} onChange={(e) => update({ commune: e.target.value })} placeholder="Lorgues" className={fieldClass} />
              </label>
              <label className={labelClass}>
                {isVenue ? 'Secteur ou département' : 'Zone d’intervention'}
                <select value={draft.zone} onChange={(e) => update({ zone: e.target.value })} className={fieldClass}>
                  {isVenue ? (
                    <>
                      <option value="">Choisir le secteur</option>
                      <optgroup label="Dans le Var">
                        {zones.map((z) => (
                          <option key={z.slug} value={z.slug}>
                            {z.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Hors du Var">
                        {departments.map((d) => (
                          <option key={d.code} value={departmentZoneSlug(d.code)}>
                            {d.name} ({d.code})
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    [VAR_WIDE, ...zones.map((z) => z.name)].map((name) => <option key={name}>{name}</option>)
                  )}
                </select>
              </label>
            </div>
            {isVenue && (
              <label className={labelClass}>
                Type de lieu
                <select value={draft.venueType} onChange={(e) => update({ venueType: e.target.value })} className={fieldClass}>
                  <option value="">Choisir</option>
                  {/* A type written differently (curated venue, older listing) stays selectable. */}
                  {draft.venueType && !VENUE_TYPES.includes(draft.venueType) && <option>{draft.venueType}</option>}
                  {VENUE_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            )}
          </Section>

          <Section
            title="Présentation"
            intro="Ce que les couples lisent en premier. Soyez concret : le cadre, les espaces, ce qui est compris."
          >
            <label className={labelClass}>
              <Counter value={draft.summary} max={200} />
              Résumé
              <textarea
                rows={2}
                maxLength={200}
                value={draft.summary}
                onChange={(e) => update({ summary: e.target.value })}
                placeholder={
                  isVenue
                    ? 'Bastide du XVIIIe au milieu des vignes, avec une cour ombragée pour le dîner et 20 couchages sur place.'
                    : 'Reportage photo documentaire et portraits en lumière naturelle, du dernier essayage à la soirée.'
                }
                className={`${fieldClass} resize-y`}
              />
              <Hint>Affiché dans la liste et en haut de la fiche.</Hint>
            </label>
            <label className={labelClass}>
              <Counter value={draft.description} max={4000} />
              Description détaillée
              <textarea
                rows={9}
                maxLength={4000}
                value={draft.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder={
                  isVenue
                    ? 'Les espaces (cérémonie, cocktail, dîner, soirée), la capacité assise et debout, le traiteur (libre ou imposé), l’heure de fin de soirée, l’accès, le stationnement…'
                    : 'Votre façon de travailler, vos formules, ce qui est compris, votre zone de déplacement, vos délais…'
                }
                className={`${fieldClass} resize-y`}
              />
            </label>
            <fieldset>
              <legend className={labelClass}>Trois points forts</legend>
              <div className="mt-1.5 grid gap-3 sm:grid-cols-3">
                {draft.tags.map((tag, i) => (
                  <input
                    key={i}
                    value={tag}
                    maxLength={30}
                    aria-label={`Point fort ${i + 1}`}
                    onChange={(e) => update({ tags: draft.tags.map((t, j) => (j === i ? e.target.value : t)) })}
                    placeholder={isVenue ? ['Vue sur les vignes', 'Piscine', 'Traiteur libre'][i] : ['Reportage', 'Drone', 'Album inclus'][i]}
                    className={`${fieldClass} !mt-0`}
                  />
                ))}
              </div>
              <Hint>Quelques mots chacun, affichés en étiquettes.</Hint>
            </fieldset>
            {isVenue && (
              <label className={labelClass}>
                <Counter value={draft.highlight} max={300} />
                Le petit plus du lieu
                <textarea
                  rows={2}
                  maxLength={300}
                  value={draft.highlight}
                  onChange={(e) => update({ highlight: e.target.value })}
                  placeholder="La cérémonie laïque sous le chêne centenaire, face au coucher de soleil."
                  className={`${fieldClass} resize-y`}
                />
              </label>
            )}
          </Section>

          {isVenue ? (
            <Section title="Chiffres clés" intro="Ils servent aux filtres de recherche : un lieu sans capacité ni prix apparaît moins souvent.">
              <div className="grid gap-5 sm:grid-cols-3">
                <label className={labelClass}>
                  Invités minimum
                  <input inputMode="numeric" value={draft.guestsMin} onChange={(e) => update({ guestsMin: digits(e.target.value) })} placeholder="50" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Invités maximum
                  <input inputMode="numeric" value={draft.guestsMax} onChange={(e) => update({ guestsMax: digits(e.target.value) })} placeholder="180" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Couchages sur place
                  <input inputMode="numeric" value={draft.sleeps} onChange={(e) => update({ sleeps: digits(e.target.value) })} placeholder="0" className={fieldClass} />
                  <Hint>En nombre de personnes.</Hint>
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-[12rem_1fr]">
                <label className={labelClass}>
                  Prix de départ (€)
                  <input inputMode="numeric" value={draft.priceFrom} onChange={(e) => update({ priceFrom: digits(e.target.value) })} placeholder="6500" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  <Counter value={draft.priceDetails} max={200} />
                  Ce que comprend ce prix
                  <input
                    value={draft.priceDetails}
                    maxLength={200}
                    onChange={(e) => update({ priceDetails: e.target.value })}
                    placeholder="location du samedi, hors traiteur"
                    className={fieldClass}
                  />
                </label>
              </div>
            </Section>
          ) : (
            <Section title="Tarifs">
              <label className={labelClass}>
                <Counter value={draft.priceDetails} max={200} />
                Tarif indicatif
                <input
                  value={draft.priceDetails}
                  maxLength={200}
                  onChange={(e) => update({ priceDetails: e.target.value })}
                  placeholder="Dès 1 500 € la journée"
                  className={fieldClass}
                />
                <Hint>Un ordre de prix aide les couples à vous contacter en connaissance de cause.</Hint>
              </label>
            </Section>
          )}

          <Section
            title="Photos"
            intro={`Jusqu’à ${MAX_PHOTOS} photos, la première sert de couverture. ${
              isVenue ? 'Au moins une photo est nécessaire pour publier un lieu.' : 'Vos plus belles réalisations, en format paysage de préférence.'
            }`}
          >
            {draft.photos.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {draft.photos.map((url, i) => (
                  <li key={url} className="overflow-hidden rounded-xl border border-line bg-paper">
                    <div className="relative aspect-[4/3]">
                      <Photo id={url} alt={`Photo ${i + 1}`} sizes="200px" />
                      {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-pine px-2.5 py-0.5 text-xs font-semibold text-white">Couverture</span>}
                    </div>
                    <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 px-3 py-2 text-xs">
                      {i > 0 ? (
                        <button type="button" onClick={() => makeCover(url)} className="font-semibold text-pine hover:underline">
                          Mettre en couverture
                        </button>
                      ) : (
                        <span />
                      )}
                      <button type="button" onClick={() => removePhoto(url)} className="text-muted hover:text-red-700 hover:underline">
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {draft.photos.length < MAX_PHOTOS && (
              <label
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-ink/25 px-6 py-8 text-center transition-colors hover:border-pine hover:bg-sage-soft/40 ${
                  uploading ? 'pointer-events-none opacity-60' : ''
                }`}
              >
                <span className="font-semibold text-ink">
                  {uploading ? `Envoi de la photo ${Math.min(uploading.done + 1, uploading.total)} sur ${uploading.total}…` : 'Ajouter des photos'}
                </span>
                <span className="mt-1 text-sm text-muted">JPEG, PNG ou WebP. Elles sont redimensionnées automatiquement.</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={!!uploading}
                  onChange={(e) => void onFiles(e, user)}
                  className="sr-only"
                />
              </label>
            )}
            {photoError && (
              <p role="alert" className="text-sm text-red-700">
                {photoError}
              </p>
            )}
          </Section>

          <Section title="Coordonnées" intro="Remises aux couples qui les demandent depuis votre fiche. Chaque demande est comptée dans vos statistiques.">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Téléphone
                <input type="tel" value={draft.phone} maxLength={40} onChange={(e) => update({ phone: e.target.value })} placeholder="06 12 34 56 78" className={fieldClass} />
              </label>
              <label className={labelClass}>
                Site web <span className="font-normal text-muted">(facultatif)</span>
                <input
                  inputMode="url"
                  value={draft.website}
                  maxLength={200}
                  onChange={(e) => update({ website: e.target.value })}
                  placeholder="www.votre-site.fr"
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                Instagram <span className="font-normal text-muted">(facultatif)</span>
                <input value={draft.instagram} maxLength={120} onChange={(e) => update({ instagram: e.target.value })} placeholder="@votrecompte" className={fieldClass} />
              </label>
              {!isVenue && (
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Portfolio <span className="font-normal text-muted">(facultatif)</span>
                    <input
                      inputMode="url"
                      value={draft.portfolio}
                      maxLength={200}
                      onChange={(e) => update({ portfolio: e.target.value })}
                      placeholder="www.votre-portfolio.fr"
                      className={fieldClass}
                    />
                    <Hint>Visible sur votre fiche : les couples peuvent découvrir vos réalisations avant de vous contacter.</Hint>
                  </label>
                  <PortfolioOffer
                    defaults={{
                      name: user.displayName ?? '',
                      company: draft.name,
                      category: draft.category,
                      email: user.email ?? '',
                      phone: draft.phone,
                      current: draft.portfolio || draft.website,
                    }}
                    context={{ uid: user.uid, listingId: listing?.id }}
                  />
                </div>
              )}
            </div>
          </Section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div>
            <p className="mb-2 text-sm font-semibold text-muted">Aperçu</p>
            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="aspect-[16/10] bg-sage-soft">
                {draft.photos[0] ? (
                  <Photo id={draft.photos[0]} alt="" sizes="352px" />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
                    {isVenue ? 'Votre photo de couverture' : <span className="font-display text-6xl text-pine/50">{preview.name.charAt(0)}</span>}
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-sm text-muted">
                  {isVenue ? preview.commune : category?.name ?? 'Prestataire'}
                  {isVenue ? (zoneName ? `, ${zoneName}` : '') : `, ${preview.commune}`}
                </p>
                <p className="mt-1 font-display text-[1.7rem] leading-tight text-ink">{preview.name}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">{preview.summary}</p>
                {preview.tags.length > 0 && (
                  <div className="mt-3">
                    <Tags tags={preview.tags} />
                  </div>
                )}
                {isVenue ? (
                  <KeyFigures venue={previewVenue} className="mt-4" />
                ) : (
                  draft.priceDetails && <p className="mt-3 text-sm font-semibold text-ink">{draft.priceDetails}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            {missing.length > 0 ? (
              <p className="text-[0.95rem] text-ink">
                <strong className="font-semibold">Pour publier</strong>, il manque {listFr(missing)}.
              </p>
            ) : (
              <p className="text-[0.95rem] text-ink">
                <strong className="font-semibold">Votre fiche est complète.</strong>{' '}
                {published ? 'Enregistrez pour mettre à jour la page publique.' : 'Vous pouvez la publier.'}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-3">
              <button type="button" disabled={busy || !!uploading} onClick={() => void save('published')} className="btn-primary w-full disabled:opacity-60">
                {busy ? 'Enregistrement…' : published ? 'Enregistrer les modifications' : 'Publier la fiche'}
              </button>
              <button type="button" disabled={busy || !!uploading} onClick={() => void save('draft')} className="btn-ghost w-full disabled:opacity-60">
                {published ? 'Dépublier (repasser en brouillon)' : 'Enregistrer en brouillon'}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}
            {saved && (
              <div role="status" className="mt-4 text-sm text-pine">
                {saved === 'published' ? 'Fiche publiée et visible sur le site.' : 'Brouillon enregistré : la fiche n’est pas visible sur le site.'}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {saved === 'published' && publicUrl && (
                    <Link href={publicUrl} className="link font-semibold">
                      Voir ma fiche
                    </Link>
                  )}
                  <Link href={paths.account} className="link">
                    Retour à mon compte
                  </Link>
                </div>
              </div>
            )}
            {dirty && !busy && !saved && <p className="mt-3 text-xs text-muted">Modifications non enregistrées.</p>}
          </div>
        </aside>
      </form>
    </div>
  );
}
