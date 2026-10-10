import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore/lite';
import type { FirebaseStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

/** True when the Firebase keys are present in the environment (see .env.example). */
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

/**
 * Local testing only: use the Firebase emulators (`npm run emulators`) instead of the real project,
 * so accounts, listings and photos can be tested without touching real data. The flag is only set in
 * .env.emulators, read in the "emulators" mode (`npm run dev:emulators`, `vite build --mode emulators`).
 */
export const useEmulators = import.meta.env.MODE === 'emulators' && import.meta.env.VITE_FIREBASE_EMULATORS === 'true';

/** Ports of the emulators, as set in firebase.json. */
export const EMULATOR_PORTS = { auth: 9099, firestore: 8085, storage: 9199 };

/**
 * Whether visits and requests should be recorded. Off in development unless VITE_TRACK_IN_DEV=true
 * (or the emulators are used), so local testing does not pollute the statistics shown to venues.
 */
export const trackingEnabled =
  firebaseConfigured && (import.meta.env.PROD || import.meta.env.VITE_TRACK_IN_DEV === 'true' || useEmulators);

let appPromise: Promise<FirebaseApp> | null = null;

/** Firebase is loaded lazily so it never weighs on the first page load. */
export function getFirebaseApp(): Promise<FirebaseApp> {
  if (!firebaseConfigured) return Promise.reject(new Error('Firebase non configuré'));
  appPromise ??= import('firebase/app').then(({ getApps, initializeApp }) => getApps()[0] ?? initializeApp(config));
  return appPromise;
}

let dbPromise: Promise<Firestore> | null = null;

export function getDb(): Promise<Firestore> {
  dbPromise ??= Promise.all([getFirebaseApp(), import('firebase/firestore/lite')]).then(
    ([app, { getFirestore, connectFirestoreEmulator }]) => {
      const db = getFirestore(app);
      if (useEmulators) connectFirestoreEmulator(db, '127.0.0.1', EMULATOR_PORTS.firestore);
      return db;
    },
  );
  return dbPromise;
}

let storagePromise: Promise<FirebaseStorage> | null = null;

/** Cloud Storage, for the photos uploaded by professionals. */
export function getStorageInstance(): Promise<FirebaseStorage> {
  storagePromise ??= Promise.all([getFirebaseApp(), import('firebase/storage')]).then(
    ([app, { getStorage, connectStorageEmulator }]) => {
      const storage = getStorage(app);
      if (useEmulators) connectStorageEmulator(storage, '127.0.0.1', EMULATOR_PORTS.storage);
      return storage;
    },
  );
  return storagePromise;
}
