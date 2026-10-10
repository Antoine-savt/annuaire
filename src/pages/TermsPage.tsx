import type { ReactNode } from 'react';
import { site } from '../site';
import { paths } from '../routes';
import { Link } from '../router';
import { Breadcrumbs } from '../components/Breadcrumbs';

const UPDATED = '10 octobre 2026';

/** Terms of use of the professional area (accounts and listings). */
export function TermsPage() {
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
      title: 'Objet',
      body: (
        <p>
          Ces conditions encadrent l’espace professionnel de {site.name}, l’annuaire des lieux de mariage et des
          prestataires du Var édité par {publisher}. Elles s’appliquent à toute personne qui crée un compte pour publier
          la fiche d’un lieu de réception ou d’une activité de prestataire. En créant votre compte, vous les acceptez.
        </p>
      ),
    },
    {
      title: 'Votre compte',
      body: (
        <>
          <p>
            Le compte est réservé aux professionnels : propriétaires et gérants de lieux de réception, prestataires de
            mariage et leurs représentants. Les informations de votre profil doivent être exactes et tenues à jour.
          </p>
          <p>
            Vous êtes responsable de vos identifiants et de ce qui est publié depuis votre compte. La confirmation de
            votre adresse e-mail est nécessaire pour publier une fiche.
          </p>
        </>
      ),
    },
    {
      title: 'Vos fiches et vos contenus',
      body: (
        <>
          <p>
            Vous publiez vos fiches directement, sans validation préalable. Vous garantissez être le propriétaire ou le
            gérant du lieu, ou l’exploitant de l’activité présentée, ou être autorisé à les représenter, et que les
            informations publiées (capacité, tarifs, coordonnées, prestations) sont exactes.
          </p>
          <p>
            Vous garantissez détenir les droits sur les textes et les photos que vous publiez, y compris l’accord des
            personnes reconnaissables sur les photos. Vous autorisez {site.name} à les afficher, les redimensionner et les
            reproduire sur le site et dans ses aperçus (moteurs de recherche, partages sur les réseaux sociaux), gratuitement
            et pour toute la durée de publication de la fiche.
          </p>
        </>
      ),
    },
    {
      title: 'Contenus interdits et modération',
      body: (
        <>
          <p>
            Sont interdits les contenus faux ou trompeurs, illicites, injurieux ou discriminatoires, sans rapport avec le
            mariage, ainsi que la reprise des textes ou des photos d’un autre professionnel.
          </p>
          <p>
            Les fiches sont vérifiées après leur publication. En cas de manquement à ces conditions, {site.name} peut
            masquer ou supprimer une fiche et suspendre le compte concerné, sans préavis. Pour signaler une fiche :{' '}
            {contact}.
          </p>
        </>
      ),
    },
    {
      title: 'Lieux déjà présents dans l’annuaire',
      body: (
        <p>
          Certaines fiches ont été rédigées par {site.name} à partir d’informations publiques. Leur propriétaire ou
          gérant peut les revendiquer depuis son compte : après vérification, la fiche est rattachée à son compte et il la
          gère lui-même.
        </p>
      ),
    },
    {
      title: 'Tarifs',
      body: (
        <>
          <p>
            La publication est gratuite pendant la période de lancement de l’annuaire. Une offre payante, sous forme
            d’abonnement mensuel, sera proposée ensuite.
          </p>
          <p>
            Avant tout changement, nous vous présenterons l’offre et les statistiques de vos fiches. Aucun montant ne
            vous sera facturé sans votre accord exprès : vous resterez libre de souscrire ou de retirer vos fiches.
            Aucun moyen de paiement ne vous est demandé aujourd’hui.
          </p>
        </>
      ),
    },
    {
      title: 'Statistiques',
      body: (
        <p>
          {site.name} mesure de façon anonyme les consultations de vos fiches, leurs enregistrements par les couples, les
          demandes de coordonnées et les clics sur votre téléphone ou votre site. Vous les retrouvez dans votre compte.
          Les coordonnées laissées par les couples pour obtenir les vôtres ne vous sont pas transmises.
        </p>
      ),
    },
    {
      title: 'Données personnelles',
      body: (
        <p>
          Les informations de votre profil servent à gérer votre compte, à afficher vos fiches et à vous contacter au
          sujet de vos fiches et de l’offre à venir. Le détail (durées de conservation, vos droits) figure dans la{' '}
          <Link href={paths.confidentialite} className="link">
            politique de confidentialité
          </Link>
          .
        </p>
      ),
    },
    {
      title: 'Responsabilité',
      body: (
        <p>
          {site.name} est un annuaire : il met en relation les couples et les professionnels mais n’intervient pas dans
          leurs échanges ni dans les contrats qu’ils concluent, et ne garantit pas un nombre de demandes. Nous faisons
          notre possible pour que le site reste disponible, sans pouvoir le garantir en permanence.
        </p>
      ),
    },
    {
      title: 'Retrait des fiches et suppression du compte',
      body: (
        <p>
          Vous pouvez à tout moment dépublier ou supprimer vos fiches, et supprimer votre compte, depuis votre espace
          professionnel. La suppression du compte efface votre profil, vos fiches et leurs photos. Les statistiques
          anonymes déjà mesurées sont conservées sous forme de totaux.
        </p>
      ),
    },
    {
      title: 'Évolution des conditions et droit applicable',
      body: (
        <p>
          Ces conditions peuvent évoluer : vous serez prévenu par e-mail ou à votre prochaine connexion, et pourrez
          supprimer votre compte si vous ne les acceptez pas. Elles sont soumises au droit français. En cas de litige,
          une solution amiable sera recherchée avant toute action devant les tribunaux compétents.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Conditions professionnels' }]} />
      </div>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
        <h1 className="text-[2.4rem] leading-tight text-ink sm:text-5xl">Conditions d’utilisation de l’espace professionnel</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Les règles pour publier votre lieu ou votre activité sur {site.name}. Dernière mise à jour : {UPDATED}.
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
