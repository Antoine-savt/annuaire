// Administration tasks that the site itself cannot do (they bypass the security rules):
//
//   node scripts/firebase-admin.mjs reserve          protect the addresses of the curated venues
//   node scripts/firebase-admin.mjs admin <e-mail>   give an account access to /admin
//   node scripts/firebase-admin.mjs team <e-mail> [--goals] [--team] [--manage]
//                                                    give an e-mail address access to /admin, even before
//                                                    its account exists (then from the "Équipe" tab)
//
// Against the real project, it uses your Firebase CLI login (run `firebase login` first).
// Against the local emulators (npm run emulators), set FIRESTORE_EMULATOR_HOST=127.0.0.1:8085
// and FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, '.env'), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
const project = env.VITE_FIREBASE_PROJECT_ID;
if (!project) throw new Error('VITE_FIREBASE_PROJECT_ID manquant dans .env');

const firestoreEmulator = process.env.FIRESTORE_EMULATOR_HOST;
const authEmulator = process.env.FIREBASE_AUTH_EMULATOR_HOST;

/** OAuth token of the Firebase CLI login (the emulators accept "owner"). */
function token(emulated) {
  if (emulated) return 'owner';
  const file = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
  const tokens = JSON.parse(fs.readFileSync(file, 'utf8')).tokens;
  if (!tokens?.access_token || tokens.expires_at < Date.now() + 60_000) {
    throw new Error('Connexion Firebase expirée : lancez `firebase projects:list` (ou `firebase login`), puis relancez ce script.');
  }
  return tokens.access_token;
}

const documents = `${firestoreEmulator ? `http://${firestoreEmulator}` : 'https://firestore.googleapis.com'}/v1/projects/${project}/databases/(default)/documents`;

async function call(url, options, emulated) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token(emulated)}`, 'x-goog-user-project': project },
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${response.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

/** Create or replace a document with string fields and a server timestamp. */
function setDoc(docPath, fields) {
  const body = {
    fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { stringValue: String(v) }])),
  };
  return call(`${documents}/${docPath}`, { method: 'PATCH', body: JSON.stringify(body) }, !!firestoreEmulator);
}

/** JavaScript value to a Firestore REST value (Date as a timestamp). */
function encode(value) {
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(encode) } };
  if (value && typeof value === 'object') {
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encode(v)])) } };
  }
  return { stringValue: String(value) };
}

/** Create or replace a document with typed fields. */
function setTypedDoc(docPath, fields) {
  const body = { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, encode(v)])) };
  return call(`${documents}/${docPath}`, { method: 'PATCH', body: JSON.stringify(body) }, !!firestoreEmulator);
}

/** Slugs and names of the curated venues, read from src/data.ts. */
function curatedVenues() {
  const source = fs.readFileSync(path.join(root, 'src', 'data.ts'), 'utf8');
  const start = source.indexOf('const rawVenues');
  const end = source.indexOf('\n];', start);
  const block = source.slice(start, end);
  return block
    .split(/\n {2}\{/)
    .map((entry) => ({
      slug: entry.match(/\n\s*slug: '([^']+)'/)?.[1],
      name: entry.match(/\n\s*nom_du_lieu: (['"])(.+?)\1,/)?.[2],
    }))
    .filter((v) => v.slug && v.name);
}

const [command, arg] = process.argv.slice(2);

// Errors are printed as a message: an uncaught error during a network request crashes Node on Windows.
try {
  if (command === 'reserve') {
    const list = curatedVenues();
    if (!list.length) throw new Error('Aucun lieu trouvé dans src/data.ts');
    for (const v of list) await setDoc(`reserved/${v.slug}`, { name: v.name, at: new Date().toISOString() });
    console.log(`${list.length} adresses de lieux protégées${firestoreEmulator ? ' (émulateur)' : ''} : ${list.map((v) => v.slug).join(', ')}`);
  } else if (command === 'admin' && arg) {
    const auth = authEmulator
      ? `http://${authEmulator}/identitytoolkit.googleapis.com/v1/projects/${project}`
      : `https://identitytoolkit.googleapis.com/v1/projects/${project}`;
    const result = await call(`${auth}/accounts:lookup`, { method: 'POST', body: JSON.stringify({ email: [arg] }) }, !!authEmulator);
    const user = result.users?.[0];
    if (!user) throw new Error(`Aucun compte avec l'e-mail ${arg} : connectez-vous d'abord une fois sur le site.`);
    await setDoc(`admins/${user.localId}`, { email: arg, at: new Date().toISOString() });
    console.log(`${arg} a maintenant accès à /admin${firestoreEmulator ? ' (émulateur)' : ''}.`);
  } else if (command === 'team' && arg) {
    // Access by e-mail address, also managed from the "Équipe" tab of /admin.
    const email = arg.trim().toLowerCase();
    const flags = process.argv.slice(4);
    const manage = flags.includes('--manage');
    const goals = manage || flags.includes('--goals');
    const team = manage || flags.includes('--team');
    await setTypedDoc(`adminEmails/${email}`, { manage, goals, team, addedBy: 'script', at: new Date() });
    const rights = manage ? ['gère l’équipe et les objectifs'] : [goals && 'voit les objectifs', team && 'ajoute des admins'].filter(Boolean);
    console.log(`${email} : accès à /admin${rights.length ? `, ${rights.join(', ')}` : ''}${firestoreEmulator ? ' (émulateur)' : ''}.`);
  } else {
    console.log('Usage : node scripts/firebase-admin.mjs reserve | admin <e-mail> | team <e-mail> [--goals] [--team] [--manage]');
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
