import type { ReactNode } from 'react';
import { site } from '../site';
import { paths } from '../routes';
import { Link } from '../router';
import { Breadcrumbs } from '../components/Breadcrumbs';

/** Legal notice (mentions légales): L'Édition is published by Wheeloh. Empty values in src/site.ts are left out. */
export function LegalNoticePage() {
  const { legal, host, contactEmail } = site;
  const email = contactEmail ? (
    <a href={`mailto:${contactEmail}`} className="link">
      {contactEmail}
    </a>
  ) : null;

  const sections: { title: string; body: ReactNode }[] = [
    {
      title: 'Éditeur du site',
      body: (
        <>
          <p>
            {site.name} est un service édité par <strong className="font-semibold">{legal.company}</strong>, qui l’exploite
            sous le nom commercial « {site.name} ».
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Raison sociale : {legal.company}</li>
            {legal.legalForm && <li>Forme juridique : {legal.legalForm}</li>}
            {legal.address && <li>Siège social : {legal.address}</li>}
            {legal.registration && <li>Immatriculation : {legal.registration}</li>}
            {legal.vatNumber && <li>N° de TVA intracommunautaire : {legal.vatNumber}</li>}
            {legal.phone && <li>Téléphone : {legal.phone}</li>}
            {email && <li>E-mail : {email}</li>}
            {legal.website && (
              <li>
                Site web :{' '}
                <a href={legal.website} target="_blank" rel="noopener" className="link">
                  {legal.website.replace('https://', '')}
                </a>
              </li>
            )}
          </ul>
        </>
      ),
    },
    ...(legal.publicationDirector
      ? [
          {
            title: 'Directeur de la publication',
            body: <p>{legal.publicationDirector}, pour {legal.company}.</p>,
          },
        ]
      : []),
    {
      title: 'Hébergement',
      body: (
        <>
          <p>
            Le site est hébergé par {host.name}, {host.address} (
            <a href={host.url} target="_blank" rel="noopener" className="link">
              {host.url.replace('https://', '')}
            </a>
            ).
          </p>
          <p>
            Les comptes professionnels, les fiches et les demandes de contact sont stockés avec Firebase, service fourni par
            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.
          </p>
        </>
      ),
    },
    {
      title: 'Propriété intellectuelle',
      body: (
        <>
          <p>
            Les textes, la présentation et la marque {site.name} sont la propriété de {legal.company}. Toute reproduction,
            même partielle, sans autorisation écrite préalable est interdite.
          </p>
          <p>
            Les textes et photos publiés par les professionnels sur leurs fiches restent leur propriété et sont publiés sous
            leur responsabilité, selon les{' '}
            <Link href={paths.terms} className="link">
              conditions de l’espace professionnel
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      title: 'Informations publiées',
      body: (
        <p>
          Les tarifs, capacités et prestations sont donnés à titre indicatif, à partir d’informations publiques ou fournies
          par les professionnels. Ils doivent être confirmés auprès de chaque lieu ou prestataire. Pour signaler une erreur
          ou demander le retrait d’un contenu : {email ?? 'utilisez l’adresse de contact du site'}.
        </p>
      ),
    },
    {
      title: 'Nous contacter',
      body: (
        <ul className="list-disc space-y-1 pl-6">
          {email && <li>Par e-mail : {email}</li>}
          {legal.phone && <li>Par téléphone : {legal.phone}</li>}
          {legal.address && (
            <li>
              Par courrier : {legal.company}, {legal.address}
            </li>
          )}
        </ul>
      ),
    },
    {
      title: 'Données personnelles',
      body: (
        <p>
          Le traitement de vos données personnelles est détaillé dans la{' '}
          <Link href={paths.confidentialite} className="link">
            politique de confidentialité
          </Link>
          .
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Mentions légales' }]} />
      </div>
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
        <h1 className="text-[2.4rem] leading-tight text-ink sm:text-5xl">Mentions légales</h1>
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
