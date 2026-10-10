import type { ReactNode } from 'react';
import { site } from '../site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../router';
import { paths } from '../routes';

export function PrivacyPage() {
  const publisher = site.publisher || `l'éditeur du site ${site.name}`;
  const contact = site.contactEmail ? (
    <a href={`mailto:${site.contactEmail}`} className="link">
      {site.contactEmail}
    </a>
  ) : (
    "l'adresse de contact indiquée sur le site"
  );

  const sections: { title: string; body: ReactNode }[] = [
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
          Nous comptons de façon anonyme les consultations des fiches, les enregistrements dans « Mes lieux » et les clics sur les coordonnées. Un
          identifiant aléatoire est conservé dans votre navigateur le temps de la session (stockage de session, effacé à
          la fermeture de l'onglet) pour ne pas compter deux fois la même visite. Aucun cookie publicitaire, aucun suivi
          sur d'autres sites.
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

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Confidentialité' }]} />
      </div>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
        <h1 className="text-[2.4rem] leading-tight text-ink sm:text-5xl">Confidentialité et données personnelles</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Ce que {site.name} collecte, pourquoi, combien de temps, et comment exercer vos droits.
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
