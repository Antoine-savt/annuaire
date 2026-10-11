import { FormEvent, useId, useState } from 'react';
import { VendorCategory } from '../types';
import { zones } from '../data';
import { vendorCategories } from '../vendors';
import { emptyListing, ListingInput, submitListing } from '../lib/submissions';
import { Link } from '../router';
import { paths } from '../routes';
import { site } from '../site';
import { PortfolioOffer } from './PortfolioOffer';

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';
const optional = <span className="font-normal text-muted">(facultatif)</span>;

/**
 * Listing request for wedding vendors. With a category, the form is dedicated to it;
 * without one (on the vendors hub), the vendor picks their category.
 */
export function VendorListingForm({ category }: { category?: VendorCategory }) {
  const ids = useId();
  const initial: ListingInput = { ...emptyListing, category: category?.slug ?? '' };
  const [form, setForm] = useState<ListingInput>(initial);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const update = (patch: Partial<ListingInput>) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      await submitListing(form);
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setError("La demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez.");
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-pine bg-white p-6">
        <p className="font-display text-2xl text-ink">Merci, votre demande est bien envoyée.</p>
        <p className="mt-2 leading-relaxed text-muted">
          Nous revenons vers vous rapidement à l'adresse {form.email} pour préparer la fiche de {form.name}.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setStatus('idle');
          }}
          className="btn-ghost mt-5"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-5 sm:p-8">
      <fieldset>
        <legend className={labelClass}>Votre demande</legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {(
            [
              ['nouveau', 'Être référencé'],
              ['mise-a-jour', 'Mettre à jour ma fiche'],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2.5 text-[0.95rem]">
              <input
                type="radio"
                name={`${ids}-kind`}
                checked={form.kind === value}
                onChange={() => update({ kind: value })}
                className="h-4 w-4 border-ink/30 text-pine focus:ring-pine/40"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <h3 className="mt-8 font-sans text-base font-semibold text-pine">Votre activité</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {!category && (
          <label className={`${labelClass} sm:col-span-2`}>
            Métier
            <select required value={form.category} onChange={(e) => update({ category: e.target.value })} className={fieldClass}>
              <option value="">Choisir votre métier</option>
              {vendorCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className={labelClass}>
          Nom de l'entreprise
          <input required value={form.name} onChange={(e) => update({ name: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Ville
          <input required value={form.commune} onChange={(e) => update({ commune: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Zone d'intervention {optional}
          <select value={form.zone} onChange={(e) => update({ zone: e.target.value })} className={fieldClass}>
            <option value="">Choisir</option>
            <option>Tout le Var</option>
            {zones.map((z) => (
              <option key={z.slug}>{z.name}</option>
            ))}
            <option>Var et départements voisins</option>
          </select>
        </label>
        <label className={labelClass}>
          Spécialité ou style {optional}
          <input
            value={form.subtype}
            onChange={(e) => update({ subtype: e.target.value })}
            placeholder={category ? `Ex. ${category.menuDesc.toLowerCase()}` : 'Ce qui vous distingue'}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Tarifs à partir de {optional}
          <input value={form.priceFrom} onChange={(e) => update({ priceFrom: e.target.value })} placeholder="Ex. 1 500 €" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Site web {optional}
          <input type="url" value={form.website} onChange={(e) => update({ website: e.target.value })} placeholder="https://" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Instagram {optional}
          <input value={form.instagram} onChange={(e) => update({ instagram: e.target.value })} placeholder="@votrecompte" className={fieldClass} />
        </label>
        <div>
          <label className={labelClass}>
            Portfolio {optional}
            <input type="url" value={form.portfolio} onChange={(e) => update({ portfolio: e.target.value })} placeholder="https://" className={fieldClass} />
          </label>
          <PortfolioOffer
            defaults={{
              name: form.contactName,
              company: form.name,
              category: form.category,
              email: form.email,
              phone: form.phone,
              current: form.portfolio || form.website,
            }}
          />
        </div>
      </div>

      <h3 className="mt-8 font-sans text-base font-semibold text-pine">Vos coordonnées</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Prénom et nom
          <input required autoComplete="name" value={form.contactName} onChange={(e) => update({ contactName: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          E-mail
          <input required type="email" autoComplete="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={fieldClass} />
        </label>
        <label className={labelClass}>
          Téléphone
          <input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={fieldClass} />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Message {optional}
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update({ message: e.target.value })}
            placeholder="Présentez votre activité en quelques lignes"
            className={`${fieldClass} resize-y`}
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input required type="checkbox" className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 rounded border-ink/30 text-pine focus:ring-pine/40" />
        <span>
          J'accepte que {site.name} conserve ces informations pour étudier ma demande et me recontacter.{' '}
          <Link href={paths.confidentialite} className="link text-ink">
            En savoir plus
          </Link>
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}
