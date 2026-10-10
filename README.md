# L'Édition — Lieux de mariage dans le Var

Annuaire des lieux de réception et des prestataires de mariage dans le Var (React + Vite + Tailwind CSS, Firebase).

## Développement

```bash
bun install
bun run dev
```

## Production

1. Renseignez l'URL publique du site dans `.env` (voir `.env.example`) :

   ```
   SITE_URL=https://www.votre-domaine.fr
   ```

   Elle sert aux balises canoniques, à Open Graph et au `sitemap.xml`.

2. Lancez le build :

   ```bash
   bun run build
   ```

   Chaque page (accueil, secteurs, fiches lieux et prestataires, articles…) est pré-rendue en HTML statique dans
   `dist/`, avec ses balises SEO et ses données structurées, ainsi que `sitemap.xml`, `robots.txt` et `404.html`.
   Le build lit aussi les fiches publiées par les professionnels dans Firestore : elles ont leur page statique.
   Le dossier `dist/` se déploie sur n'importe quel hébergeur statique (Netlify, Vercel, Cloudflare Pages…).

3. Mise en ligne sur Netlify (site `ledition-mariage-var`, https://ledition-mariage-var.netlify.app) :

   ```bash
   netlify deploy --prod --dir dist --no-build
   ```

   Chaque page est écrite en `chemin.html` (par ex. `dist/lieux/chateau-pimo.html`) : Netlify la sert à l'adresse
   sans barre finale, identique aux liens canoniques et au sitemap. Les variables Firebase et `SITE_URL` sont aussi
   enregistrées dans Netlify, pour un build fait par Netlify (`netlify.toml`).

4. **Relancez le build régulièrement** (par exemple chaque nuit) : une fiche publiée par un professionnel est visible
   tout de suite sur le site, mais n'a sa page statique (et sa place dans le sitemap, donc dans Google) qu'après le
   build suivant. De même, une fiche dépubliée ou masquée disparaît des listes statiques au build suivant (sa page,
   elle, se retire dès qu'on l'ouvre).

## Statistiques et demandes de coordonnées (Firebase)

Le téléphone et le site des lieux et des prestataires ne s'affichent qu'après un court formulaire. Chaque vue de
fiche, ouverture du formulaire, demande, enregistrement dans « Mes lieux » et clic sur les coordonnées est enregistré
dans Firestore, et consultable sur `/admin` (et, pour ses propres fiches, par chaque professionnel dans son compte).

## Espace professionnel

Les propriétaires de lieux et les prestataires créent un compte (`/connexion`), complètent leur profil (`/compte`) et
publient eux-mêmes leurs fiches (`/compte/fiche`), avec leurs photos. Les fiches sont publiées sans validation
préalable : L'Édition les vérifie ensuite dans `/admin` > Professionnels (masquer, rétablir, supprimer). Un
propriétaire peut aussi revendiquer un lieu déjà présent dans l'annuaire : après acceptation dans `/admin`, la fiche
passe en brouillon dans son compte, il ajoute ses photos et la publie.

Sécurité (`firestore.rules`, `storage.rules`) : chacun ne modifie que ses fiches et ses photos, publier exige un
e-mail confirmé, les adresses des lieux de l'annuaire sont réservées, les demandes des couples et les comptes ne sont
lisibles que par les administrateurs.

## Mise en place de Firebase (une seule fois)

1. Projet sur [console.firebase.google.com](https://console.firebase.google.com), **forfait Blaze** (nécessaire pour
   le stockage des photos ; l'usage d'un annuaire reste dans les quotas gratuits).
2. **Firestore Database** : base en Europe (`europe-west`), mode production.
3. **Authentication** > Commencer > activez **Adresse e-mail/Mot de passe** et **Google**.
   Dans Paramètres > Domaines autorisés, ajoutez le domaine du site. Dans Modèles, passez la langue en français.
4. **Storage** > Commencer, emplacement en Europe, mode production.
5. **Paramètres du projet** > Vos applications > application Web : copiez `apiKey`, `authDomain`, `projectId`,
   `appId` et `storageBucket` dans `.env` (voir `.env.example`).
6. Publiez les règles et l'index :

   ```bash
   firebase deploy --only firestore,storage
   ```

7. Protégez les adresses des lieux de l'annuaire (à relancer après en avoir ajouté dans `src/data.ts`) :

   ```bash
   node scripts/firebase-admin.mjs reserve
   ```

8. Créez votre compte sur `/connexion`, puis donnez-lui l'accès à `/admin` :

   ```bash
   node scripts/firebase-admin.mjs admin votre@email.fr
   ```

9. Remplissez `publisher` et `contactEmail` dans `src/site.ts` : ils apparaissent sur les pages Confidentialité et
   Conditions (obligatoire RGPD). Faites relire `src/pages/TermsPage.tsx` (conditions des professionnels).

En développement, aucune statistique n'est enregistrée sauf si `VITE_TRACK_IN_DEV=true`, pour ne pas fausser les
chiffres.

## Tester sans toucher aux vraies données (émulateurs)

Les émulateurs Firebase reproduisent en local la connexion, la base et le stockage des photos, avec les mêmes règles
de sécurité. Dans deux terminaux :

```bash
npm run emulators
```

```bash
npm run dev:emulators
```

Le site de test utilise alors les émulateurs (comptes, fiches, photos et statistiques fictifs, effacés à l'arrêt).
Les e-mails de confirmation ne partent pas : leurs liens s'affichent sur
`http://127.0.0.1:9099/emulator/v1/projects/annuaire-596c5/oobCodes`. Le script d'administration fonctionne aussi
avec les émulateurs :

```bash
FIRESTORE_EMULATOR_HOST=127.0.0.1:8085 FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 node scripts/firebase-admin.mjs reserve
```

`npm run emulators` utilise firebase-tools 13, compatible avec Java 17 (les versions récentes exigent Java 21).

## Contenu

- Lieux et secteurs : `src/data.ts`
- Fiches publiées par les professionnels : Firestore, collection `listings` (voir `src/catalog.ts`)
- Articles du Journal : `src/articles.ts`
- Catégories de prestataires (pages /prestataires/…, menu, conseils) : `src/vendors.ts`
- Photos (Unsplash, illustratives) : `src/images.ts`
- Réglages du site (e-mail de contact, liens du photographe partenaire) : `src/site.ts`
