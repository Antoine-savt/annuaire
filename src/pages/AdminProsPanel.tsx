import { useEffect, useState } from 'react';
import { ListingDoc } from '../types';
import { staticVenues } from '../data';
import { getDb } from '../lib/firebase';
import { toListingDoc } from '../lib/listings';

/*
 * "Professionnels" tab of the dashboard: accounts and claims of the curated venues. Their listings are
 * moderated in the "Fiches" tab (AdminListingsPanel.tsx).
 */

interface ProUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  intents: string[];
  createdAt: Date | null;
}

interface ClaimRow {
  id: string;
  uid: string;
  email: string;
  name: string;
  venueSlug: string;
  message: string;
  status: string;
  at: Date | null;
}

const cardClass = 'rounded-2xl border border-line bg-white p-5';
const thClass = 'px-3 py-2.5 text-left text-xs font-semibold text-muted';
const tdClass = 'px-3 py-2.5 align-top text-[0.95rem]';

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);

function toDate(value: unknown): Date | null {
  return value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: unknown }).toDate === 'function'
    ? (value as { toDate: () => Date }).toDate()
    : null;
}

const day = (d: Date | null) => (d ? d.toLocaleDateString('fr-FR') : '');

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Integer or null, as the listing rules expect. */
const int = (n: number | null | undefined) => (typeof n === 'number' && Number.isInteger(n) && n >= 0 ? n : null);

export function ProsPanel() {
  const [listings, setListings] = useState<ListingDoc[]>([]);
  const [users, setUsers] = useState<ProUser[]>([]);
  const [claims, setClaims] = useState<ClaimRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const [db, fs] = await firestore();
      const [l, u, c] = await Promise.all([
        fs.getDocs(fs.collection(db, 'listings')),
        fs.getDocs(fs.collection(db, 'users')),
        fs.getDocs(fs.collection(db, 'claims')),
      ]);
      setListings(l.docs.map((d) => toListingDoc(d.id, d.data())).sort((a, b) => b.updatedAt - a.updatedAt));
      setUsers(
        u.docs
          .map((d) => {
            const x = d.data();
            return {
              uid: d.id,
              firstName: String(x.firstName ?? ''),
              lastName: String(x.lastName ?? ''),
              email: String(x.email ?? ''),
              phone: String(x.phone ?? ''),
              company: String(x.company ?? ''),
              role: String(x.role ?? ''),
              intents: Array.isArray(x.intents) ? x.intents.map(String) : [],
              createdAt: toDate(x.createdAt),
            };
          })
          .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)),
      );
      setClaims(
        c.docs
          .map((d) => {
            const x = d.data();
            return {
              id: d.id,
              uid: String(x.uid ?? ''),
              email: String(x.email ?? ''),
              name: String(x.name ?? ''),
              venueSlug: String(x.venueSlug ?? ''),
              message: String(x.message ?? ''),
              status: String(x.status ?? 'pending'),
              at: toDate(x.at),
            };
          })
          .sort((a, b) => (b.at?.getTime() ?? 0) - (a.at?.getTime() ?? 0)),
      );
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les comptes professionnels. Vérifiez que ce compte est bien administrateur.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const act = async (key: string, action: () => Promise<void>) => {
    setBusy(key);
    setError('');
    try {
      await action();
      await load();
    } catch (err) {
      console.error(err);
      setError(`L’action a échoué : ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setBusy('');
    }
  };

  /** Accepting a claim gives the claimant a draft copy of the curated venue, under the same address. */
  const approve = (c: ClaimRow) =>
    act(c.id, async () => {
      const v = staticVenues.find((x) => x.slug === c.venueSlug);
      if (!v) throw new Error('lieu introuvable dans l’annuaire');
      const [db, fs] = await firestore();
      const ref = fs.doc(db, 'listings', v.slug);
      if ((await fs.getDoc(ref)).exists()) throw new Error('cette fiche est déjà rattachée à un compte');
      await fs.setDoc(ref, {
        ownerUid: c.uid,
        type: 'lieu',
        category: 'lieu',
        slug: v.slug,
        status: 'draft',
        name: v.nom_du_lieu.slice(0, 120),
        commune: v.commune.slice(0, 80),
        zone: v.zone.slug,
        summary: v.summary.slice(0, 200),
        description: v.description.slice(0, 4000),
        tags: v.tags.slice(0, 3).map((t) => t.slice(0, 30)),
        highlight: v.element_differenciant.slice(0, 300),
        phone: v.contact.slice(0, 40),
        website: v.site_web_officiel.slice(0, 200),
        instagram: '',
        // The curated photos are illustrations: the owner adds real ones before publishing.
        photos: [],
        venueType: v.type_de_cadre.slice(0, 60),
        guestsMin: int(v.minGuests),
        guestsMax: int(v.maxGuests),
        sleeps: int(v.sleeps) ?? 0,
        priceFrom: int(v.priceFrom),
        priceDetails: '',
        createdAt: fs.serverTimestamp(),
        updatedAt: fs.serverTimestamp(),
      });
      await fs.updateDoc(fs.doc(db, 'claims', c.id), { status: 'approved' });
    });

  const reject = (c: ClaimRow) =>
    act(c.id, async () => {
      const [db, fs] = await firestore();
      await fs.updateDoc(fs.doc(db, 'claims', c.id), { status: 'rejected' });
    });

  if (loading) return <p className="text-muted">Chargement des comptes professionnels…</p>;

  const userById = new Map(users.map((u) => [u.uid, u]));
  const ownerLabel = (uid: string) => {
    const u = userById.get(uid);
    return u ? `${u.firstName} ${u.lastName}`.trim() || u.email : uid.slice(0, 8);
  };
  const pending = claims.filter((c) => c.status === 'pending');
  const listingsOf = (uid: string) => listings.filter((l) => l.ownerUid === uid).length;

  return (
    <div className="space-y-14">
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}

      <section aria-labelledby="revendications">
        <h2 id="revendications" className="text-3xl">
          Revendications à traiter ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-3 text-muted">Aucune demande en attente. Les propriétaires revendiquent leur lieu depuis leur compte.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pending.map((c) => {
              const v = staticVenues.find((x) => x.slug === c.venueSlug);
              return (
                <li key={c.id} className={cardClass}>
                  <p className="font-display text-2xl">{v?.nom_du_lieu ?? c.venueSlug}</p>
                  <p className="mt-1 text-[0.95rem]">
                    {c.name} :{' '}
                    <a href={`mailto:${c.email}`} className="link">
                      {c.email}
                    </a>
                    {userById.get(c.uid)?.phone ? `, ${userById.get(c.uid)!.phone}` : ''}
                    <span className="text-muted">, le {day(c.at)}</span>
                  </p>
                  {c.message && <p className="mt-2 whitespace-pre-line text-[0.95rem] text-ink/85">{c.message}</p>}
                  <p className="mt-2 text-sm text-muted">
                    Vérifiez l’identité (appel au numéro officiel du lieu, e-mail du domaine) avant d’accepter : la fiche passe
                    alors en brouillon dans le compte de cette personne, qui la complète et la publie.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" disabled={!!busy} onClick={() => void approve(c)} className="btn-primary disabled:opacity-60">
                      Accepter
                    </button>
                    <button type="button" disabled={!!busy} onClick={() => void reject(c)} className="btn-ghost disabled:opacity-60">
                      Refuser
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="comptes-pros">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="comptes-pros" className="text-3xl">
            Comptes professionnels ({users.length})
          </h2>
          {users.length > 0 && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                downloadCsv('comptes-professionnels.csv', [
                  ['Inscription', 'Prénom', 'Nom', 'E-mail', 'Téléphone', 'Entreprise', 'Fonction', 'Propose', 'Fiches'],
                  ...users.map((u) => [
                    day(u.createdAt),
                    u.firstName,
                    u.lastName,
                    u.email,
                    u.phone,
                    u.company,
                    u.role,
                    u.intents.map((i) => (i === 'lieu' ? 'Lieu' : 'Prestataire')).join(' + '),
                    listingsOf(u.uid),
                  ]),
                ])
              }
            >
              Exporter en CSV
            </button>
          )}
        </div>
        {users.length === 0 ? (
          <p className="mt-3 text-muted">Aucun compte pour l’instant.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[56rem]">
              <thead className="border-b border-line">
                <tr>
                  <th className={thClass}>Nom</th>
                  <th className={thClass}>Contact</th>
                  <th className={thClass}>Entreprise</th>
                  <th className={thClass}>Propose</th>
                  <th className={thClass}>Fiches</th>
                  <th className={thClass}>Inscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {users.map((u) => (
                  <tr key={u.uid}>
                    <td className={`${tdClass} font-semibold`}>{`${u.firstName} ${u.lastName}`.trim() || '(sans nom)'}</td>
                    <td className={tdClass}>
                      <a href={`mailto:${u.email}`} className="link">
                        {u.email}
                      </a>
                      {u.phone && <span className="block text-sm text-muted">{u.phone}</span>}
                    </td>
                    <td className={tdClass}>
                      {u.company}
                      {u.role && <span className="block text-sm text-muted">{u.role}</span>}
                    </td>
                    <td className={tdClass}>{u.intents.map((i) => (i === 'lieu' ? 'Lieu' : 'Prestataire')).join(', ')}</td>
                    <td className={`${tdClass} tabular-nums`}>{listingsOf(u.uid)}</td>
                    <td className={`${tdClass} tabular-nums`}>{day(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
