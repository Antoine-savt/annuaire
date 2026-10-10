import { useEffect, useMemo, useState } from 'react';
import { venues } from '../data';
import { firebaseConfigured, getDb } from '../lib/firebase';
import { signInWithGoogle, signOutUser, useAuthUser } from '../lib/auth';
import { Link } from '../router';
import { paths } from '../routes';
import { ProsPanel } from './AdminProsPanel';
import { site } from '../site';
import { categoryLabel, vendorCategories } from '../vendors';
import { findVendorById, vendorId, vendors } from '../vendorListings';

interface EventRow {
  type: string;
  venue: string;
  session: string;
  referrer: string;
  at: Date;
}

interface SubmissionRow {
  id: string;
  /** "lieu" or a vendor category slug. */
  category: string;
  kind: string;
  name: string;
  commune: string;
  zone?: string;
  subtype?: string;
  capacity?: number;
  sleeps?: number;
  priceFrom?: string;
  website?: string;
  instagram?: string;
  contactName: string;
  role?: string;
  email: string;
  phone: string;
  message?: string;
  at: Date;
}

interface LeadRow {
  id: string;
  venue: string;
  firstName: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  guests?: number;
  at: Date;
}

interface VenueStats {
  slug: string;
  name: string;
  /** People who opened the listing page or saved it from a list, counted once per session. */
  visitors: number;
  opens: number;
  leads: number;
  phoneClicks: number;
  websiteClicks: number;
  /** Times couples added the listing to their saved selection. */
  saves: number;
}

/**
 * Only accounts listed in the Firestore "admins" collection can open the dashboard (firestore.rules
 * refuses everyone else). Keep it true now that professionals have accounts.
 */
const REQUIRE_SIGN_IN = true;

const PERIODS = [
  { days: 30, label: '30 derniers jours' },
  { days: 90, label: '3 derniers mois' },
  { days: 365, label: '12 derniers mois' },
  { days: 0, label: 'Depuis le début' },
];

/** Display name of a listing id: a venue slug, or "category/slug" for a vendor. */
const venueName = (id: string) => {
  const venue = venues.find((v) => v.slug === id);
  if (venue) return venue.nom_du_lieu;
  const vendor = findVendorById(id);
  return vendor ? `${vendor.name} (${categoryLabel(vendor.category).toLowerCase()})` : id;
};
const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const monthLabel = (key: string) =>
  new Date(`${key}-15T12:00:00`).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 1000) / 10} %` : '–');

function emptyStats(slug: string): VenueStats {
  return { slug, name: venueName(slug), visitors: 0, opens: 0, leads: 0, phoneClicks: 0, websiteClicks: 0, saves: 0 };
}

/** Per-venue figures from raw events and leads. */
function aggregate(events: EventRow[], leads: LeadRow[]): VenueStats[] {
  const ids = [...venues.map((v) => v.slug), ...vendors.map(vendorId)];
  const map = new Map<string, VenueStats>(ids.map((id) => [id, emptyStats(id)]));
  const sessions = new Map<string, Set<string>>();
  for (const e of events) {
    if (e.type === 'visit') continue;
    const s = map.get(e.venue) ?? emptyStats(e.venue);
    map.set(e.venue, s);
    // Visitors include couples who saved the listing from a list without opening its page.
    if (!sessions.has(e.venue)) sessions.set(e.venue, new Set());
    sessions.get(e.venue)!.add(e.session);
    if (e.type === 'contact_open') s.opens++;
    else if (e.type === 'phone_click') s.phoneClicks++;
    else if (e.type === 'website_click') s.websiteClicks++;
    else if (e.type === 'save') s.saves++;
  }
  for (const l of leads) {
    const s = map.get(l.venue) ?? emptyStats(l.venue);
    map.set(l.venue, s);
    s.leads++;
  }
  for (const [slug, set] of sessions) map.get(slug)!.visitors = set.size;
  return [...map.values()].sort((a, b) => b.leads - a.leads || b.visitors - a.visitors);
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(';'))
    .join('\r\n');
  // BOM so Excel opens accents correctly.
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const cardClass = 'rounded-2xl border border-line bg-white p-5';
const thClass = 'px-3 py-2.5 text-left text-xs font-semibold text-muted';
const tdClass = 'px-3 py-2.5 text-[0.95rem] tabular-nums';

export default function AdminPage() {
  const user = useAuthUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(REQUIRE_SIGN_IN ? null : true);
  const [period, setPeriod] = useState(90);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [report, setReport] = useState(false);
  const [tab, setTab] = useState<'stats' | 'demandes' | 'pros'>('stats');

  // Admin check: the account must have a document in the "admins" collection.
  useEffect(() => {
    if (!REQUIRE_SIGN_IN) return;
    if (!user) return setIsAdmin(null);
    void (async () => {
      const [db, { doc, getDoc }] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
      try {
        setIsAdmin((await getDoc(doc(db, 'admins', user.uid))).exists());
      } catch {
        setIsAdmin(false);
      }
    })();
  }, [user]);

  // Data for the selected period.
  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    setError('');
    void (async () => {
      try {
        const [db, fs] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
        const since = fs.Timestamp.fromDate(new Date(Date.now() - period * 86_400_000));
        const ref = (name: string) =>
          period ? fs.query(fs.collection(db, name), fs.where('at', '>=', since)) : fs.collection(db, name);
        // Listing requests are few: always show them all, whatever the period.
        const [eventSnap, leadSnap, submissionSnap] = await Promise.all([
          fs.getDocs(ref('events')),
          fs.getDocs(ref('leads')),
          fs.getDocs(fs.collection(db, 'submissions')),
        ]);
        const toDate = (value: unknown) => (value instanceof fs.Timestamp ? value.toDate() : new Date(0));
        setEvents(eventSnap.docs.map((d) => ({ ...(d.data() as Omit<EventRow, 'at'>), at: toDate(d.get('at')) })));
        setLeads(
          leadSnap.docs
            .map((d) => ({ id: d.id, ...(d.data() as Omit<LeadRow, 'id' | 'at'>), at: toDate(d.get('at')) }))
            .sort((a, b) => b.at.getTime() - a.at.getTime()),
        );
        setSubmissions(
          submissionSnap.docs
            .map((d) => ({ id: d.id, ...(d.data() as Omit<SubmissionRow, 'id' | 'at'>), at: toDate(d.get('at')) }))
            .sort((a, b) => b.at.getTime() - a.at.getTime()),
        );
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les données. Vérifiez les règles Firestore (firestore.rules).');
      } finally {
        setLoading(false);
      }
    })();
  }, [isAdmin, period]);

  const stats = useMemo(() => aggregate(events, leads), [events, leads]);
  const totals = useMemo(
    () =>
      stats.reduce(
        (t, s) => ({
          visitors: t.visitors + s.visitors,
          opens: t.opens + s.opens,
          leads: t.leads + s.leads,
          phoneClicks: t.phoneClicks + s.phoneClicks,
          websiteClicks: t.websiteClicks + s.websiteClicks,
          saves: t.saves + s.saves,
        }),
        { visitors: 0, opens: 0, leads: 0, phoneClicks: 0, websiteClicks: 0, saves: 0 },
      ),
    [stats],
  );

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const periodLabel = PERIODS.find((p) => p.days === period)?.label ?? '';

  let content;
  if (!firebaseConfigured) {
    content = (
      <div className={cardClass}>
        <p className="font-semibold">Firebase n'est pas encore configuré.</p>
        <p className="mt-2 text-muted">
          Renseignez les variables VITE_FIREBASE_* dans le fichier .env (voir .env.example et le README), puis relancez
          le site.
        </p>
      </div>
    );
  } else if (REQUIRE_SIGN_IN && (user === undefined || (user && isAdmin === null))) {
    content = <p className="text-muted">Chargement…</p>;
  } else if (REQUIRE_SIGN_IN && !user) {
    content = (
      <div className={cardClass}>
        <p className="text-muted">Connectez-vous avec un compte administrateur pour voir le tableau de bord.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => void signIn()} className="btn-primary">
            Se connecter avec Google
          </button>
          <Link href={`${paths.login}?suite=${encodeURIComponent(paths.admin)}`} className="link">
            Se connecter avec un e-mail
          </Link>
        </div>
      </div>
    );
  } else if (REQUIRE_SIGN_IN && !isAdmin && user) {
    content = (
      <div className={cardClass}>
        <p className="font-semibold">Ce compte ({user.email}) n'a pas accès aux statistiques.</p>
        <p className="mt-2 text-muted">
          Pour l'autoriser, créez dans Firestore un document <code className="rounded bg-sage-soft px-1">admins/{user.uid}</code>{' '}
          (collection « admins », identifiant ci-dessus, contenu libre), puis rechargez la page.
        </p>
        <button type="button" onClick={() => void signOutUser()} className="btn-ghost mt-4">
          Se déconnecter
        </button>
      </div>
    );
  } else if (tab === 'demandes') {
    content = <RequestsPanel submissions={submissions} />;
  } else if (tab === 'pros') {
    content = <ProsPanel />;
  } else if (selected && report) {
    content = (
      <VenueReport
        stats={stats.find((s) => s.slug === selected) ?? emptyStats(selected)}
        events={events.filter((e) => e.venue === selected)}
        leads={leads.filter((l) => l.venue === selected)}
        periodLabel={periodLabel}
        onBack={() => setReport(false)}
      />
    );
  } else if (selected) {
    const s = stats.find((x) => x.slug === selected) ?? emptyStats(selected);
    const venueLeads = leads.filter((l) => l.venue === selected);
    content = (
      <>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setSelected(null)} className="btn-ghost">
            Tous les lieux
          </button>
          <button type="button" onClick={() => setReport(true)} className="btn-primary">
            Rapport à présenter au lieu
          </button>
        </div>
        <h2 className="mt-8 text-4xl">{s.name}</h2>
        <StatCards s={s} />
        <MonthlyTable events={events.filter((e) => e.venue === selected)} leads={venueLeads} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-2xl">Demandes de coordonnées ({venueLeads.length})</h3>
          <button
            type="button"
            className="btn-ghost"
            onClick={() =>
              downloadCsv(`demandes-${selected}.csv`, [
                ['Date', 'Prénom', 'E-mail', 'Téléphone', 'Date du mariage', 'Invités'],
                ...venueLeads.map((l) => [l.at.toLocaleString('fr-FR'), l.firstName, l.email, l.phone ?? '', l.weddingDate ?? '', l.guests ?? '']),
              ])
            }
          >
            Exporter en CSV
          </button>
        </div>
        <LeadsTable leads={venueLeads} />
      </>
    );
  } else {
    content = (
      <>
        <SiteVisits count={events.filter((e) => e.type === 'visit').length} />
        <h2 className="mt-10 text-3xl">Toutes les fiches</h2>
        <StatCards s={totals} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl">Par lieu</h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                downloadCsv('statistiques-lieux.csv', [
                  ['Fiche', 'Visiteurs', 'Enregistrements', 'Formulaires ouverts', 'Demandes', 'Taux de demande', 'Clics téléphone', 'Clics site'],
                  ...stats.map((s) => [s.name, s.visitors, s.saves, s.opens, s.leads, pct(s.leads, s.visitors), s.phoneClicks, s.websiteClicks]),
                ])
              }
            >
              Exporter les stats
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                downloadCsv('demandes.csv', [
                  ['Date', 'Lieu', 'Prénom', 'E-mail', 'Téléphone', 'Date du mariage', 'Invités'],
                  ...leads.map((l) => [l.at.toLocaleString('fr-FR'), venueName(l.venue), l.firstName, l.email, l.phone ?? '', l.weddingDate ?? '', l.guests ?? '']),
                ])
              }
            >
              Exporter les demandes
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[52rem]">
            <thead className="border-b border-line">
              <tr>
                <th className={thClass}>Fiche</th>
                <th className={thClass}>Visiteurs</th>
                <th className={thClass}>Enregistrés</th>
                <th className={thClass}>Formulaires ouverts</th>
                <th className={thClass}>Demandes</th>
                <th className={thClass}>Taux</th>
                <th className={thClass}>Clics tél.</th>
                <th className={thClass}>Clics site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {stats.map((s) => (
                <tr key={s.slug} className="hover:bg-sage-soft/50">
                  <td className="px-3 py-2.5">
                    <button type="button" onClick={() => setSelected(s.slug)} className="link text-left font-semibold">
                      {s.name}
                    </button>
                  </td>
                  <td className={tdClass}>{s.visitors}</td>
                  <td className={tdClass}>{s.saves}</td>
                  <td className={tdClass}>{s.opens}</td>
                  <td className={`${tdClass} font-semibold`}>{s.leads}</td>
                  <td className={tdClass}>{pct(s.leads, s.visitors)}</td>
                  <td className={tdClass}>{s.phoneClicks}</td>
                  <td className={tdClass}>{s.websiteClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          Visiteurs = personnes qui ont ouvert la page de la fiche (ou l'ont enregistrée depuis une liste), comptées une
          fois par session. Taux = demandes ÷ visiteurs. Enregistrés = ajouts à la sélection « Mes lieux » d'un couple.
          Les visites de robots et les rechargements de page ne sont pas comptés.
        </p>
      </>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 print:max-w-none print:p-0">
      {!report && (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-4xl">Tableau de bord</h1>
            <p className="mt-1 text-muted">
              {site.name}
              {user?.email ? `, connecté en tant que ${user.email}` : ''}
            </p>
          </div>
          {isAdmin && firebaseConfigured && (
            <div className="flex flex-wrap items-center gap-3">
              <label className={`text-sm font-semibold ${tab === 'stats' ? '' : 'hidden'}`}>
                <span className="sr-only">Période</span>
                <select
                  value={period}
                  onChange={(e) => setPeriod(Number(e.target.value))}
                  className="rounded-xl border-line bg-white py-2 pl-3 text-[0.95rem] focus:border-pine focus:ring-pine/30"
                >
                  {PERIODS.map((p) => (
                    <option key={p.days} value={p.days}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              {user && (
                <button type="button" onClick={() => void signOutUser()} className="btn-ghost">
                  Se déconnecter
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!report && isAdmin && firebaseConfigured && (
        <div role="tablist" aria-label="Sections du tableau de bord" className="mb-8 flex flex-wrap gap-1 border-b border-line print:hidden">
          {(
            [
              ['stats', 'Statistiques des lieux'],
              ['demandes', `Demandes de référencement (${submissions.length})`],
              ['pros', 'Professionnels'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => {
                setTab(key);
                setSelected(null);
              }}
              className={`-mb-px border-b-2 px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                tab === key ? 'border-pine text-ink' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {error && <p role="alert" className="mb-6 text-red-700">{error}</p>}
      {loading && tab !== 'pros' ? <p className="text-muted">Chargement des données…</p> : content}
    </section>
  );
}

const CATEGORY_ORDER = ['lieu', ...vendorCategories.map((c) => c.slug)];

const requestCsvHeader = [
  'Date',
  'Catégorie',
  'Demande',
  'Nom',
  'Ville',
  'Secteur ou zone',
  'Type ou spécialité',
  'Invités max',
  'Couchages',
  'Tarifs',
  'Site',
  'Instagram',
  'Contact',
  'Fonction',
  'E-mail',
  'Téléphone',
  'Message',
];

const requestCsvRow = (x: SubmissionRow) => [
  x.at.toLocaleString('fr-FR'),
  categoryLabel(x.category),
  x.kind === 'mise-a-jour' ? 'Mise à jour' : 'Nouveau référencement',
  x.name,
  x.commune,
  x.zone ?? '',
  x.subtype ?? '',
  x.capacity ?? '',
  x.sleeps ?? '',
  x.priceFrom ?? '',
  x.website ?? '',
  x.instagram ?? '',
  x.contactName,
  x.role ?? '',
  x.email,
  x.phone,
  x.message ?? '',
];

function RequestCard({ x }: { x: SubmissionRow }) {
  const details = [
    x.subtype,
    x.capacity ? `${x.capacity} invités max` : '',
    x.sleeps !== undefined ? `${x.sleeps} couchages` : '',
    x.priceFrom ? `Tarifs : ${x.priceFrom}` : '',
  ].filter(Boolean);
  return (
    <li className={cardClass}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-2xl">
          {x.name}{' '}
          <span className="font-sans text-base text-muted">
            {x.commune}
            {x.zone ? `, ${x.zone}` : ''}
          </span>
        </p>
        <p className="text-sm text-muted">
          <span className="mr-2 rounded-full bg-sage-soft px-2.5 py-0.5 text-pine-dark">
            {x.kind === 'mise-a-jour' ? 'Mise à jour' : 'Nouveau'}
          </span>
          {x.at.toLocaleDateString('fr-FR')}
        </p>
      </div>
      <p className="mt-2 text-[0.95rem]">
        {x.contactName}
        {x.role ? ` (${x.role})` : ''} :{' '}
        <a href={`mailto:${x.email}`} className="link">
          {x.email}
        </a>
        ,{' '}
        <a href={`tel:${x.phone.replace(/[^\d+]/g, '')}`} className="link">
          {x.phone}
        </a>
      </p>
      {details.length > 0 && <p className="mt-1 text-sm text-muted">{details.join(' · ')}</p>}
      {(x.website || x.instagram) && (
        <p className="mt-1 text-sm">
          {x.website && (
            <a href={x.website} target="_blank" rel="noopener" className="link mr-4">
              {x.website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          )}
          {x.instagram && <span className="text-muted">Instagram : {x.instagram}</span>}
        </p>
      )}
      {x.message && <p className="mt-2 whitespace-pre-line text-[0.95rem] text-ink/85">{x.message}</p>}
    </li>
  );
}

/** Listing requests from venues and vendors, grouped by category, with a filter and CSV export. */
function RequestsPanel({ submissions }: { submissions: SubmissionRow[] }) {
  const [filter, setFilter] = useState('toutes');
  const counts = new Map<string, number>();
  for (const x of submissions) counts.set(x.category, (counts.get(x.category) ?? 0) + 1);
  const categories = [...CATEGORY_ORDER, ...[...counts.keys()].filter((k) => !CATEGORY_ORDER.includes(k))];
  const visible = filter === 'toutes' ? submissions : submissions.filter((x) => x.category === filter);
  const groups = (filter === 'toutes' ? categories : [filter])
    .map((cat) => ({ cat, items: visible.filter((x) => x.category === cat) }))
    .filter((g) => g.items.length > 0);

  const chipClass = (active: boolean, empty: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
      active ? 'border-pine bg-pine text-white' : empty ? 'border-line text-muted/60' : 'border-line bg-white text-ink hover:border-pine'
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ul className="flex max-w-4xl flex-wrap gap-2" aria-label="Filtrer par catégorie">
          <li>
            <button type="button" aria-pressed={filter === 'toutes'} onClick={() => setFilter('toutes')} className={chipClass(filter === 'toutes', false)}>
              Toutes ({submissions.length})
            </button>
          </li>
          {categories.map((cat) => {
            const n = counts.get(cat) ?? 0;
            return (
              <li key={cat}>
                <button
                  type="button"
                  aria-pressed={filter === cat}
                  disabled={n === 0}
                  onClick={() => setFilter(cat)}
                  className={chipClass(filter === cat, n === 0)}
                >
                  {categoryLabel(cat)} ({n})
                </button>
              </li>
            );
          })}
        </ul>
        {visible.length > 0 && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => downloadCsv(`demandes-${filter}.csv`, [requestCsvHeader, ...visible.map(requestCsvRow)])}
          >
            Exporter en CSV
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <p className="mt-8 text-muted">
          Aucune demande pour l'instant. Elles arrivent depuis la page « Référencer mon lieu » et les pages des prestataires.
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.cat} className="mt-10" aria-labelledby={`demandes-${g.cat}`}>
            <h2 id={`demandes-${g.cat}`} className="text-2xl">
              {categoryLabel(g.cat)} ({g.items.length})
            </h2>
            <ul className="mt-4 space-y-3">
              {g.items.map((x) => (
                <RequestCard key={x.id} x={x} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

/** Visits of the whole site, whatever the pages seen. */
function SiteVisits({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className={`${cardClass} min-w-[13rem]`}>
        <p className="text-xs font-semibold text-muted">Visites du site</p>
        <p className="mt-1 font-display text-3xl tabular-nums">{count}</p>
      </div>
      <p className="max-w-xl text-sm text-muted">
        Une visite = une personne qui arrive sur le site, quelle que soit la page, comptée une fois tant que son onglet
        reste ouvert. Les robots, les rechargements, ce tableau de bord et l'espace professionnel ne sont pas comptés.
      </p>
    </div>
  );
}

function StatCards({ s }: { s: Omit<VenueStats, 'slug' | 'name'> }) {
  const cards = [
    { label: 'Visiteurs', value: s.visitors },
    { label: 'Enregistrements', value: s.saves },
    { label: 'Formulaires ouverts', value: s.opens },
    { label: 'Demandes de coordonnées', value: s.leads, strong: true },
    { label: 'Clics sur le téléphone', value: s.phoneClicks },
    { label: 'Clics vers le site', value: s.websiteClicks },
  ];
  return (
    <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((c) => (
        <div key={c.label} className={`${cardClass} ${c.strong ? 'border-pine' : ''}`}>
          <dt className="text-xs font-semibold text-muted">{c.label}</dt>
          <dd className={`mt-1 font-display text-3xl tabular-nums ${c.strong ? 'text-pine' : ''}`}>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function MonthlyTable({ events, leads }: { events: EventRow[]; leads: LeadRow[] }) {
  const months = new Map<string, { visitors: Set<string>; leads: number; clicks: number }>();
  const row = (key: string) => {
    if (!months.has(key)) months.set(key, { visitors: new Set(), leads: 0, clicks: 0 });
    return months.get(key)!;
  };
  for (const e of events) {
    row(monthKey(e.at)).visitors.add(e.session);
    if (e.type === 'phone_click' || e.type === 'website_click') row(monthKey(e.at)).clicks++;
  }
  for (const l of leads) row(monthKey(l.at)).leads++;
  const keys = [...months.keys()].sort().reverse();

  return (
    <div className="mt-10">
      <h3 className="text-2xl">Mois par mois</h3>
      {keys.length === 0 ? (
        <p className="mt-3 text-muted">Aucune activité sur la période.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[28rem]">
            <thead className="border-b border-line">
              <tr>
                <th className={thClass}>Mois</th>
                <th className={thClass}>Visiteurs</th>
                <th className={thClass}>Demandes</th>
                <th className={thClass}>Clics coordonnées</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {keys.map((k) => (
                <tr key={k}>
                  <td className={`${tdClass} capitalize`}>{monthLabel(k)}</td>
                  <td className={tdClass}>{months.get(k)!.visitors.size}</td>
                  <td className={tdClass}>{months.get(k)!.leads}</td>
                  <td className={tdClass}>{months.get(k)!.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) return <p className="mt-3 text-muted">Aucune demande sur la période.</p>;
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[40rem]">
        <thead className="border-b border-line">
          <tr>
            <th className={thClass}>Date</th>
            <th className={thClass}>Prénom</th>
            <th className={thClass}>E-mail</th>
            <th className={thClass}>Téléphone</th>
            <th className={thClass}>Mariage</th>
            <th className={thClass}>Invités</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {leads.map((l) => (
            <tr key={l.id}>
              <td className={tdClass}>{l.at.toLocaleDateString('fr-FR')}</td>
              <td className={tdClass}>{l.firstName}</td>
              <td className={tdClass}>{l.email}</td>
              <td className={tdClass}>{l.phone ?? ''}</td>
              <td className={tdClass}>{l.weddingDate ? new Date(l.weddingDate).toLocaleDateString('fr-FR') : ''}</td>
              <td className={tdClass}>{l.guests ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One-page summary to show a venue, with no personal data from the couples. */
function VenueReport({
  stats,
  events,
  leads,
  periodLabel,
  onBack,
}: {
  stats: VenueStats;
  events: EventRow[];
  leads: LeadRow[];
  periodLabel: string;
  onBack: () => void;
}) {
  const guests = leads.map((l) => l.guests).filter((g): g is number => typeof g === 'number');
  const avgGuests = guests.length ? Math.round(guests.reduce((a, b) => a + b, 0) / guests.length) : null;
  const weddingMonths = new Map<string, number>();
  for (const l of leads) {
    if (!l.weddingDate) continue;
    const key = l.weddingDate.slice(0, 7);
    weddingMonths.set(key, (weddingMonths.get(key) ?? 0) + 1);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3 print:hidden">
        <button type="button" onClick={onBack} className="btn-ghost">
          Retour
        </button>
        <button type="button" onClick={() => window.print()} className="btn-primary">
          Imprimer ou enregistrer en PDF
        </button>
      </div>
      <p className="font-display text-xl uppercase tracking-[0.28em]">{site.name}</p>
      <h1 className="mt-6 text-5xl">{stats.name}</h1>
      <p className="mt-2 text-lg text-muted">
        Votre visibilité sur {site.name}, {periodLabel.toLowerCase()}. Rapport du{' '}
        {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
      </p>
      <StatCards s={stats} />
      <p className="mt-6 text-lg">
        {stats.visitors} couples ont consulté votre fiche, {stats.saves} l'ont ajoutée à leur sélection et{' '}
        <strong>{stats.leads}</strong> ont demandé vos coordonnées ({pct(stats.leads, stats.visitors)} des visiteurs).
        {avgGuests ? ` Ils prévoyaient en moyenne ${avgGuests} invités.` : ''}
      </p>
      <MonthlyTable events={events} leads={leads} />
      {weddingMonths.size > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl">Dates de mariage recherchées</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...weddingMonths.entries()]
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([k, n]) => (
                <li key={k} className="rounded-full bg-sage-soft px-3 py-1.5 text-[0.95rem] capitalize">
                  {monthLabel(k)} : {n}
                </li>
              ))}
          </ul>
        </div>
      )}
      <p className="mt-10 text-sm text-muted">
        Chiffres issus des statistiques de {site.name}. Les rechargements de page et les robots ne sont pas comptés. Les
        coordonnées des couples ne sont pas communiquées.
      </p>
    </div>
  );
}
