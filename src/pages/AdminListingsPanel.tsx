import { useEffect, useState } from 'react';
import { ListingDoc, ListingStatus } from '../types';
import { staticVenues } from '../data';
import { categoryLabel } from '../vendors';
import { curatedVendors, vendorId } from '../vendorListings';
import { getDb } from '../lib/firebase';
import { toListingDoc } from '../lib/listings';
import { paths } from '../routes';
import { site } from '../site';

/*
 * "Fiches" tab of the dashboard: every listing of the site, to take down the wrong or unwanted ones.
 * - Listings published from professional accounts (Firestore): hide (reversible) or delete for good.
 * - Curated listings written in the code: withdrawn from the site (reversible) through the "removed"
 *   collection, read by every visitor and by the build.
 */

const thClass = 'px-3 py-2.5 text-left text-xs font-semibold text-muted';
const tdClass = 'px-3 py-2.5 align-top text-[0.95rem]';

const STATUS_LABEL: Record<ListingStatus, string> = { published: 'Publiée', draft: 'Brouillon', hidden: 'Masquée' };
const STATUS_CLASS: Record<ListingStatus, string> = {
  published: 'bg-pine text-white',
  draft: 'bg-sage-soft text-pine-dark',
  hidden: 'bg-red-50 text-red-800',
};

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);

interface Owner {
  name: string;
  email: string;
}

/** A listing written in the code: a curated venue or vendor. */
interface CuratedRow {
  id: string;
  name: string;
  kind: string;
  place: string;
  href: string;
}

const curated: CuratedRow[] = [
  ...staticVenues.map((v) => ({ id: v.slug, name: v.nom_du_lieu, kind: 'Lieu', place: `${v.commune}, ${v.zone.name}`, href: paths.venue(v.slug) })),
  ...curatedVendors.map((v) => ({
    id: vendorId(v),
    name: v.name,
    kind: categoryLabel(v.category),
    place: v.commune,
    href: paths.vendorPage(v.category, v.slug),
  })),
];

const actionClass = 'rounded-full border px-3 py-1 text-sm font-semibold transition-colors disabled:opacity-50';

export function ListingsPanel({ userEmail }: { userEmail: string }) {
  const [listings, setListings] = useState<ListingDoc[]>([]);
  const [owners, setOwners] = useState<Map<string, Owner>>(new Map());
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'toutes' | ListingStatus>('toutes');

  const load = async () => {
    setError('');
    try {
      const [db, fs] = await firestore();
      const [l, u, r] = await Promise.all([
        fs.getDocs(fs.collection(db, 'listings')),
        fs.getDocs(fs.collection(db, 'users')),
        fs.getDocs(fs.collection(db, 'removed')),
      ]);
      setListings(l.docs.map((d) => toListingDoc(d.id, d.data())).sort((a, b) => b.updatedAt - a.updatedAt));
      setOwners(
        new Map(
          u.docs.map((d) => {
            const x = d.data();
            return [d.id, { name: `${x.firstName ?? ''} ${x.lastName ?? ''}`.trim(), email: String(x.email ?? '') }];
          }),
        ),
      );
      setRemoved(new Set(r.docs.map((d) => d.id)));
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les fiches. Vérifiez que ce compte est bien administrateur.');
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

  const setStatus = (l: ListingDoc, status: ListingStatus) =>
    act(l.id, async () => {
      const [db, fs] = await firestore();
      await fs.updateDoc(fs.doc(db, 'listings', l.id), { status, updatedAt: fs.serverTimestamp() });
    });

  // The photos stay in Storage: only their owner can delete them (see storage.rules).
  const remove = (l: ListingDoc) => {
    if (!window.confirm(`Supprimer définitivement la fiche « ${l.name} » ? Son propriétaire ne pourra pas la récupérer.`)) return;
    void act(l.id, async () => {
      const [db, fs] = await firestore();
      await fs.deleteDoc(fs.doc(db, 'listings', l.id));
    });
  };

  const withdraw = (c: CuratedRow) => {
    if (!window.confirm(`Retirer « ${c.name} » du site ? Vous pourrez la remettre en ligne depuis cet onglet.`)) return;
    void act(c.id, async () => {
      const [db, fs] = await firestore();
      await fs.setDoc(fs.doc(db, 'removed', c.id), { name: c.name.slice(0, 120), by: userEmail.slice(0, 200), at: fs.serverTimestamp() });
    });
  };

  const restore = (c: CuratedRow) =>
    act(c.id, async () => {
      const [db, fs] = await firestore();
      await fs.deleteDoc(fs.doc(db, 'removed', c.id));
    });

  if (loading) return <p className="text-muted">Chargement des fiches…</p>;

  const visible = filter === 'toutes' ? listings : listings.filter((l) => l.status === filter);
  const count = (s: ListingStatus) => listings.filter((l) => l.status === s).length;
  const claimed = new Set(listings.map((l) => l.id));

  return (
    <div className="space-y-14">
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}

      <section aria-labelledby="fiches-pros">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="fiches-pros" className="text-3xl">
            Fiches des professionnels ({listings.length})
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par statut">
            {(['toutes', 'published', 'draft', 'hidden'] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={filter === s}
                onClick={() => setFilter(s)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  filter === s ? 'border-pine bg-pine text-white' : 'border-line bg-white text-ink hover:border-pine'
                }`}
              >
                {s === 'toutes' ? `Toutes (${listings.length})` : `${STATUS_LABEL[s]}s (${count(s)})`}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Les fiches sont publiées sans validation : vérifiez les nouvelles. « Masquer » retire la fiche du site et empêche
          son propriétaire de la modifier, sans rien effacer. « Supprimer » l’efface définitivement : à réserver aux fausses
          fiches.
        </p>
        {visible.length === 0 ? (
          <p className="mt-4 text-muted">Aucune fiche.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[56rem]">
              <thead className="border-b border-line">
                <tr>
                  <th className={thClass}>Fiche</th>
                  <th className={thClass}>Catégorie</th>
                  <th className={thClass}>Propriétaire</th>
                  <th className={thClass}>Statut</th>
                  <th className={thClass}>Modifiée le</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((l) => {
                  const href = l.type === 'lieu' ? paths.venue(l.slug) : paths.vendorPage(l.category, l.slug);
                  const owner = owners.get(l.ownerUid);
                  return (
                    <tr key={l.id}>
                      <td className={tdClass}>
                        {l.status === 'published' ? (
                          <a href={href} target="_blank" rel="noopener" className="link font-semibold">
                            {l.name}
                          </a>
                        ) : (
                          <span className="font-semibold">{l.name}</span>
                        )}
                        <span className="block text-sm text-muted">
                          {l.commune}, {l.photos.length} photo{l.photos.length > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className={tdClass}>{l.type === 'lieu' ? 'Lieu' : categoryLabel(l.category)}</td>
                      <td className={tdClass}>
                        {owner?.name || owner?.email || l.ownerUid.slice(0, 8)}
                        {owner?.email && <span className="block text-sm text-muted">{owner.email}</span>}
                      </td>
                      <td className={tdClass}>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[l.status]}`}>{STATUS_LABEL[l.status]}</span>
                      </td>
                      <td className={`${tdClass} tabular-nums`}>{l.updatedAt ? new Date(l.updatedAt).toLocaleDateString('fr-FR') : ''}</td>
                      <td className={tdClass}>
                        <div className="flex flex-wrap gap-2">
                          {l.status === 'hidden' ? (
                            <button type="button" disabled={!!busy} onClick={() => void setStatus(l, 'published')} className={`${actionClass} border-line hover:border-pine`}>
                              Rétablir
                            </button>
                          ) : (
                            <button type="button" disabled={!!busy} onClick={() => void setStatus(l, 'hidden')} className={`${actionClass} border-line hover:border-pine`}>
                              Masquer
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={!!busy}
                            onClick={() => remove(l)}
                            className={`${actionClass} border-red-200 text-red-700 hover:border-red-700 hover:bg-red-50`}
                          >
                            Supprimer
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

      <section aria-labelledby="fiches-annuaire">
        <h2 id="fiches-annuaire" className="text-3xl">
          Fiches de l’annuaire d’origine ({curated.length})
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Les fiches rédigées par {site.name}. « Retirer du site » les fait disparaître pour les visiteurs dès leur
          prochaine page, et de Google au prochain déploiement ; vous pouvez les remettre en ligne à tout moment. Une fiche
          revendiquée par son propriétaire se gère dans le tableau ci-dessus.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[44rem]">
            <thead className="border-b border-line">
              <tr>
                <th className={thClass}>Fiche</th>
                <th className={thClass}>Catégorie</th>
                <th className={thClass}>Statut</th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {curated.map((c) => {
                const isRemoved = removed.has(c.id);
                return (
                  <tr key={c.id}>
                    <td className={tdClass}>
                      {isRemoved ? (
                        <span className="font-semibold">{c.name}</span>
                      ) : (
                        <a href={c.href} target="_blank" rel="noopener" className="link font-semibold">
                          {c.name}
                        </a>
                      )}
                      <span className="block text-sm text-muted">{c.place}</span>
                    </td>
                    <td className={tdClass}>{c.kind}</td>
                    <td className={tdClass}>
                      {isRemoved ? (
                        <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-800">Retirée</span>
                      ) : claimed.has(c.id) ? (
                        <span className="rounded-full bg-sage-soft px-2.5 py-0.5 text-xs font-semibold text-pine-dark">Revendiquée</span>
                      ) : (
                        <span className="rounded-full bg-pine px-2.5 py-0.5 text-xs font-semibold text-white">En ligne</span>
                      )}
                    </td>
                    <td className={tdClass}>
                      {isRemoved ? (
                        <button type="button" disabled={!!busy} onClick={() => void restore(c)} className={`${actionClass} border-line hover:border-pine`}>
                          Remettre en ligne
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={!!busy}
                          onClick={() => withdraw(c)}
                          className={`${actionClass} border-red-200 text-red-700 hover:border-red-700 hover:bg-red-50`}
                        >
                          Retirer du site
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
