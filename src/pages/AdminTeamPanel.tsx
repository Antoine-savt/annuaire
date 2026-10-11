import { FormEvent, useEffect, useState } from 'react';
import { getDb } from '../lib/firebase';

/*
 * "Équipe" tab (managers only): who can open /admin, by e-mail address (Firestore "adminEmails").
 * A person gets access as soon as they sign in with that address, with Google or a confirmed e-mail.
 */

interface Member {
  email: string;
  /** Manages the team and the goals. */
  manage: boolean;
  /** Sees the goals and their rewards. */
  goals: boolean;
  addedBy: string;
}

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);
const thClass = 'px-3 py-2.5 text-left text-xs font-semibold text-muted';
const tdClass = 'px-3 py-2.5 align-top text-[0.95rem]';
const checkboxClass = 'h-[1.05rem] w-[1.05rem] rounded border-ink/30 text-pine focus:ring-pine/40';

export function TeamPanel({ userEmail }: { userEmail: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', goals: false });

  const load = async () => {
    try {
      const [db, fs] = await firestore();
      const snap = await fs.getDocs(fs.collection(db, 'adminEmails'));
      setMembers(
        snap.docs
          .map((d) => {
            const x = d.data();
            return { email: d.id, manage: x.manage === true, goals: x.goals === true, addedBy: String(x.addedBy ?? '') };
          })
          .sort((a, b) => Number(b.manage) - Number(a.manage) || a.email.localeCompare(b.email)),
      );
    } catch (err) {
      console.error(err);
      setError('Impossible de charger l’équipe.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async (key: string, email: string, manage: boolean, goals: boolean) => {
    setBusy(key);
    setError('');
    try {
      const [db, fs] = await firestore();
      await fs.setDoc(fs.doc(db, 'adminEmails', email), { manage, goals, addedBy: userEmail.slice(0, 200), at: fs.serverTimestamp() });
      await load();
      return true;
    } catch (err) {
      console.error(err);
      setError('La modification n’a pas pu être enregistrée.');
      return false;
    } finally {
      setBusy('');
    }
  };

  const add = async (e: FormEvent) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!/^[^@\s/]+@[^@\s/]+\.[^@\s/]+$/.test(email)) {
      setError('Adresse e-mail invalide.');
      return;
    }
    if (await save('add', email, false, form.goals)) setForm({ email: '', goals: false });
  };

  const remove = async (m: Member) => {
    if (!window.confirm(`Retirer l’accès à /admin pour ${m.email} ?`)) return;
    setBusy(m.email);
    setError('');
    try {
      const [db, fs] = await firestore();
      await fs.deleteDoc(fs.doc(db, 'adminEmails', m.email));
      await load();
    } catch (err) {
      console.error(err);
      setError('L’accès n’a pas pu être retiré.');
    } finally {
      setBusy('');
    }
  };

  if (loading) return <p className="text-muted">Chargement de l’équipe…</p>;

  return (
    <div>
      <h2 className="text-3xl">Équipe</h2>
      <p className="mt-1 max-w-3xl text-muted">
        Les personnes ci-dessous ouvrent /admin en se connectant avec cette adresse (Google, ou e-mail confirmé). Toutes
        voient les statistiques et les demandes, et peuvent modérer les fiches. « Voit les objectifs » donne aussi accès
        à l’onglet Objectifs et à ses récompenses.
      </p>

      {error && (
        <p role="alert" className="mt-4 text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[40rem]">
          <thead className="border-b border-line">
            <tr>
              <th className={thClass}>E-mail</th>
              <th className={thClass}>Rôle</th>
              <th className={thClass}>Voit les objectifs</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {members.map((m) => {
              const self = m.email === userEmail;
              return (
                <tr key={m.email}>
                  <td className={`${tdClass} font-semibold`}>
                    {m.email}
                    {self && <span className="ml-2 text-sm font-normal text-muted">(vous)</span>}
                  </td>
                  <td className={tdClass}>{m.manage ? 'Gère l’équipe et les objectifs' : 'Administrateur'}</td>
                  <td className={tdClass}>
                    {m.manage ? (
                      'Oui'
                    ) : (
                      <input
                        type="checkbox"
                        checked={m.goals}
                        disabled={!!busy}
                        onChange={(e) => void save(m.email, m.email, m.manage, e.target.checked)}
                        aria-label={`${m.email} voit les objectifs`}
                        className={checkboxClass}
                      />
                    )}
                  </td>
                  <td className={tdClass}>
                    {!self && (
                      <button type="button" disabled={!!busy} onClick={() => void remove(m)} className="text-sm text-muted hover:text-red-700 hover:underline">
                        Retirer l’accès
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form onSubmit={add} className="mt-8 flex max-w-2xl flex-wrap items-end gap-4">
        <label className="min-w-64 flex-1 text-sm font-semibold">
          Ajouter une adresse e-mail
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="prenom.nom@gmail.com"
            className="mt-1 w-full rounded-xl border-line bg-white px-3 py-2 text-[0.95rem] focus:border-pine focus:ring-pine/30"
          />
        </label>
        <label className="mb-2.5 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.checked })} className={checkboxClass} />
          Voit les objectifs
        </label>
        <button type="submit" disabled={!!busy} className="btn-primary disabled:opacity-60">
          {busy === 'add' ? 'Ajout…' : 'Donner l’accès'}
        </button>
      </form>
    </div>
  );
}
