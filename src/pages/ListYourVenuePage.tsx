import { FormEvent, useId, useState } from 'react';
import { venues, zones } from '../data';
import { listingFaq } from '../faq';
import { emptyListing, ListingInput, submitListing } from '../lib/submissions';
import { Link } from '../router';
import { paths } from '../routes';
import { site } from '../site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Faq } from '../components/Faq';
import { PricingNotice } from '../components/PricingNotice';
import { SelfServeCta, signupHref } from '../components/SelfServeCta';

const benefits = [
  {
    title: 'Une fiche complète',
    text: 'Photos, capacité, hébergement, tarifs indicatifs et ce qui rend votre lieu unique, présentés de façon claire et comparable.',
  },
  {
    title: 'Des couples qui cherchent dans le Var',
    text: "L'annuaire est entièrement consacré aux mariages dans le Var, secteur par secteur : vos visiteurs préparent un mariage près de chez vous.",
  },
  {
    title: 'Des demandes qualifiées',
    text: "Avant d'obtenir vos coordonnées, les couples indiquent leur date et leur nombre d'invités. Ils vous contactent ensuite directement.",
  },
  {
    title: 'Vos statistiques',
    text: 'Visiteurs de votre fiche, enregistrements par les couples, demandes de coordonnées : vous suivez vos chiffres depuis votre compte.',
  },
];

const steps = [
  { title: 'Vous créez votre compte', text: 'Deux minutes suffisent : votre nom, votre e-mail, un mot de passe ou votre compte Google.' },
  { title: 'Vous remplissez votre fiche', text: 'Photos, capacités, hébergement, tarifs et coordonnées : vous la modifiez quand vous voulez.' },
  { title: 'Elle est en ligne aussitôt', text: 'Elle apparaît dans l’annuaire, sur la page de votre secteur et dans les recherches des couples.' },
];

const venueTypes = ['Château', 'Domaine viticole', 'Bastide ou mas', 'Villa', 'Salle de réception', 'Lieu insolite', 'Autre'];
const roles = ['Propriétaire', 'Gérant ou directeur', 'Responsable événementiel', 'Autre'];

const emptyForm: ListingInput = { ...emptyListing, category: 'lieu' };

const fieldClass =
  'mt-1.5 w-full rounded-xl border-line bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 focus:border-pine focus:ring-pine/30';
const labelClass = 'block text-sm font-semibold text-ink';
const optional = <span className="font-normal text-muted">(facultatif)</span>;

export function ListYourVenuePage() {
  const ids = useId();
  const [form, setForm] = useState<ListingInput>(emptyForm);
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

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Référencer mon lieu' }]} />
      </div>

      <header className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8">
        <p className="text-sm font-semibold text-pine">Propriétaires et gérants de lieux</p>
        <h1 className="mt-3 max-w-4xl text-[2.5rem] leading-[1.05] text-ink sm:text-6xl">
          Référencez votre lieu de réception dans le Var
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Château, domaine viticole, bastide, villa ou salle de réception : présentez votre lieu aux couples qui préparent
          leur mariage dans le Var. Le référencement est gratuit pendant le lancement de l'annuaire, puis deviendra payant.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={signupHref('lieu')} className="btn-primary">
            Créer mon compte et publier
          </Link>
          <a href="#formulaire" className="btn-ghost">
            Nous confier la fiche
          </a>
          <Link href="/#lieux" className="btn-ghost">
            Voir les {venues.length} lieux déjà référencés
          </Link>
        </div>
      </header>

      <section aria-labelledby="pourquoi" className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="pourquoi" className="text-3xl text-ink sm:text-4xl">
            Pourquoi référencer votre lieu sur {site.name}
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.title}>
                <h3 className="font-sans text-lg font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="etapes" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 id="etapes" className="text-3xl text-ink sm:text-4xl">
          Comment ça marche
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="font-display text-3xl text-pine">{i + 1}</span>
              <h3 className="mt-2 font-sans text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">
          Nous référençons les lieux du Var qui accueillent des mariages : châteaux, domaines viticoles, bastides et mas,
          villas, salles de réception et lieux insolites, de la{' '}
          <Link href={paths.zone('dracenie')} className="link text-ink">
            Dracénie
          </Link>{' '}
          au{' '}
          <Link href={paths.zone('littoral')} className="link text-ink">
            littoral
          </Link>
          . Pour attirer davantage de couples, lisez aussi nos{' '}
          <Link href={paths.article('attirer-couples-lieu-reception-mariage')} className="link text-ink">
            conseils aux lieux de réception
          </Link>
          .
        </p>
      </section>

      <section id="formulaire" aria-labelledby="formulaire-titre" className="border-t border-line bg-sage-soft/60">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h2 id="formulaire-titre" className="text-3xl text-ink sm:text-4xl">
            Référencer mon lieu
          </h2>
          <div className="mt-6">
            <PricingNotice />
          </div>
          <div className="mt-6">
            <SelfServeCta type="lieu" />
          </div>
          <p className="mt-10 leading-relaxed text-muted">
            Votre lieu est déjà dans l’annuaire ? Créez votre compte, puis revendiquez sa fiche pour la gérer vous-même.
            Vous préférez que nous préparions la fiche avec vous ? Envoyez-nous ce formulaire, nous vous recontactons.
          </p>

          {status === 'sent' ? (
            <div role="status" className="mt-8 rounded-2xl border border-pine bg-white p-6">
              <p className="font-display text-2xl text-ink">Merci, votre demande est bien envoyée.</p>
              <p className="mt-2 leading-relaxed text-muted">
                Nous revenons vers vous rapidement à l'adresse {form.email} pour compléter la fiche de {form.name}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setStatus('idle');
                }}
                className="btn-ghost mt-5"
              >
                Référencer un autre lieu
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-8">
              <fieldset>
                <legend className={labelClass}>Votre demande</legend>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {(
                    [
                      ['nouveau', 'Ajouter un nouveau lieu'],
                      ['mise-a-jour', 'Mettre à jour une fiche existante'],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value} className="flex cursor-pointer items-center gap-2.5 text-[0.95rem]">
                      <input
                        type="radio"
                        name={`${ids}-kind`}
                        value={value}
                        checked={form.kind === value}
                        onChange={() => update({ kind: value })}
                        className="h-4 w-4 border-ink/30 text-pine focus:ring-pine/40"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <h3 className="mt-8 font-sans text-base font-semibold text-pine">Le lieu</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Nom du lieu
                  <input required value={form.name} onChange={(e) => update({ name: e.target.value })} className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Commune
                  <input required value={form.commune} onChange={(e) => update({ commune: e.target.value })} className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Secteur {optional}
                  <select value={form.zone} onChange={(e) => update({ zone: e.target.value })} className={fieldClass}>
                    <option value="">Je ne sais pas</option>
                    {zones.map((z) => (
                      <option key={z.slug} value={z.name}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Type de lieu {optional}
                  <select value={form.subtype} onChange={(e) => update({ subtype: e.target.value })} className={fieldClass}>
                    <option value="">Choisir</option>
                    {venueTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  Invités maximum {optional}
                  <input type="number" inputMode="numeric" min={1} value={form.capacity} onChange={(e) => update({ capacity: e.target.value })} className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Couchages sur place {optional}
                  <input type="number" inputMode="numeric" min={0} value={form.sleeps} onChange={(e) => update({ sleeps: e.target.value })} className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Prix de départ {optional}
                  <input value={form.priceFrom} onChange={(e) => update({ priceFrom: e.target.value })} placeholder="Ex. location dès 4 000 €" className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Site web {optional}
                  <input type="url" value={form.website} onChange={(e) => update({ website: e.target.value })} placeholder="https://" className={fieldClass} />
                </label>
              </div>

              <h3 className="mt-8 font-sans text-base font-semibold text-pine">Vos coordonnées</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Prénom et nom
                  <input required autoComplete="name" value={form.contactName} onChange={(e) => update({ contactName: e.target.value })} className={fieldClass} />
                </label>
                <label className={labelClass}>
                  Fonction {optional}
                  <select value={form.role} onChange={(e) => update({ role: e.target.value })} className={fieldClass}>
                    <option value="">Choisir</option>
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
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
                    placeholder="Ce qui rend votre lieu unique, les informations à corriger…"
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
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <Faq items={listingFaq} title="Questions des propriétaires" />
      </div>
    </>
  );
}
