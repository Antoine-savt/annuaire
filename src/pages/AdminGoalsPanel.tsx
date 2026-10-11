import { useEffect, useState } from 'react';
import { ListingDoc } from '../types';
import { staticVenues } from '../data';
import { categoryLabel } from '../vendors';
import { getDb } from '../lib/firebase';
import { toListingDoc } from '../lib/listings';

/*
 * "Objectifs" tab: recruitment goals with money rewards, as two progress bars (venues, vendors).
 * The goals live in Firestore ("goals/config"), readable only by the managers and the people with
 * "goals" in the team (firestore.rules), so the amounts never appear in the site's code.
 */

interface Tier {
  /** Number of listings to reach. */
  count: number;
  /** Reward unlocked at that step, in euros. */
  reward: number;
}

interface Track {
  /** Largest number reachable (end of the bar). */
  max: number;
  tiers: Tier[];
}

interface GoalsConfig {
  /** Listings created from this day count (YYYY-MM-DD). */
  since: string;
  venues: Track;
  vendors: Track;
}

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);
const cardClass = 'rounded-2xl border border-line bg-white p-5 sm:p-6';
const fieldClass =
  'mt-1 w-full rounded-xl border-line bg-white px-3 py-2 text-[0.95rem] text-ink focus:border-pine focus:ring-pine/30';
const euros = (n: number) => `${n.toLocaleString('fr-FR')} €`;
const curatedSlugs = new Set(staticVenues.map((v) => v.slug));

function toTrack(value: unknown): Track {
  const v = (value ?? {}) as { max?: unknown; tiers?: unknown };
  const tiers = Array.isArray(v.tiers)
    ? v.tiers
        .map((t) => ({ count: Number((t as Tier).count) || 0, reward: Number((t as Tier).reward) || 0 }))
        .filter((t) => t.count > 0)
        .sort((a, b) => a.count - b.count)
    : [];
  return { max: Number(v.max) || Math.max(1, ...tiers.map((t) => t.count)), tiers };
}

/** A listing that counts towards the goals, and why. */
interface Counted {
  listing: ListingDoc;
  claim: boolean;
}

/**
 * New venues and vendors count once published from a professional account (created after "since").
 * A curated venue claimed by its owner counts as soon as the claim is accepted. Hidden or deleted
 * listings no longer count.
 */
function countedListings(listings: ListingDoc[], since: string): Counted[] {
  const from = since ? new Date(`${since}T00:00:00`).getTime() : 0;
  return listings
    .filter((l) => l.createdAt >= from && l.status !== 'hidden')
    .map((l) => ({ listing: l, claim: l.type === 'lieu' && curatedSlugs.has(l.id) }))
    .filter((c) => c.claim || c.listing.status === 'published')
    .sort((a, b) => b.listing.createdAt - a.listing.createdAt);
}

export function GoalsPanel({ canEdit, userEmail }: { canEdit: boolean; userEmail: string }) {
  const [config, setConfig] = useState<GoalsConfig | null>(null);
  const [listings, setListings] = useState<ListingDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  const load = async () => {
    setError('');
    try {
      const [db, fs] = await firestore();
      const [goals, l] = await Promise.all([fs.getDoc(fs.doc(db, 'goals', 'config')), fs.getDocs(fs.collection(db, 'listings'))]);
      const data = goals.data();
      setConfig(data ? { since: String(data.since ?? ''), venues: toTrack(data.venues), vendors: toTrack(data.vendors) } : null);
      setListings(l.docs.map((d) => toListingDoc(d.id, d.data())));
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les objectifs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  if (loading) return <p className="text-muted">Chargement des objectifs…</p>;
  if (error) return <p role="alert" className="text-red-700">{error}</p>;

  if (editing || !config) {
    return canEdit ? (
      <GoalsEditor
        initial={config ?? { since: new Date().toISOString().slice(0, 10), venues: { max: 100, tiers: [] }, vendors: { max: 100, tiers: [] } }}
        userEmail={userEmail}
        onCancel={config ? () => setEditing(false) : undefined}
        onSaved={() => {
          setEditing(false);
          void load();
        }}
      />
    ) : (
      <p className="text-muted">Aucun objectif n’est encore défini.</p>
    );
  }

  const counted = countedListings(listings, config.since);
  const venues = counted.filter((c) => c.listing.type === 'lieu');
  const vendors = counted.filter((c) => c.listing.type === 'prestataire');
  const earned = (track: Track, n: number) => track.tiers.filter((t) => t.count <= n).reduce((sum, t) => sum + t.reward, 0);
  const total = earned(config.venues, venues.length) + earned(config.vendors, vendors.length);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl">Objectifs de référencement</h2>
          <p className="mt-1 text-muted">
            Depuis le {new Date(`${config.since}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} ·{' '}
            <strong className="font-semibold text-ink">{euros(total)}</strong> de récompenses débloquées
          </p>
        </div>
        {canEdit && (
          <button type="button" onClick={() => setEditing(true)} className="btn-ghost">
            Modifier les objectifs
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <GoalBar title="Lieux de réception" unit={['lieu', 'lieux']} count={venues.length} track={config.venues} />
        <GoalBar title="Prestataires" unit={['prestataire', 'prestataires']} count={vendors.length} track={config.vendors} />
      </div>

      <p className="mt-4 max-w-3xl text-sm text-muted">
        Un nouveau lieu ou prestataire compte dès que sa fiche est publiée depuis un compte professionnel. Un lieu de
        l’annuaire revendiqué par son propriétaire compte dès que la revendication est acceptée (onglet Professionnels).
        Une fiche masquée ou supprimée ne compte plus. La barre avance par paliers : chaque intervalle a la même largeur,
        jusqu’au maximum estimé au bout de la barre.
      </p>

      <section aria-labelledby="fiches-comptees" className="mt-12">
        <h3 id="fiches-comptees" className="text-2xl">
          Fiches comptées ({counted.length})
        </h3>
        {counted.length === 0 ? (
          <p className="mt-3 text-muted">Aucune fiche pour l’instant : elles apparaîtront ici au fil des inscriptions.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {counted.map(({ listing: l, claim }) => (
              <li key={l.id} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
                <span>
                  <span className="font-semibold">{l.name}</span>{' '}
                  <span className="text-sm text-muted">
                    {l.type === 'lieu' ? 'Lieu' : categoryLabel(l.category)}, {l.commune}
                  </span>
                  {claim && <span className="ml-2 rounded-full bg-sage-soft px-2.5 py-0.5 text-xs text-pine-dark">Revendication</span>}
                </span>
                <span className="text-sm tabular-nums text-muted">{new Date(l.createdAt).toLocaleDateString('fr-FR')}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/**
 * Progress bar split into steps of equal width (one per tier, the estimated maximum at the end),
 * so the first tiers stay visible even when the maximum is far away.
 */
function GoalBar({ title, unit, count, track }: { title: string; unit: [string, string]; count: number; track: Track }) {
  const tiers = track.tiers.filter((t) => t.count <= track.max);
  const stops = tiers.map((t) => t.count);
  if (!stops.length || stops[stops.length - 1] < track.max) stops.push(track.max);

  let fill = 100;
  const step = stops.findIndex((s) => count < s);
  if (step >= 0) {
    const previous = step === 0 ? 0 : stops[step - 1];
    fill = ((step + (count - previous) / (stops[step] - previous)) / stops.length) * 100;
  }
  const position = (s: number) => ((stops.indexOf(s) + 1) / stops.length) * 100;
  const next = tiers.find((t) => t.count > count);
  const earned = tiers.filter((t) => t.count <= count).reduce((sum, t) => sum + t.reward, 0);
  const plural = (n: number) => (n > 1 ? unit[1] : unit[0]);

  return (
    <div className={cardClass}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-2xl">{title}</h3>
        <p className="text-sm text-muted">
          <span className="font-display text-3xl tabular-nums text-ink">{count}</span> / {track.max}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label={`${title} : ${count} sur ${track.max}`}
        aria-valuemin={0}
        aria-valuemax={track.max}
        aria-valuenow={count}
        className="relative mt-5 h-4 rounded-full bg-sage-soft"
      >
        <div className="h-full rounded-full bg-pine transition-[width] duration-700" style={{ width: `${Math.min(100, fill)}%` }} />
        {tiers.map((t) => (
          <span
            key={t.count}
            title={`${t.count} ${plural(t.count)} : ${euros(t.reward)}`}
            className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              count >= t.count ? 'border-pine bg-ochre' : 'border-line bg-white'
            }`}
            style={{ left: `${position(t.count)}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        <span>0</span>
        <span>{track.max} (maximum estimé)</span>
      </div>

      <p className="mt-4 text-[0.95rem]">
        {next ? (
          <>
            Encore <strong className="font-semibold">{next.count - count}</strong> {plural(next.count - count)} pour débloquer{' '}
            <strong className="font-semibold text-pine">{euros(next.reward)}</strong>.
          </>
        ) : tiers.length ? (
          <strong className="font-semibold text-pine">Tous les paliers sont atteints.</strong>
        ) : (
          'Aucun palier défini.'
        )}{' '}
        <span className="text-muted">Débloqué : {euros(earned)}.</span>
      </p>

      {tiers.length > 0 && (
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {tiers.map((t) => {
            const done = count >= t.count;
            const current = t === next;
            return (
              <li
                key={t.count}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  done ? 'bg-pine text-white' : current ? 'border border-pine bg-white' : 'bg-sage-soft/60 text-muted'
                }`}
              >
                <span>
                  {done ? '✓ ' : ''}
                  {t.count} {plural(t.count)}
                </span>
                <span className="font-semibold tabular-nums">{euros(t.reward)}</span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

const amount = (n: number) => `${n.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €`;

/** Valid tiers of a draft, in order, with the running totals. */
function cumulate(track: Track) {
  let previous = 0;
  let total = 0;
  return track.tiers
    .filter((t) => t.count > 0)
    .sort((a, b) => a.count - b.count)
    .map((t) => {
      total += t.reward;
      const added = t.count - previous;
      previous = t.count;
      return { ...t, added, total, perAdded: added > 0 ? t.reward / added : 0, perListing: total / t.count };
    });
}

/**
 * Orders of magnitude while editing (managers only): what each tier costs in total, and per extra
 * listing, so the rewards can be compared with what a listing brings in.
 */
function TierRatios({ track, unit }: { track: Track; unit: string }) {
  const rows = cumulate(track);
  if (!rows.length) return null;
  const last = rows[rows.length - 1];
  const beyond = rows.filter((r) => r.count > track.max);
  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="text-sm font-semibold">Ordres de grandeur</p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[26rem] text-sm tabular-nums">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="py-1.5 pr-2 font-semibold">Palier</th>
              <th className="py-1.5 pr-2 font-semibold">Récompense</th>
              <th className="py-1.5 pr-2 font-semibold">Cumul versé</th>
              <th className="py-1.5 pr-2 font-semibold" title="Récompense du palier ÷ fiches gagnées depuis le palier précédent">
                € / {unit} en plus
              </th>
              <th className="py-1.5 font-semibold" title="Cumul versé ÷ nombre total de fiches">
                € / {unit} en moyenne
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.count} className={r.count > track.max ? 'text-muted' : ''}>
                <td className="py-1.5 pr-2">
                  {r.count} <span className="text-muted">(+{r.added})</span>
                </td>
                <td className="py-1.5 pr-2">{amount(r.reward)}</td>
                <td className="py-1.5 pr-2 font-semibold">{amount(r.total)}</td>
                <td className="py-1.5 pr-2">{amount(r.perAdded)}</td>
                <td className="py-1.5">{amount(r.perListing)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Tous les paliers atteints : <strong className="font-semibold text-ink">{amount(last.total)}</strong> pour {last.count}{' '}
        {unit}s, soit {amount(last.perListing)} par {unit} en moyenne.
      </p>
      {beyond.length > 0 && (
        <p className="mt-1 text-sm text-ochre">
          {beyond.length > 1 ? 'Des paliers dépassent' : 'Un palier dépasse'} le maximum ({track.max}) : il{beyond.length > 1 ? 's' : ''}{' '}
          n’apparaît{beyond.length > 1 ? 'ront' : 'ra'} pas sur la barre.
        </p>
      )}
    </div>
  );
}

/** Both bars together: the most that can be paid, and the average per listing. */
function GoalsTotal({ venues, vendors }: { venues: Track; vendors: Track }) {
  const last = (t: Track) => cumulate(t).at(-1) ?? { count: 0, total: 0 };
  const v = last(venues);
  const p = last(vendors);
  const total = v.total + p.total;
  const listings = v.count + p.count;
  if (!total) return null;
  return (
    <div className="mt-5 rounded-2xl bg-sage-soft/60 px-5 py-4 text-[0.95rem]">
      <p>
        <strong className="font-semibold">Si tous les paliers sont atteints :</strong> {amount(total)} au total ({amount(v.total)} pour{' '}
        {v.count} lieux, {amount(p.total)} pour {p.count} prestataires), soit {amount(total / listings)} par fiche en moyenne.
      </p>
    </div>
  );
}

/** Form to set the start date, the maximum and the tiers of each bar (managers only). */
function GoalsEditor({
  initial,
  userEmail,
  onCancel,
  onSaved,
}: {
  initial: GoalsConfig;
  userEmail: string;
  onCancel?: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<GoalsConfig>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const updateTrack = (key: 'venues' | 'vendors', patch: Partial<Track>) => setDraft((d) => ({ ...d, [key]: { ...d[key], ...patch } }));

  const save = async () => {
    setBusy(true);
    setError('');
    const clean = (t: Track): Track => ({
      max: Math.max(1, Math.round(t.max)),
      tiers: t.tiers
        .filter((x) => x.count > 0)
        .map((x) => ({ count: Math.round(x.count), reward: Math.max(0, Math.round(x.reward)) }))
        .sort((a, b) => a.count - b.count),
    });
    try {
      const [db, fs] = await firestore();
      await fs.setDoc(fs.doc(db, 'goals', 'config'), {
        since: draft.since,
        venues: clean(draft.venues),
        vendors: clean(draft.vendors),
        updatedBy: userEmail,
        updatedAt: fs.serverTimestamp(),
      });
      onSaved();
    } catch (err) {
      console.error(err);
      setError('Les objectifs n’ont pas pu être enregistrés.');
      setBusy(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl">Modifier les objectifs</h2>
      <p className="mt-1 max-w-3xl text-muted">
        Visibles uniquement par les personnes cochées « Voit les objectifs » dans l’onglet Équipe. Chaque palier atteint
        débloque sa récompense, qui s’ajoute aux précédentes.
      </p>

      <label className="mt-6 block max-w-xs text-sm font-semibold">
        Compter les fiches créées à partir du
        <input type="date" value={draft.since} onChange={(e) => setDraft({ ...draft, since: e.target.value })} className={fieldClass} />
      </label>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {(
          [
            ['venues', 'Lieux de réception'],
            ['vendors', 'Prestataires'],
          ] as const
        ).map(([key, label]) => (
          <fieldset key={key} className={cardClass}>
            <legend className="sr-only">{label}</legend>
            <p className="text-2xl">{label}</p>
            <label className="mt-4 block text-sm font-semibold">
              Maximum estimé (bout de la barre)
              <input
                type="number"
                min={1}
                value={draft[key].max}
                onChange={(e) => updateTrack(key, { max: Number(e.target.value) })}
                className={fieldClass}
              />
            </label>
            <p className="mt-4 text-sm font-semibold">Paliers</p>
            <ul className="mt-2 space-y-2">
              {draft[key].tiers.map((t, i) => (
                <li key={i} className="flex items-end gap-2">
                  <label className="flex-1 text-xs text-muted">
                    Nombre de fiches
                    <input
                      type="number"
                      min={1}
                      value={t.count}
                      onChange={(e) =>
                        updateTrack(key, { tiers: draft[key].tiers.map((x, j) => (j === i ? { ...x, count: Number(e.target.value) } : x)) })
                      }
                      className={fieldClass}
                    />
                  </label>
                  <label className="flex-1 text-xs text-muted">
                    Récompense (€)
                    <input
                      type="number"
                      min={0}
                      value={t.reward}
                      onChange={(e) =>
                        updateTrack(key, { tiers: draft[key].tiers.map((x, j) => (j === i ? { ...x, reward: Number(e.target.value) } : x)) })
                      }
                      className={fieldClass}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => updateTrack(key, { tiers: draft[key].tiers.filter((_, j) => j !== i) })}
                    className="mb-1 rounded-full border border-line px-3 py-1.5 text-sm text-muted hover:text-red-700"
                    aria-label={`Supprimer le palier ${i + 1}`}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                const last = draft[key].tiers[draft[key].tiers.length - 1];
                updateTrack(key, { tiers: [...draft[key].tiers, { count: (last?.count ?? 0) + 5, reward: last?.reward ?? 40 }] });
              }}
              className="mt-3 text-sm font-semibold text-pine underline underline-offset-2"
            >
              Ajouter un palier
            </button>
            <TierRatios track={draft[key]} unit={key === 'venues' ? 'lieu' : 'prestataire'} />
          </fieldset>
        ))}
      </div>

      <GoalsTotal venues={draft.venues} vendors={draft.vendors} />

      {error && (
        <p role="alert" className="mt-4 text-red-700">
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => void save()} disabled={busy} className="btn-primary disabled:opacity-60">
          {busy ? 'Enregistrement…' : 'Enregistrer les objectifs'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-ghost">
            Annuler
          </button>
        )}
      </div>
    </div>
  );
}
