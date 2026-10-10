import { useEffect, useState } from 'react';
import type { Auth, User } from 'firebase/auth';
import { EMULATOR_PORTS, getFirebaseApp, useEmulators } from './firebase';
import { forgetPro, rememberPro } from './proHint';

/*
 * Firebase Authentication, loaded only on the account pages (it is heavy) so the public site stays fast.
 */

let authPromise: Promise<Auth> | null = null;

export function getAuthInstance(): Promise<Auth> {
  authPromise ??= Promise.all([getFirebaseApp(), import('firebase/auth')]).then(([app, { getAuth, connectAuthEmulator }]) => {
    const auth = getAuth(app);
    auth.languageCode = 'fr';
    if (useEmulators) connectAuthEmulator(auth, `http://127.0.0.1:${EMULATOR_PORTS.auth}`, { disableWarnings: true });
    return auth;
  });
  return authPromise;
}

/** Signed-in user: undefined while loading, null when signed out. */
export function useAuthUser(): User | null | undefined {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    let unsubscribe = () => {};
    let active = true;
    void (async () => {
      const [auth, { onAuthStateChanged }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
      if (!active) return;
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (!u) forgetPro();
        else rememberPro({ name: u.displayName?.split(' ')[0] || u.email || '', photoURL: u.photoURL ?? '' }, false);
      });
    })();
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);
  return user;
}

/** Messages for the Firebase errors people actually run into. */
export function authErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code: unknown }).code) : '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return 'E-mail ou mot de passe incorrect.';
    case 'auth/email-already-in-use':
      return 'Un compte existe déjà avec cet e-mail. Connectez-vous, ou utilisez « Mot de passe oublié ».';
    case 'auth/weak-password':
      return 'Choisissez un mot de passe d’au moins 6 caractères.';
    case 'auth/invalid-email':
      return 'Cette adresse e-mail n’est pas valide.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Patientez quelques minutes avant de réessayer.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'La fenêtre de connexion Google a été fermée.';
    case 'auth/popup-blocked':
      return 'Votre navigateur a bloqué la fenêtre Google. Autorisez les fenêtres pour ce site et réessayez.';
    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'Ce mode de connexion n’est pas encore activé sur le site.';
    case 'auth/network-request-failed':
      return 'Connexion internet indisponible. Vérifiez votre réseau.';
    case 'auth/requires-recent-login':
      return 'Pour des raisons de sécurité, reconnectez-vous puis recommencez.';
    case 'permission-denied':
      return 'Action refusée. Si vous venez de créer votre compte, confirmez votre e-mail puis réessayez.';
    default:
      return 'Une erreur est survenue. Réessayez dans un instant.';
  }
}

export async function signInWithEmail(email: string, password: string) {
  const [auth, { signInWithEmailAndPassword }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  const [auth, { createUserWithEmailAndPassword, sendEmailVerification, updateProfile }] = await Promise.all([
    getAuthInstance(),
    import('firebase/auth'),
  ]);
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(credential.user, { displayName });
  await sendEmailVerification(credential.user, { url: `${window.location.origin}/compte` });
  return credential;
}

export async function signInWithGoogle() {
  const [auth, { GoogleAuthProvider, signInWithPopup }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function sendPasswordReset(email: string) {
  const [auth, { sendPasswordResetEmail }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
  await sendPasswordResetEmail(auth, email.trim(), { url: `${window.location.origin}/connexion` });
}

export async function resendVerification(user: User) {
  const { sendEmailVerification } = await import('firebase/auth');
  await sendEmailVerification(user, { url: `${window.location.origin}/compte` });
}

/** Reload the user after they clicked the confirmation link, and refresh their token for the rules. */
export async function refreshVerification(user: User): Promise<boolean> {
  await user.reload();
  await user.getIdToken(true);
  return user.emailVerified;
}

export async function signOutUser() {
  const [auth, { signOut }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
  await signOut(auth);
  forgetPro();
}
