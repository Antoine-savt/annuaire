import { useState } from 'react';

interface SignOutButtonProps {
  className?: string;
  /** Called once signed out, e.g. to leave a private page. */
  onSignedOut?: () => void;
}

/** "Se déconnecter" asks for a confirmation, so a stray click does not end the session. */
export function SignOutButton({ className = 'btn-ghost', onSignedOut }: SignOutButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className={className}>
        Se déconnecter
      </button>
    );
  }

  const signOut = async () => {
    setBusy(true);
    try {
      // Loaded on demand: Firebase Authentication stays out of the public pages.
      const { signOutUser } = await import('../lib/auth');
      await signOutUser();
      onSignedOut?.();
    } catch (err) {
      console.error(err);
      setBusy(false);
    }
  };

  return (
    <div role="group" aria-label="Confirmer la déconnexion" className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-ink">Vous déconnecter ?</span>
      <button type="button" onClick={() => void signOut()} disabled={busy} className="btn-primary !px-4 !py-2 text-sm">
        {busy ? 'Déconnexion…' : 'Oui, me déconnecter'}
      </button>
      {/* Focus lands on "Annuler", so pressing Enter twice does not sign out. */}
      <button type="button" onClick={() => setConfirming(false)} autoFocus className="btn-ghost !px-4 !py-2 text-sm">
        Annuler
      </button>
    </div>
  );
}
