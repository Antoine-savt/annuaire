import { categoryLabel, findVendorCategory } from '../vendors';
import { paths } from '../paths';
import { site } from '../site';
import { siteChateauUrl } from '../components/SiteChateauOffer';

/*
 * Prospecting in /admin ("Prospection" tab): venues and vendors to call and e-mail so they create
 * their listing. Stored in the Firestore "prospects" collection, readable by the admins only.
 */

export type ProspectStatus = 'a_appeler' | 'a_rappeler' | 'mail_a_envoyer' | 'mail_envoye' | 'inscrit' | 'refus';

export const STATUSES: { key: ProspectStatus; label: string; className: string }[] = [
  { key: 'a_appeler', label: 'À appeler', className: 'bg-sage-soft text-pine-dark' },
  { key: 'a_rappeler', label: 'À rappeler', className: 'bg-[#fbf1dc] text-[#7a5a12]' },
  { key: 'mail_a_envoyer', label: 'Mail à envoyer', className: 'bg-[#e7eefb] text-[#1f3f7a]' },
  { key: 'mail_envoye', label: 'Mail envoyé', className: 'bg-[#efe7fb] text-[#4b2a7a]' },
  { key: 'inscrit', label: 'Inscrit', className: 'bg-pine text-white' },
  { key: 'refus', label: 'Pas intéressé', className: 'bg-red-50 text-red-800' },
];

export const statusInfo = (key: ProspectStatus) => STATUSES.find((s) => s.key === key) ?? STATUSES[0];

/** Still to work on (not signed up, not refused). */
export const isActive = (s: ProspectStatus) => s !== 'inscrit' && s !== 'refus';

export type CallOutcome = 'interesse' | 'rappeler' | 'messagerie' | 'sans_reponse' | 'pas_interesse';

/** What a call leads to: the next status and, by default, when to act again (in days). */
export const OUTCOMES: { key: CallOutcome; label: string; reached: boolean; status: ProspectStatus; nextInDays: number | null }[] = [
  { key: 'interesse', label: 'Joint : intéressé, je lui envoie le lien', reached: true, status: 'mail_a_envoyer', nextInDays: 0 },
  { key: 'rappeler', label: 'Joint : à rappeler plus tard', reached: true, status: 'a_rappeler', nextInDays: 7 },
  { key: 'messagerie', label: 'Messagerie : message laissé', reached: false, status: 'a_rappeler', nextInDays: 2 },
  { key: 'sans_reponse', label: 'Pas de réponse', reached: false, status: 'a_rappeler', nextInDays: 1 },
  { key: 'pas_interesse', label: 'Joint : pas intéressé', reached: true, status: 'refus', nextInDays: null },
];

export interface HistoryEntry {
  /** Milliseconds. */
  at: number;
  /** E-mail of the admin. */
  by: string;
  type: 'creation' | 'appel' | 'mail' | 'note' | 'statut';
  text: string;
  outcome?: CallOutcome;
}

export interface Prospect {
  id: string;
  /** Venue or business name. */
  name: string;
  /** Person to ask for. */
  contact: string;
  kind: 'lieu' | 'prestataire';
  /** "lieu" or a vendor category slug. */
  category: string;
  commune: string;
  phone: string;
  email: string;
  website: string;
  status: ProspectStatus;
  notes: string;
  /** Next call or e-mail (YYYY-MM-DD), empty when nothing is planned. */
  nextAction: string;
  calls: number;
  /** Reached at least once on the phone. */
  reached: boolean;
  emails: number;
  /** Admin following this prospect (e-mail). */
  owner: string;
  /** Curated venue of the directory: the owner claims its listing instead of creating one. */
  venueSlug: string;
  history: HistoryEntry[];
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

const str = (v: unknown) => (typeof v === 'string' ? v : '');
const millis = (v: unknown) =>
  v && typeof v === 'object' && 'toMillis' in v && typeof (v as { toMillis: unknown }).toMillis === 'function'
    ? (v as { toMillis: () => number }).toMillis()
    : 0;

export function toProspect(id: string, d: Record<string, unknown>): Prospect {
  const status = STATUSES.some((s) => s.key === d.status) ? (d.status as ProspectStatus) : 'a_appeler';
  return {
    id,
    name: str(d.name),
    contact: str(d.contact),
    kind: d.kind === 'prestataire' ? 'prestataire' : 'lieu',
    category: str(d.category) || 'lieu',
    commune: str(d.commune),
    phone: str(d.phone),
    email: str(d.email),
    website: str(d.website),
    status,
    notes: str(d.notes),
    nextAction: str(d.nextAction),
    calls: Number(d.calls) || 0,
    reached: d.reached === true,
    emails: Number(d.emails) || 0,
    owner: str(d.owner),
    venueSlug: str(d.venueSlug),
    history: Array.isArray(d.history) ? (d.history as HistoryEntry[]) : [],
    createdBy: str(d.createdBy),
    createdAt: millis(d.createdAt),
    updatedAt: millis(d.updatedAt),
  };
}

/** Editable fields, as saved (empty strings rather than missing fields). */
export type ProspectFields = Pick<
  Prospect,
  'name' | 'contact' | 'kind' | 'category' | 'commune' | 'phone' | 'email' | 'website' | 'notes' | 'nextAction' | 'owner' | 'venueSlug'
>;

export function cleanFields(f: ProspectFields): ProspectFields {
  return {
    name: f.name.trim().slice(0, 120),
    contact: f.contact.trim().slice(0, 120),
    kind: f.kind,
    category: f.kind === 'lieu' ? 'lieu' : f.category,
    commune: f.commune.trim().slice(0, 80),
    phone: f.phone.trim().slice(0, 40),
    email: f.email.trim().toLowerCase().slice(0, 200),
    website: f.website.trim().slice(0, 200),
    notes: f.notes.slice(0, 4000),
    nextAction: f.nextAction,
    owner: f.owner.trim().toLowerCase().slice(0, 200),
    venueSlug: f.kind === 'lieu' ? f.venueSlug : '',
  };
}

/** Last 9 digits of a French phone number, to spot duplicates whatever the format (+33, spaces…). */
export const phoneKey = (phone: string) => phone.replace(/\D/g, '').slice(-9);

/** YYYY-MM-DD in local time. */
export function dayString(date = new Date()): string {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return d.toISOString().slice(0, 10);
}

export const inDays = (days: number) => dayString(new Date(Date.now() + days * 86_400_000));

export const frenchDate = (day: string) =>
  day ? new Date(`${day}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) : '';

// ---------- E-mails ----------

const origin = () => site.url || (typeof window !== 'undefined' ? window.location.origin : '');

/**
 * Sign-up link sent to a prospect: creating the account leads straight to a new listing of the right
 * kind, or to the claim form of their venue when it is already in the directory.
 */
export function signupLink(p: Pick<Prospect, 'kind' | 'category' | 'venueSlug'>): string {
  const next = p.venueSlug
    ? `${paths.account}?revendiquer=${encodeURIComponent(p.venueSlug)}`
    : p.kind === 'lieu'
      ? paths.newListing('lieu')
      : paths.newListing('prestataire', findVendorCategory(p.category) ? p.category : undefined);
  return `${origin()}${paths.login}?mode=inscription&suite=${encodeURIComponent(next)}`;
}

export interface MailTemplate {
  key: 'apres_appel' | 'premier_contact' | 'relance';
  label: string;
  subject: string;
  body: string;
}

/** Ready-to-send e-mails, filled with the prospect's details; the admin can edit them before sending. */
export function mailTemplates(p: Prospect, signature: string): MailTemplate[] {
  const hello = p.contact.trim() ? `Bonjour ${p.contact.trim()},` : 'Bonjour,';
  const link = signupLink(p);
  const sign = signature.trim() || site.name;
  const job = p.kind === 'prestataire' ? categoryLabel(p.category).toLowerCase() : '';
  const claim = !!p.venueSlug;

  // "le lien pour…", completed by each e-mail.
  const linkFor = claim
    ? `le lien pour créer votre compte et revendiquer la fiche de ${p.name}, qui figure déjà dans notre sélection : vous pourrez ensuite la compléter et la mettre à jour vous-même.`
    : p.kind === 'lieu'
      ? `le lien pour créer votre compte et présenter ${p.name} sur ${site.name}, le guide des lieux de mariage du Var.`
      : `le lien pour créer votre compte et proposer vos services${job ? ` (${job})` : ''} sur ${site.name}, le guide du mariage dans le Var.`;

  const benefits = claim
    ? 'Une fois la fiche revendiquée, vous ajoutez vos propres photos, vos capacités et vos tarifs à jour. Le référencement est gratuit pendant la phase de lancement, et vous suivez depuis votre compte le nombre de couples qui consultent votre fiche et demandent vos coordonnées.'
    : p.kind === 'lieu'
      ? 'En quelques minutes, vous ajoutez vos photos, vos capacités et vos tarifs, et votre fiche est en ligne. Le référencement est gratuit pendant la phase de lancement, et vous suivez depuis votre compte le nombre de couples qui consultent votre fiche et demandent vos coordonnées.'
      : 'En quelques minutes, vous présentez vos réalisations, vos tarifs et le lien vers votre portfolio, et votre fiche est en ligne. Le référencement est gratuit pendant la phase de lancement, et vous suivez depuis votre compte le nombre de couples qui consultent votre fiche et demandent vos coordonnées.';

  const portfolio =
    p.kind === 'prestataire'
      ? `\n\nSi vous n'avez pas encore de portfolio, ${site.name} peut aussi le créer pour vous, à tarif réduit pour les professionnels référencés.`
      : '';

  // Venues without a website: the partner studio can build one.
  const website =
    p.kind === 'lieu' && !p.website.trim()
      ? `

Et si votre lieu n'a pas encore de site internet, notre studio partenaire Site-Chateau.fr conçoit des sites pour les châteaux, domaines et lieux de réception : ${siteChateauUrl('mail-prospection')}`
      : '';

  const subjectName = p.name || site.name;

  return [
    {
      key: 'apres_appel',
      label: 'Après un appel',
      subject: claim ? `${subjectName} : votre fiche sur ${site.name}` : `${subjectName} sur ${site.name}, suite à notre appel`,
      body: `${hello}

Suite à notre appel, voici ${linkFor}

${link}

${benefits}${portfolio}${website}

Je reste disponible pour toute question, ou pour vous aider à remplir la fiche.

Bien cordialement,
${sign}`,
    },
    {
      key: 'premier_contact',
      label: 'Premier contact (sans appel)',
      subject: `${subjectName} sur ${site.name}, le guide du mariage dans le Var`,
      body: `${hello}

Je me permets de vous écrire de la part de ${site.name}, un guide en ligne des lieux de réception et des prestataires de mariage du Var, consulté par les couples qui préparent leur mariage.

Nous serions ravis de vous y présenter. Voici ${linkFor}

${link}

${benefits}${portfolio}${website}

Je peux aussi vous appeler pour en parler quelques minutes, à votre convenance.

Bien cordialement,
${sign}`,
    },
    {
      key: 'relance',
      label: 'Relance',
      subject: `Relance : ${subjectName} sur ${site.name}`,
      body: `${hello}

Je reviens vers vous au sujet de ${site.name}. Avez-vous eu le temps de créer votre compte ? Voici à nouveau le lien :

${link}

Si vous le souhaitez, je peux remplir la fiche avec vous par téléphone : cela prend une dizaine de minutes.

Bien cordialement,
${sign}`,
    },
  ];
}

export const mailtoHref = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// ---------- Statistics ----------

export interface ProspectStats {
  total: number;
  toCall: number;
  called: number;
  calls: number;
  callsThisWeek: number;
  reached: number;
  interested: number;
  emailed: number;
  /** Interested, e-mail not sent yet. */
  toEmail: number;
  signedUp: number;
  refused: number;
  late: number;
  /** Calls per day over the last 14 days, oldest first. */
  days: { day: string; calls: number; mails: number }[];
  /** Calls per admin. */
  byAdmin: { email: string; calls: number; mails: number; signedUp: number }[];
  /** Average days between the first call and the sign-up, when known. */
  daysToSignup: number | null;
}

export const ratio = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)} %` : '–');

/** Statistics of the prospects; "signupAt" gives the account creation date of the ones who signed up. */
export function prospectStats(list: Prospect[], signupAt: Map<string, number>): ProspectStats {
  const today = dayString();
  const weekAgo = Date.now() - 7 * 86_400_000;
  const days = Array.from({ length: 14 }, (_, i) => ({ day: dayString(new Date(Date.now() - (13 - i) * 86_400_000)), calls: 0, mails: 0 }));
  const dayIndex = new Map(days.map((d, i) => [d.day, i]));
  const admins = new Map<string, { email: string; calls: number; mails: number; signedUp: number }>();
  const admin = (email: string) => {
    if (!admins.has(email)) admins.set(email, { email, calls: 0, mails: 0, signedUp: 0 });
    return admins.get(email)!;
  };
  let callsThisWeek = 0;
  const delays: number[] = [];

  for (const p of list) {
    for (const h of p.history) {
      const i = dayIndex.get(dayString(new Date(h.at)));
      if (h.type === 'appel') {
        admin(h.by).calls++;
        if (h.at >= weekAgo) callsThisWeek++;
        if (i !== undefined) days[i].calls++;
      } else if (h.type === 'mail') {
        admin(h.by).mails++;
        if (i !== undefined) days[i].mails++;
      }
    }
    if (p.status === 'inscrit') {
      admin(p.owner || p.createdBy).signedUp++;
      const firstCall = p.history.filter((h) => h.type === 'appel').map((h) => h.at).sort((a, b) => a - b)[0];
      const signup = signupAt.get(p.id);
      if (firstCall && signup && signup >= firstCall) delays.push((signup - firstCall) / 86_400_000);
    }
  }

  return {
    total: list.length,
    toCall: list.filter((p) => p.status === 'a_appeler').length,
    called: list.filter((p) => p.calls > 0).length,
    calls: list.reduce((n, p) => n + p.calls, 0),
    callsThisWeek,
    reached: list.filter((p) => p.reached).length,
    interested: list.filter((p) => ['mail_a_envoyer', 'mail_envoye', 'inscrit'].includes(p.status)).length,
    emailed: list.filter((p) => p.emails > 0).length,
    toEmail: list.filter((p) => p.status === 'mail_a_envoyer').length,
    signedUp: list.filter((p) => p.status === 'inscrit').length,
    refused: list.filter((p) => p.status === 'refus').length,
    late: list.filter((p) => isActive(p.status) && p.nextAction && p.nextAction < today).length,
    days,
    byAdmin: [...admins.values()].filter((a) => a.email).sort((a, b) => b.calls - a.calls),
    daysToSignup: delays.length ? Math.round((delays.reduce((a, b) => a + b, 0) / delays.length) * 10) / 10 : null,
  };
}
