import type { ReactNode } from 'react';
import { site } from '../site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../router';
import { paths } from '../routes';
import { useLang } from '../i18n/lang';

type Section = { title: string; body: ReactNode };

/**
 * English version of the privacy notice: a faithful translation of the French text below (same
 * data, purposes, legal bases and retention periods). The professional area is French only, so the
 * French names of its forms and buttons are kept, with a translation.
 */
function englishSections(contact: ReactNode): Section[] {
  const publisher = site.publisher || `the publisher of the ${site.name} website`;
  return [
    {
      title: 'Who collects your data',
      body: (
        <p>
          Your data is collected by {publisher}, the data controller. For any question: {contact}.
        </p>
      ),
    },
    {
      title: 'When you request a venue’s contact details',
      body: (
        <>
          <p>
            To show you a venue’s phone number and website, we ask for your first name and email address and, optionally,
            your phone number, your wedding date and the number of guests. We also record the venue concerned and the date
            of the request.
          </p>
          <p>
            This information is used to measure couples’ interest in each venue and to improve the directory. It is not
            passed on to the venues, nor sold or transferred to third parties. Venues may receive overall statistics
            (number of requests, wedding months requested), never your contact details.
          </p>
          <p>
            Legal basis: your consent, given by ticking the box on the form. Retention period: {site.leadRetentionMonths}{' '}
            months at most, after which it is deleted.
          </p>
        </>
      ),
    },
    {
      title: 'When you ask to be listed',
      body: (
        <p>
          The listing forms, for reception venues and vendors alike, collect information about your venue or business and
          your professional contact details (name, position, email, phone). This information is used solely to review your
          request, to get back to you and to prepare your listing. Legal basis: your consent. Retention period: 3 years
          after our last exchange.
        </p>
      ),
    },
    {
      title: 'When you ask us to create your portfolio',
      body: (
        <p>
          The “Déléguez la création de votre portfolio” form (have your portfolio created for you) collects your name, your
          company, your trade, your email, your phone number and, if you provide them, your current website and the
          description of your project. This information is used solely to get back to you with a proposal. Legal basis:
          your consent. Retention period: 3 years after our last exchange.
        </p>
      ),
    },
    {
      title: 'If you create a professional account',
      body: (
        <>
          <p>
            The account stores your first name, your last name, your email and, if you provide them, your phone number,
            your company, your position and your profile photo, as well as the date on which you accepted the{' '}
            <Link href={paths.terms} lang="fr" hrefLang="fr" className="link">
              terms of use
            </Link>{' '}
            (in French). The listings you publish and their photos are public by nature; your profile, however, is not.
          </p>
          <p>
            This data is used to manage your account, to display your listings, to show you their statistics and to contact
            you about your listings and the upcoming paid offer. Legal basis: the performance of the terms of use you
            accept. Retention period: for as long as your account exists. You can delete it at any time from your account
            area: your profile, listings and photos are then erased. An account that has been inactive for 3 years is
            deleted.
          </p>
          <p>
            Sign-in is handled by Firebase Authentication (Google); if you choose “Continuer avec Google” (Continue with
            Google), Google sends us your name, your email and your profile photo.
          </p>
        </>
      ),
    },
    {
      title: 'Visitor statistics',
      body: (
        <p>
          We anonymously count visits to the site, views of the listings, venues saved to “Saved venues” and
          clicks on contact details. A random identifier is kept in your browser (local storage) for 30 minutes after
          your last page, so that the same visit is not counted twice, even across several tabs. No advertising cookies,
          no tracking on other websites.
        </p>
      ),
    },
    {
      title: 'Data hosting',
      body: (
        <p>
          The data is stored on Google Cloud (Firebase service), which acts as a processor. Your browser also keeps your
          “Saved venues” selection, the listings you have already unlocked and the contact details you have entered, so you
          do not have to type them again; you can erase them by clearing the site’s data in your browser.
        </p>
      ),
    },
    {
      title: 'Your rights',
      body: (
        <p>
          You may at any time access your data, rectify it, delete it or withdraw your consent by writing to {contact}. If
          you believe your rights are not being respected, you may lodge a complaint with the CNIL, the French data
          protection authority (cnil.fr).
        </p>
      ),
    },
  ];
}

export function PrivacyPage() {
  const lang = useLang();
  const publisher = site.publisher || `l'éditeur du site ${site.name}`;
  const contact = site.contactEmail ? (
    <a href={`mailto:${site.contactEmail}`} className="link">
      {site.contactEmail}
    </a>
  ) : lang === 'en' ? (
    'the contact address shown on the site'
  ) : (
    "l'adresse de contact indiquée sur le site"
  );

  const sectionsFr: Section[] = [
    {
      title: 'Qui collecte vos données',
      body: (
        <p>
          Les données sont collectées par {publisher}, responsable du traitement. Pour toute question : {contact}.
        </p>
      ),
    },
    {
      title: 'Quand vous demandez les coordonnées d’un lieu',
      body: (
        <>
          <p>
            Pour afficher le téléphone et le site d'un lieu, nous vous demandons votre prénom et votre e-mail, et
            facultativement votre téléphone, la date de votre mariage et le nombre d'invités. Nous enregistrons aussi le
            lieu concerné et la date de la demande.
          </p>
          <p>
            Ces informations servent à mesurer l'intérêt des couples pour chaque lieu et à améliorer l'annuaire. Elles
            ne sont ni transmises aux lieux ni vendues ou cédées à des tiers. Les lieux peuvent recevoir des
            statistiques globales (nombre de demandes, mois de mariage demandés), jamais vos coordonnées.
          </p>
          <p>
            Base légale : votre consentement, donné en cochant la case du formulaire. Durée de conservation :{' '}
            {site.leadRetentionMonths} mois au maximum, puis suppression.
          </p>
        </>
      ),
    },
    {
      title: 'Quand vous demandez à être référencé',
      body: (
        <p>
          Les formulaires de référencement, pour les lieux de réception comme pour les prestataires, recueillent les
          informations sur votre lieu ou votre activité et vos coordonnées professionnelles (nom, fonction, e-mail,
          téléphone). Elles servent uniquement à étudier votre demande, à vous recontacter et à préparer votre fiche. Base légale : votre consentement. Durée de conservation : 3 ans
          après notre dernier échange.
        </p>
      ),
    },
    {
      title: 'Quand vous demandez la création de votre portfolio',
      body: (
        <p>
          Le formulaire « Déléguez la création de votre portfolio » recueille votre nom, votre entreprise, votre métier,
          votre e-mail, votre téléphone et, si vous les indiquez, votre site actuel et la description de votre projet. Ces
          informations servent uniquement à vous recontacter avec une proposition. Base légale : votre consentement. Durée
          de conservation : 3 ans après notre dernier échange.
        </p>
      ),
    },
    {
      title: 'Si vous créez un compte professionnel',
      body: (
        <>
          <p>
            Le compte enregistre votre prénom, votre nom, votre e-mail et, si vous les indiquez, votre téléphone, votre
            entreprise, votre fonction et votre photo de profil, ainsi que la date d’acceptation des{' '}
            <Link href={paths.terms} className="link">
              conditions d’utilisation
            </Link>
            . Les fiches que vous publiez et leurs photos sont publiques par nature ; votre profil, lui, ne l’est pas.
          </p>
          <p>
            Ces données servent à gérer votre compte, à afficher vos fiches, à vous montrer leurs statistiques et à vous
            contacter au sujet de vos fiches et de l’offre payante à venir. Base légale : l’exécution des conditions
            d’utilisation que vous acceptez. Durée de conservation : tant que votre compte existe. Vous pouvez le supprimer
            à tout moment depuis votre espace : profil, fiches et photos sont alors effacés. Un compte inactif pendant 3
            ans est supprimé.
          </p>
          <p>
            La connexion passe par Firebase Authentication (Google) ; si vous choisissez « Continuer avec Google », Google
            nous transmet votre nom, votre e-mail et votre photo de profil.
          </p>
        </>
      ),
    },
    {
      title: 'Statistiques de fréquentation',
      body: (
        <p>
          Nous comptons de façon anonyme les visites du site, les consultations des fiches, les enregistrements dans « Mes lieux » et les clics sur les coordonnées. Un
          identifiant aléatoire est conservé dans votre navigateur (stockage local) pendant 30 minutes après votre dernière
          page, pour ne pas compter deux fois la même visite, même sur plusieurs onglets. Aucun cookie publicitaire, aucun
          suivi sur d'autres sites.
        </p>
      ),
    },
    {
      title: 'Hébergement des données',
      body: (
        <p>
          Les données sont stockées sur Google Cloud (service Firebase), qui agit comme sous-traitant. Votre navigateur
          garde aussi en mémoire votre sélection « Mes lieux », les fiches déjà débloquées et vos coordonnées saisies, pour vous éviter de les retaper ;
          vous pouvez les effacer en vidant les données du site dans votre navigateur.
        </p>
      ),
    },
    {
      title: 'Vos droits',
      body: (
        <p>
          Vous pouvez à tout moment accéder à vos données, les rectifier, les supprimer ou retirer votre consentement en
          écrivant à {contact}. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
          réclamation à la CNIL (cnil.fr).
        </p>
      ),
    },
  ];
  const sections = lang === 'en' ? englishSections(contact) : sectionsFr;

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: lang === 'en' ? 'Privacy' : 'Confidentialité' }]} />
      </div>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
        <h1 className="text-[2.4rem] leading-tight text-ink sm:text-5xl">
          {lang === 'en' ? 'Privacy and personal data' : 'Confidentialité et données personnelles'}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {lang === 'en' ? (
            <>What {site.name} collects, why, for how long, and how to exercise your rights.</>
          ) : (
            <>Ce que {site.name} collecte, pourquoi, combien de temps, et comment exercer vos droits.</>
          )}
        </p>
        {sections.map((s) => (
          <section key={s.title} className="mt-10">
            <h2 className="text-2xl text-ink">{s.title}</h2>
            <div className="mt-3 space-y-4 text-[1.05rem] leading-relaxed text-ink/85">{s.body}</div>
          </section>
        ))}
      </article>
    </>
  );
}
