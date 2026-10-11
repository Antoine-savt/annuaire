import { FormEvent, ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react';
import { staticVenues, normalize } from '../data';
import { categoryLabel, vendorCategories } from '../vendors';
import { getDb } from '../lib/firebase';
import {
  CallOutcome,
  cleanFields,
  dayString,
  frenchDate,
  HistoryEntry,
  inDays,
  isActive,
  mailTemplates,
  mailtoHref,
  MailTemplate,
  OUTCOMES,
  phoneKey,
  Prospect,
  ProspectFields,
  prospectStats,
  ProspectStatus,
  ratio,
  signupLink,
  STATUSES,
  statusInfo,
  toProspect,
} from '../lib/prospects';

/*
 * "Prospection" tab: the venues and vendors to call and e-mail, what happened with each of them,
 * the e-mail to send after a call, and how many end up creating their account.
 */

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);
const cardClass = 'rounded-2xl border border-line bg-white p-5';
const fieldClass =
  'mt-1 w-full rounded-xl border-line bg-white px-3 py-2 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';
const thClass = 'px-3 py-2.5 text-left text-xs font-semibold text-muted';
const tdClass = 'px-3 py-2.5 align-top text-[0.95rem]';
const smallButton = 'rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold transition-colors hover:border-pine disabled:opacity-50';
const SIGNATURE_KEY = 'edition:signature';

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

type Filter = 'tous' | 'a_faire' | ProspectStatus;

const emptyFields = (owner: string): ProspectFields => ({
  name: '',
  contact: '',
  kind: 'lieu',
  category: 'lieu',
  commune: '',
  phone: '',
  email: '',
  website: '',
  notes: '',
  nextAction: '',
  owner,
  venueSlug: '',
});

/** Account creation date of a prospect who signed up, detected from the accounts, listings and claims. */
interface Signup {
  at: number;
  how: string;
}

export function ProspectsPanel({ userEmail }: { userEmail: string }) {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [signups, setSignups] = useState<Map<string, Signup>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<Filter>('a_faire');
  const [kind, setKind] = useState<'tous' | 'lieu' | 'prestataire'>('tous');
  const [search, setSearch] = useState('');
  const [mine, setMine] = useState(false);
  const [editing, setEditing] = useState<Prospect | 'new' | null>(null);
  const [calling, setCalling] = useState<Prospect | null>(null);
  const [mailing, setMailing] = useState<Prospect | null>(null);
  const [importing, setImporting] = useState(false);

  /** Adds a history entry (without undefined fields: Firestore refuses them). */
  const entry = (type: HistoryEntry['type'], text: string, outcome?: CallOutcome): HistoryEntry => ({
    at: Date.now(),
    by: userEmail,
    type,
    text,
    ...(outcome ? { outcome } : {}),
  });

  const save = async (p: Prospect, patch: Record<string, unknown>, history?: HistoryEntry) => {
    const [db, fs] = await firestore();
    await fs.updateDoc(fs.doc(db, 'prospects', p.id), {
      ...patch,
      ...(history ? { history: fs.arrayUnion(history) } : {}),
      updatedAt: fs.serverTimestamp(),
    });
  };

  const load = async () => {
    setError('');
    try {
      const [db, fs] = await firestore();
      const [ps, us, ls, cs] = await Promise.all([
        fs.getDocs(fs.collection(db, 'prospects')),
        fs.getDocs(fs.collection(db, 'users')),
        fs.getDocs(fs.collection(db, 'listings')),
        fs.getDocs(fs.collection(db, 'claims')),
      ]);
      const list = ps.docs.map((d) => toProspect(d.id, d.data()));
      const time = (v: unknown) => (v && typeof v === 'object' && 'toMillis' in v ? (v as { toMillis: () => number }).toMillis() : 0);

      // Who signed up: same e-mail as an account, same phone as a listing, or a claim of their venue.
      const accounts = new Map(us.docs.map((d) => [String(d.get('email') ?? '').toLowerCase(), time(d.get('createdAt'))]));
      const listingPhones = new Map(
        ls.docs.filter((d) => phoneKey(String(d.get('phone') ?? '')).length === 9).map((d) => [phoneKey(String(d.get('phone'))), time(d.get('createdAt'))]),
      );
      const claims = new Map(
        cs.docs.filter((d) => d.get('status') !== 'rejected').map((d) => [String(d.get('venueSlug') ?? ''), time(d.get('at'))]),
      );
      const found = new Map<string, Signup>();
      for (const p of list) {
        const byEmail = p.email && accounts.get(p.email.toLowerCase());
        const byPhone = phoneKey(p.phone).length === 9 && listingPhones.get(phoneKey(p.phone));
        const byClaim = p.venueSlug && claims.get(p.venueSlug);
        if (byEmail) found.set(p.id, { at: byEmail, how: 'compte créé avec son e-mail' });
        else if (byPhone) found.set(p.id, { at: byPhone, how: 'fiche publiée avec son téléphone' });
        else if (byClaim) found.set(p.id, { at: byClaim, how: 'revendication de sa fiche' });
      }

      // Newly detected sign-ups are saved, so every admin sees them.
      const detected = list.filter((p) => found.has(p.id) && p.status !== 'inscrit');
      await Promise.all(
        detected.map((p) => {
          const h = entry('statut', `Inscription détectée : ${found.get(p.id)!.how}`);
          p.status = 'inscrit';
          p.nextAction = '';
          p.history = [...p.history, h];
          return save(p, { status: 'inscrit', nextAction: '' }, h).catch((err) => console.warn('Inscription non enregistrée', err));
        }),
      );

      setProspects(list);
      setSignups(found);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger la prospection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try {
      await action();
      await load();
    } catch (err) {
      console.error(err);
      setError(`L’action a échoué : ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setBusy(false);
    }
  };

  const today = dayString();
  const isDue = (p: Prospect) =>
    isActive(p.status) && ((p.nextAction !== '' && p.nextAction <= today) || p.status === 'mail_a_envoyer' || (p.status === 'a_appeler' && !p.nextAction));

  const stats = useMemo(
    () => prospectStats(prospects, new Map([...signups].map(([id, s]) => [id, s.at]))),
    [prospects, signups],
  );

  const visible = useMemo(() => {
    const q = normalize(search.trim());
    return prospects
      .filter((p) => (filter === 'tous' ? true : filter === 'a_faire' ? isDue(p) : p.status === filter))
      .filter((p) => kind === 'tous' || p.kind === kind)
      .filter((p) => !mine || (p.owner || p.createdBy) === userEmail)
      .filter((p) => !q || normalize(`${p.name} ${p.contact} ${p.commune} ${p.email} ${p.phone} ${categoryLabel(p.category)}`).includes(q))
      .sort((a, b) => {
        // Work to do first, by date (undated at the end), then the rest by last update.
        const activeA = isActive(a.status) ? 0 : 1;
        const activeB = isActive(b.status) ? 0 : 1;
        if (activeA !== activeB) return activeA - activeB;
        const da = a.nextAction || '9999';
        const db = b.nextAction || '9999';
        return da !== db ? da.localeCompare(db) : b.updatedAt - a.updatedAt;
      });
  }, [prospects, filter, kind, mine, search, userEmail, today]);

  const counts = (f: Filter) =>
    prospects.filter((p) => (f === 'tous' ? true : f === 'a_faire' ? isDue(p) : p.status === f)).length;

  const prospectSlugs = new Set(prospects.map((p) => p.venueSlug).filter(Boolean));
  const missingCurated = staticVenues.filter((v) => !prospectSlugs.has(v.slug));

  const importCurated = () => {
    if (!window.confirm(`Ajouter les ${missingCurated.length} lieux de l’annuaire d’origine, à appeler pour qu’ils revendiquent leur fiche ?`)) return;
    void run(async () => {
      const [db, fs] = await firestore();
      const batch = fs.writeBatch(db);
      for (const v of missingCurated) {
        batch.set(fs.doc(fs.collection(db, 'prospects')), {
          ...cleanFields({
            ...emptyFields(userEmail),
            name: v.nom_du_lieu,
            commune: v.commune,
            phone: v.contact,
            website: v.site_web_officiel,
            venueSlug: v.slug,
          }),
          status: 'a_appeler',
          calls: 0,
          reached: false,
          emails: 0,
          history: [entry('creation', 'Ajouté depuis l’annuaire d’origine (à faire revendiquer)')],
          createdBy: userEmail,
          createdAt: fs.serverTimestamp(),
          updatedAt: fs.serverTimestamp(),
        });
      }
      await batch.commit();
    });
  };

  const exportCsv = () => {
    const rows = [
      ['Nom', 'Contact', 'Type', 'Ville', 'Téléphone', 'E-mail', 'Site', 'Statut', 'Prochaine action', 'Appels', 'Mails', 'Suivi par', 'Notes'],
      ...visible.map((p) => [
        p.name,
        p.contact,
        p.kind === 'lieu' ? 'Lieu' : categoryLabel(p.category),
        p.commune,
        p.phone,
        p.email,
        p.website,
        statusInfo(p.status).label,
        p.nextAction,
        p.calls,
        p.emails,
        p.owner || p.createdBy,
        p.notes,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prospection.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-muted">Chargement de la prospection…</p>;

  const due = prospects.filter(isDue).sort((a, b) => (a.nextAction || '9999').localeCompare(b.nextAction || '9999'));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl">Prospection</h2>
          <p className="mt-1 max-w-2xl text-muted">
            Les lieux et prestataires à appeler, le mail à leur envoyer, et qui s’inscrit. Une inscription est détectée
            toute seule (même e-mail qu’un compte, même téléphone qu’une fiche, ou revendication de leur lieu).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setEditing('new')} className="btn-primary !px-5 !py-2.5 text-sm">
            Ajouter un prospect
          </button>
          <button type="button" onClick={() => setImporting(true)} className="btn-ghost !px-5 !py-2.5 text-sm">
            Importer une liste
          </button>
          <button type="button" onClick={exportCsv} className="btn-ghost !px-5 !py-2.5 text-sm">
            Exporter en CSV
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-red-700">
          {error}
        </p>
      )}

      <StatsBlock stats={stats} />

      {missingCurated.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-pine/30 bg-sage-soft px-5 py-4">
          <p className="text-[0.95rem]">
            <strong className="font-semibold">Premiers appels faciles :</strong> {missingCurated.length} lieux de l’annuaire
            d’origine ont déjà une fiche. Leurs propriétaires n’ont qu’à la revendiquer.
          </p>
          <button type="button" disabled={busy} onClick={importCurated} className="btn-primary !py-2 text-sm disabled:opacity-60">
            Les ajouter à appeler
          </button>
        </div>
      )}

      {due.length > 0 && (
        <section aria-labelledby="a-faire" className="mt-8">
          <h3 id="a-faire" className="text-2xl">
            À faire aujourd’hui ({due.length})
          </h3>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {due.slice(0, 8).map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3">
                <span className="min-w-0">
                  <button type="button" onClick={() => setEditing(p)} className="block truncate text-left font-semibold hover:underline">
                    {p.name}
                  </button>
                  <span className="text-sm text-muted">
                    {statusInfo(p.status).label}
                    {p.nextAction && (
                      <span className={p.nextAction < today ? 'font-semibold text-red-700' : ''}>
                        {' '}
                        · {p.nextAction < today ? 'en retard depuis ' : ''}
                        {frenchDate(p.nextAction)}
                      </span>
                    )}
                  </span>
                </span>
                {p.status === 'mail_a_envoyer' ? (
                  <button type="button" onClick={() => setMailing(p)} className={smallButton}>
                    Envoyer le mail
                  </button>
                ) : (
                  <button type="button" onClick={() => setCalling(p)} className={smallButton}>
                    Appeler
                  </button>
                )}
              </li>
            ))}
          </ul>
          {due.length > 8 && (
            <button type="button" onClick={() => setFilter('a_faire')} className="mt-2 text-sm font-semibold text-pine underline underline-offset-2">
              Voir les {due.length} dans le tableau
            </button>
          )}
        </section>
      )}

      <section aria-labelledby="prospects" className="mt-10">
        <h3 id="prospects" className="sr-only">
          Tous les prospects
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un nom, une ville, un numéro…"
            aria-label="Rechercher"
            className="w-full max-w-xs rounded-xl border-line bg-white px-3 py-2 text-[0.95rem] focus:border-pine focus:ring-pine/30"
          />
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
            aria-label="Type"
            className="rounded-xl border-line bg-white py-2 pl-3 text-[0.95rem] focus:border-pine focus:ring-pine/30"
          >
            <option value="tous">Lieux et prestataires</option>
            <option value="lieu">Lieux</option>
            <option value="prestataire">Prestataires</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} className="h-4 w-4 rounded border-ink/30 text-pine focus:ring-pine/40" />
            Seulement les miens
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrer par statut">
          {(['a_faire', 'tous', ...STATUSES.map((s) => s.key)] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                filter === f ? 'border-pine bg-pine text-white' : 'border-line bg-white text-ink hover:border-pine'
              }`}
            >
              {f === 'tous' ? 'Tous' : f === 'a_faire' ? 'À faire' : statusInfo(f).label} ({counts(f)})
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-6 text-muted">
            {prospects.length === 0 ? 'Aucun prospect pour l’instant : ajoutez-en un, ou importez une liste.' : 'Aucun prospect pour ce filtre.'}
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[60rem]">
              <thead className="border-b border-line">
                <tr>
                  <th className={thClass}>Prospect</th>
                  <th className={thClass}>Coordonnées</th>
                  <th className={thClass}>Statut</th>
                  <th className={thClass}>Prochaine action</th>
                  <th className={thClass}>Suivi</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((p) => {
                  const late = isActive(p.status) && p.nextAction && p.nextAction < today;
                  return (
                    <tr key={p.id} className="hover:bg-sage-soft/40">
                      <td className={tdClass}>
                        <button type="button" onClick={() => setEditing(p)} className="text-left font-semibold hover:underline">
                          {p.name}
                        </button>
                        <span className="block text-sm text-muted">
                          {p.kind === 'lieu' ? (p.venueSlug ? 'Lieu de l’annuaire' : 'Lieu') : categoryLabel(p.category)}
                          {p.commune ? `, ${p.commune}` : ''}
                          {p.contact ? ` · ${p.contact}` : ''}
                        </span>
                      </td>
                      <td className={tdClass}>
                        {p.phone && (
                          <a href={telHref(p.phone)} className="link block whitespace-nowrap">
                            {p.phone}
                          </a>
                        )}
                        {p.email && <span className="block max-w-[14rem] truncate text-sm text-muted">{p.email}</span>}
                      </td>
                      <td className={tdClass}>
                        <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo(p.status).className}`}>
                          {statusInfo(p.status).label}
                        </span>
                      </td>
                      <td className={`${tdClass} whitespace-nowrap`}>
                        {p.nextAction ? <span className={late ? 'font-semibold text-red-700' : ''}>{frenchDate(p.nextAction)}</span> : <span className="text-muted">–</span>}
                      </td>
                      <td className={`${tdClass} whitespace-nowrap text-sm text-muted`}>
                        {p.calls} appel{p.calls > 1 ? 's' : ''}, {p.emails} mail{p.emails > 1 ? 's' : ''}
                      </td>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setCalling(p)} className={smallButton}>
                            Appel
                          </button>
                          <button type="button" onClick={() => setMailing(p)} className={smallButton}>
                            Mail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing && (
        <ProspectDialog
          prospect={editing === 'new' ? null : editing}
          all={prospects}
          userEmail={userEmail}
          signup={editing !== 'new' ? signups.get(editing.id) : undefined}
          entry={entry}
          onClose={() => setEditing(null)}
          onDone={() => {
            setEditing(null);
            void load();
          }}
        />
      )}
      {calling && (
        <CallDialog
          prospect={calling}
          onClose={() => setCalling(null)}
          onSave={(outcome, note, next) =>
            run(async () => {
              const o = OUTCOMES.find((x) => x.key === outcome)!;
              const p = calling;
              await save(
                p,
                {
                  status: p.status === 'inscrit' ? 'inscrit' : o.status,
                  calls: p.calls + 1,
                  reached: p.reached || o.reached,
                  nextAction: next,
                  ...(note ? { notes: `${p.notes ? `${p.notes}\n` : ''}${frenchDate(today)} : ${note}`.slice(-4000) } : {}),
                },
                entry('appel', `${o.label}${note ? `. ${note}` : ''}`, outcome),
              );
              setCalling(null);
              // Interested: the e-mail with the sign-up link is next.
              if (outcome === 'interesse') setMailing({ ...p, status: 'mail_a_envoyer', calls: p.calls + 1, reached: true });
            })
          }
        />
      )}
      {mailing && (
        <MailDialog
          prospect={mailing}
          onClose={() => setMailing(null)}
          onSent={(template, email) =>
            run(async () => {
              const p = mailing;
              await save(
                p,
                {
                  status: p.status === 'inscrit' ? 'inscrit' : 'mail_envoye',
                  emails: p.emails + 1,
                  email,
                  // A reminder in 5 days if they have not signed up by then.
                  nextAction: p.status === 'inscrit' ? '' : inDays(5),
                },
                entry('mail', `Mail « ${template.label} » envoyé à ${email}`),
              );
              setMailing(null);
            })
          }
        />
      )}
      {importing && (
        <ImportDialog
          all={prospects}
          onClose={() => setImporting(false)}
          onImport={(rows) =>
            run(async () => {
              const [db, fs] = await firestore();
              for (let i = 0; i < rows.length; i += 400) {
                const batch = fs.writeBatch(db);
                for (const f of rows.slice(i, i + 400)) {
                  batch.set(fs.doc(fs.collection(db, 'prospects')), {
                    ...cleanFields({ ...f, owner: userEmail }),
                    status: 'a_appeler',
                    calls: 0,
                    reached: false,
                    emails: 0,
                    history: [entry('creation', 'Importé depuis une liste')],
                    createdBy: userEmail,
                    createdAt: fs.serverTimestamp(),
                    updatedAt: fs.serverTimestamp(),
                  });
                }
                await batch.commit();
              }
              setImporting(false);
            })
          }
        />
      )}
    </div>
  );
}

function Stat({ label, value, hint, strong = false }: { label: string; value: ReactNode; hint?: ReactNode; strong?: boolean }) {
  return (
    <div className={`${cardClass} ${strong ? 'border-pine' : ''}`}>
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className={`mt-1 font-display text-3xl tabular-nums ${strong ? 'text-pine' : ''}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function StatsBlock({ stats: s }: { stats: ReturnType<typeof prospectStats> }) {
  const peak = Math.max(1, ...s.days.map((d) => d.calls + d.mails));
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Prospects" value={s.total} hint={`${s.toCall} à appeler${s.late ? `, ${s.late} en retard` : ''}`} />
        <Stat label="Appels passés" value={s.calls} hint={`${s.callsThisWeek} ces 7 derniers jours`} />
        <Stat label="Personnes jointes" value={s.reached} hint={`${ratio(s.reached, s.called)} des ${s.called} appelées`} />
        <Stat
          label="Intéressées"
          value={s.interested}
          hint={`${ratio(s.interested, s.reached)} des personnes jointes, ${s.refused} refus`}
        />
        <Stat label="Mails envoyés" value={s.emailed} hint={`${s.toEmail} à envoyer`} />
        <Stat label="Inscrits" value={s.signedUp} strong hint={`taux de retour : ${ratio(s.signedUp, s.emailed)} des mails`} />
        <Stat label="Conversion" value={ratio(s.signedUp, s.called)} hint="des personnes appelées s’inscrivent" />
        <Stat
          label="Délai d’inscription"
          value={s.daysToSignup === null ? '–' : `${s.daysToSignup.toLocaleString('fr-FR')} j`}
          hint="en moyenne, après le 1er appel"
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className={cardClass}>
          <p className="text-xs font-semibold text-muted">Activité des 14 derniers jours</p>
          <div className="mt-3 flex h-24 items-end gap-1" aria-hidden>
            {s.days.map((d) => (
              <div key={d.day} className="flex h-full flex-1 flex-col justify-end" title={`${frenchDate(d.day)} : ${d.calls} appel(s), ${d.mails} mail(s)`}>
                <div className="rounded-t-sm bg-ochre" style={{ height: `${(d.mails / peak) * 100}%` }} />
                <div className={`bg-pine ${d.mails ? '' : 'rounded-t-sm'}`} style={{ height: `${(d.calls / peak) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>{frenchDate(s.days[0].day)}</span>
            <span className="flex gap-3">
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-pine" />
                appels
              </span>
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-ochre" />
                mails
              </span>
            </span>
            <span>aujourd’hui</span>
          </div>
          <p className="sr-only">
            {s.days.map((d) => `${frenchDate(d.day)} : ${d.calls} appels, ${d.mails} mails`).join('. ')}
          </p>
        </div>
        <div className={cardClass}>
          <p className="text-xs font-semibold text-muted">Par personne</p>
          {s.byAdmin.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Les appels et mails apparaîtront ici.</p>
          ) : (
            <table className="mt-2 w-full text-sm tabular-nums">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="py-1 font-semibold">Qui</th>
                  <th className="py-1 font-semibold">Appels</th>
                  <th className="py-1 font-semibold">Mails</th>
                  <th className="py-1 font-semibold">Inscrits</th>
                </tr>
              </thead>
              <tbody>
                {s.byAdmin.map((a) => (
                  <tr key={a.email}>
                    <td className="max-w-[9rem] truncate py-1" title={a.email}>
                      {a.email.split('@')[0]}
                    </td>
                    <td className="py-1">{a.calls}</td>
                    <td className="py-1">{a.mails}</td>
                    <td className="py-1">{a.signedUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

/** Native modal dialog, closed with Escape, the backdrop or the "Fermer" button. */
function Modal({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: ReactNode }) {
  const ids = useId();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={`${ids}-title`}
      className="m-auto w-[min(42rem,calc(100vw-2rem))] rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
            <h2 id={`${ids}-title`} className="mt-0.5 text-[1.7rem] leading-tight">
              {title}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink">
            Fermer
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

type Identity = Pick<Prospect, 'name' | 'commune' | 'phone' | 'email'>;

/** Same business already in the list (phone, e-mail or name and town). */
function findDuplicate<T extends Identity & { id: string }>(f: Identity, all: T[], self?: string): T | undefined {
  const phone = phoneKey(f.phone);
  const email = f.email.trim().toLowerCase();
  const name = normalize(`${f.name} ${f.commune}`.trim());
  return all.find(
    (p) =>
      p.id !== self &&
      ((phone.length === 9 && phoneKey(p.phone) === phone) ||
        (email && p.email.toLowerCase() === email) ||
        (f.name.trim() && normalize(`${p.name} ${p.commune}`.trim()) === name)),
  );
}

function ProspectDialog({
  prospect,
  all,
  userEmail,
  signup,
  entry,
  onClose,
  onDone,
}: {
  prospect: Prospect | null;
  all: Prospect[];
  userEmail: string;
  signup?: Signup;
  entry: (type: HistoryEntry['type'], text: string) => HistoryEntry;
  onClose: () => void;
  onDone: () => void;
}) {
  const [f, setF] = useState<ProspectFields>(() => (prospect ? { ...prospect } : emptyFields(userEmail)));
  const [status, setStatus] = useState<ProspectStatus>(prospect?.status ?? 'a_appeler');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const update = (patch: Partial<ProspectFields>) => setF((x) => ({ ...x, ...patch }));
  const duplicate = findDuplicate(f, all, prospect?.id);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const [db, fs] = await firestore();
      const fields = cleanFields(f);
      if (prospect) {
        const changed = status !== prospect.status;
        await fs.updateDoc(fs.doc(db, 'prospects', prospect.id), {
          ...fields,
          status,
          ...(changed ? { history: fs.arrayUnion(entry('statut', `Statut : ${statusInfo(status).label}`)) } : {}),
          updatedAt: fs.serverTimestamp(),
        });
      } else {
        await fs.addDoc(fs.collection(db, 'prospects'), {
          ...fields,
          status: 'a_appeler',
          calls: 0,
          reached: false,
          emails: 0,
          history: [entry('creation', 'Ajouté')],
          createdBy: userEmail,
          createdAt: fs.serverTimestamp(),
          updatedAt: fs.serverTimestamp(),
        });
      }
      onDone();
    } catch (err) {
      console.error(err);
      setError('Le prospect n’a pas pu être enregistré.');
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!prospect || !window.confirm(`Supprimer « ${prospect.name} » et son historique ?`)) return;
    setBusy(true);
    try {
      const [db, fs] = await firestore();
      await fs.deleteDoc(fs.doc(db, 'prospects', prospect.id));
      onDone();
    } catch (err) {
      console.error(err);
      setError('Le prospect n’a pas pu être supprimé.');
      setBusy(false);
    }
  };

  return (
    <Modal title={prospect ? prospect.name || 'Prospect' : 'Ajouter un prospect'} subtitle={prospect ? statusInfo(prospect.status).label : 'Prospection'} onClose={onClose}>
      {signup && (
        <p className="mt-4 rounded-xl bg-sage-soft px-4 py-3 text-[0.95rem]">
          <strong className="font-semibold">Inscrit</strong> le {new Date(signup.at).toLocaleDateString('fr-FR')} ({signup.how}).
        </p>
      )}
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="flex flex-wrap gap-4 text-[0.95rem]" role="radiogroup" aria-label="Type">
          {(['lieu', 'prestataire'] as const).map((k) => (
            <label key={k} className="flex items-center gap-2">
              <input
                type="radio"
                name="kind"
                checked={f.kind === k}
                onChange={() => update({ kind: k, category: k === 'lieu' ? 'lieu' : vendorCategories[0].slug, venueSlug: '' })}
                className="text-pine focus:ring-pine/40"
              />
              {k === 'lieu' ? 'Lieu de réception' : 'Prestataire'}
            </label>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {f.kind === 'prestataire' ? (
            <label className={labelClass}>
              Métier
              <select value={f.category} onChange={(e) => update({ category: e.target.value })} className={fieldClass}>
                {vendorCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className={labelClass}>
              Déjà dans l’annuaire ?
              <select
                value={f.venueSlug}
                onChange={(e) => {
                  const v = staticVenues.find((x) => x.slug === e.target.value);
                  update(v ? { venueSlug: v.slug, name: f.name || v.nom_du_lieu, commune: f.commune || v.commune, phone: f.phone || v.contact } : { venueSlug: '' });
                }}
                className={fieldClass}
              >
                <option value="">Non, nouveau lieu</option>
                {staticVenues.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    Oui : {v.nom_du_lieu}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className={labelClass}>
            Nom {f.kind === 'lieu' ? 'du lieu' : 'de l’entreprise'}
            <input required maxLength={120} value={f.name} onChange={(e) => update({ name: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Personne à contacter
            <input maxLength={120} value={f.contact} onChange={(e) => update({ contact: e.target.value })} placeholder="Prénom Nom, fonction" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Ville
            <input maxLength={80} value={f.commune} onChange={(e) => update({ commune: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Téléphone
            <input type="tel" maxLength={40} value={f.phone} onChange={(e) => update({ phone: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            E-mail
            <input type="email" maxLength={200} value={f.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Site ou Instagram
            <input maxLength={200} value={f.website} onChange={(e) => update({ website: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Prochaine action le
            <input type="date" value={f.nextAction} onChange={(e) => update({ nextAction: e.target.value })} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Suivi par
            <input type="email" maxLength={200} value={f.owner} onChange={(e) => update({ owner: e.target.value })} className={fieldClass} />
          </label>
          {prospect && (
            <label className={labelClass}>
              Statut
              <select value={status} onChange={(e) => setStatus(e.target.value as ProspectStatus)} className={fieldClass}>
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <label className={labelClass}>
          Notes
          <textarea rows={4} maxLength={4000} value={f.notes} onChange={(e) => update({ notes: e.target.value })} className={`${fieldClass} resize-y`} />
        </label>
        {duplicate && (
          <p className="text-sm text-ochre">
            Déjà dans la liste : <strong className="font-semibold">{duplicate.name}</strong> ({statusInfo(duplicate.status).label}).
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="submit" disabled={busy} className="btn-primary disabled:opacity-60">
            {busy ? 'Enregistrement…' : prospect ? 'Enregistrer' : 'Ajouter'}
          </button>
          {prospect && (
            <button type="button" disabled={busy} onClick={() => void remove()} className="text-sm text-muted hover:text-red-700 hover:underline">
              Supprimer ce prospect
            </button>
          )}
        </div>
      </form>

      {prospect && prospect.history.length > 0 && (
        <section className="mt-8 border-t border-line pt-5">
          <h3 className="font-sans text-base font-semibold">Historique</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {[...prospect.history].reverse().map((h, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-24 shrink-0 tabular-nums text-muted">{new Date(h.at).toLocaleDateString('fr-FR')}</span>
                <span>
                  {h.text} <span className="text-muted">({h.by.split('@')[0]})</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </Modal>
  );
}

function CallDialog({
  prospect: p,
  onClose,
  onSave,
}: {
  prospect: Prospect;
  onClose: () => void;
  onSave: (outcome: CallOutcome, note: string, next: string) => Promise<void>;
}) {
  const [outcome, setOutcome] = useState<CallOutcome | ''>('');
  const [note, setNote] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);

  const choose = (key: CallOutcome) => {
    setOutcome(key);
    const days = OUTCOMES.find((o) => o.key === key)!.nextInDays;
    setNext(days === null ? '' : inDays(days));
  };

  return (
    <Modal title={p.name} subtitle={p.kind === 'lieu' ? (p.venueSlug ? 'Lieu de l’annuaire : à faire revendiquer' : 'Lieu de réception') : categoryLabel(p.category)} onClose={onClose}>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {p.phone ? (
          <a href={telHref(p.phone)} className="font-display text-3xl text-pine hover:underline">
            {p.phone}
          </a>
        ) : (
          <span className="text-muted">Pas de numéro : ajoutez-le dans la fiche du prospect.</span>
        )}
        {p.contact && <span className="text-muted">Demander {p.contact}</span>}
      </div>
      {p.notes && <p className="mt-3 whitespace-pre-line rounded-xl bg-white px-4 py-3 text-sm text-ink/85">{p.notes}</p>}

      <details className="mt-4 rounded-xl border border-line bg-white px-4 py-3 text-sm">
        <summary className="cursor-pointer font-semibold">Pense-bête pour l’appel</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/85">
          <li>Présentez L’Édition : le guide des lieux et prestataires de mariage du Var, consulté par les couples.</li>
          {p.venueSlug ? (
            <li>Leur lieu a déjà une fiche : ils n’ont qu’à la revendiquer pour la compléter (photos, tarifs).</li>
          ) : (
            <li>La fiche se crée en quelques minutes depuis un compte, avec photos, capacités et tarifs.</li>
          )}
          <li>Gratuit pendant le lancement ; ils voient combien de couples consultent leur fiche et demandent leurs coordonnées.</li>
          {p.kind === 'prestataire' && <li>Pas de portfolio ? L’Édition peut le créer, à tarif réduit.</li>}
          <li>Demandez l’adresse e-mail pour envoyer le lien d’inscription.</li>
        </ul>
      </details>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold">Comment s’est passé l’appel ?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {OUTCOMES.map((o) => (
            <label
              key={o.key}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-[0.95rem] ${
                outcome === o.key ? 'border-pine bg-sage-soft' : 'border-line bg-white hover:border-pine'
              }`}
            >
              <input type="radio" name="outcome" checked={outcome === o.key} onChange={() => choose(o.key)} className="text-pine focus:ring-pine/40" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_12rem]">
        <label className={labelClass}>
          Note <span className="font-normal text-muted">(facultatif)</span>
          <input value={note} maxLength={300} onChange={(e) => setNote(e.target.value)} placeholder="Ex. rappeler après 17 h, voir avec la gérante" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Prochaine action le
          <input type="date" value={next} onChange={(e) => setNext(e.target.value)} className={fieldClass} />
        </label>
      </div>
      <button
        type="button"
        disabled={!outcome || busy}
        onClick={() => {
          setBusy(true);
          void onSave(outcome as CallOutcome, note.trim(), next).finally(() => setBusy(false));
        }}
        className="btn-primary mt-6 disabled:opacity-50"
      >
        {busy ? 'Enregistrement…' : outcome === 'interesse' ? 'Enregistrer et préparer le mail' : 'Enregistrer l’appel'}
      </button>
    </Modal>
  );
}

function readSignature(): string {
  try {
    return window.localStorage.getItem(SIGNATURE_KEY) ?? '';
  } catch {
    return '';
  }
}

function MailDialog({
  prospect: p,
  onClose,
  onSent,
}: {
  prospect: Prospect;
  onClose: () => void;
  onSent: (template: MailTemplate, email: string) => Promise<void>;
}) {
  const [signature, setSignature] = useState(readSignature);
  const [key, setKey] = useState<MailTemplate['key']>(p.emails > 0 ? 'relance' : p.calls > 0 ? 'apres_appel' : 'premier_contact');
  const templates = mailTemplates(p, signature);
  const template = templates.find((t) => t.key === key)!;
  const [email, setEmail] = useState(p.email);
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [copied, setCopied] = useState('');
  const [busy, setBusy] = useState(false);

  // A new template or signature rewrites the text (edits made to the previous one are dropped).
  useEffect(() => {
    setSubject(template.subject);
    setBody(template.body);
  }, [key, signature]);

  const saveSignature = (value: string) => {
    setSignature(value);
    try {
      window.localStorage.setItem(SIGNATURE_KEY, value);
    } catch {
      /* private browsing: the signature is simply not remembered */
    }
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      window.setTimeout(() => setCopied(''), 2000);
    } catch {
      setCopied('Copie impossible : sélectionnez le texte.');
    }
  };

  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  return (
    <Modal title={`Mail à ${p.name}`} subtitle={p.contact || 'Prospection'} onClose={onClose}>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Modèle">
        {templates.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={key === t.key}
            onClick={() => setKey(t.key)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              key === t.key ? 'border-pine bg-pine text-white' : 'border-line bg-white text-ink hover:border-pine'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          À
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresse@exemple.fr" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Votre signature
          <input value={signature} onChange={(e) => saveSignature(e.target.value)} placeholder="Henri Savoyant, L’Édition, 06…" className={fieldClass} />
        </label>
      </div>
      <label className={`${labelClass} mt-4`}>
        Objet
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className={fieldClass} />
      </label>
      <label className={`${labelClass} mt-4`}>
        Message
        <textarea rows={14} value={body} onChange={(e) => setBody(e.target.value)} className={`${fieldClass} resize-y font-sans text-[0.92rem] leading-relaxed`} />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={validEmail ? mailtoHref(email.trim(), subject, body) : undefined}
          aria-disabled={!validEmail}
          className={`btn-primary !py-2.5 text-sm ${validEmail ? '' : 'pointer-events-none opacity-50'}`}
        >
          Ouvrir dans ma messagerie
        </a>
        <button type="button" onClick={() => void copy(`${subject}\n\n${body}`, 'Mail copié')} className="btn-ghost !py-2.5 text-sm">
          Copier le mail
        </button>
        <button type="button" onClick={() => void copy(signupLink(p), 'Lien copié')} className="btn-ghost !py-2.5 text-sm">
          Copier le lien d’inscription
        </button>
        {copied && (
          <span role="status" className="text-sm text-pine">
            {copied}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button
          type="button"
          disabled={!validEmail || busy}
          onClick={() => {
            setBusy(true);
            void onSent(template, email.trim().toLowerCase()).finally(() => setBusy(false));
          }}
          className="btn-primary disabled:opacity-50"
        >
          {busy ? 'Enregistrement…' : 'J’ai envoyé le mail'}
        </button>
        <span className="text-sm text-muted">Passe le prospect en « Mail envoyé », avec une relance prévue dans 5 jours.</span>
      </div>
    </Modal>
  );
}

/** One prospect per line: "Nom ; Téléphone ; E-mail ; Ville ; Contact" (tabs from a spreadsheet work too). */
function parseLines(text: string, kind: 'lieu' | 'prestataire', category: string): ProspectFields[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.split(/\t|;/).map((c) => c.trim()))
    .filter((cells) => cells[0])
    .map(([name, phone = '', email = '', commune = '', contact = '']) => ({
      ...emptyFields(''),
      kind,
      category: kind === 'lieu' ? 'lieu' : category,
      name,
      phone,
      email: /@/.test(email) ? email : '',
      commune,
      contact,
    }));
}

function ImportDialog({ all, onClose, onImport }: { all: Prospect[]; onClose: () => void; onImport: (rows: ProspectFields[]) => Promise<void> }) {
  const [kind, setKind] = useState<'lieu' | 'prestataire'>('lieu');
  const [category, setCategory] = useState(vendorCategories[0].slug);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const rows = parseLines(text, kind, category);
  const fresh: ProspectFields[] = [];
  for (const r of rows) {
    // Skip the ones already in the list, and repeated lines.
    if (!findDuplicate(r, all) && !findDuplicate(r, fresh.map((x, i) => ({ ...x, id: String(i) })))) fresh.push(r);
  }

  return (
    <Modal title="Importer une liste" subtitle="Prospection" onClose={onClose}>
      <p className="mt-3 text-[0.95rem] text-muted">
        Collez une ligne par prospect, dans cet ordre : <strong className="font-semibold text-ink">Nom ; Téléphone ; E-mail ; Ville ; Contact</strong>.
        Seul le nom est obligatoire. Un copier-coller depuis un tableur fonctionne aussi. Les doublons sont ignorés.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label className={labelClass}>
          Type
          <select value={kind} onChange={(e) => setKind(e.target.value as 'lieu' | 'prestataire')} className={fieldClass}>
            <option value="lieu">Lieux de réception</option>
            <option value="prestataire">Prestataires</option>
          </select>
        </label>
        {kind === 'prestataire' && (
          <label className={labelClass}>
            Métier
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
              {vendorCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'Domaine des Oliviers ; 04 94 00 00 00 ; contact@domaine.fr ; Lorgues ; Marie Durand\nStudio Lumière ; 06 00 00 00 00'}
        aria-label="Liste à importer"
        className={`${fieldClass} mt-4 resize-y font-mono text-sm`}
      />
      <p className="mt-2 text-sm text-muted">
        {rows.length} ligne{rows.length > 1 ? 's' : ''} : {fresh.length} nouveau{fresh.length > 1 ? 'x' : ''}
        {rows.length - fresh.length > 0 ? `, ${rows.length - fresh.length} déjà dans la liste` : ''}.
      </p>
      <button
        type="button"
        disabled={!fresh.length || busy}
        onClick={() => {
          setBusy(true);
          void onImport(fresh).finally(() => setBusy(false));
        }}
        className="btn-primary mt-5 disabled:opacity-50"
      >
        {busy ? 'Import…' : `Importer ${fresh.length} prospect${fresh.length > 1 ? 's' : ''}`}
      </button>
    </Modal>
  );
}
