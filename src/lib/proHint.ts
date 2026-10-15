import { useSyncExternalStore } from 'react';

/*
 * Who is signed in to the professional area, remembered in this browser so the header can show the
 * account button without loading Firebase Authentication on every page. Only a display hint: the
 * account pages always check the real session.
 */

export interface ProHint {
  name: string;
  photoURL: string;
  /** Account id, so a professional's visits to their own listings are not counted in its statistics. */
  uid?: string;
}

const KEY = 'edition:pro';
const listeners = new Set<() => void>();
let cached: { raw: string | null; value: ProHint | null } = { raw: null, value: null };

function read(): ProHint | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cached.raw) {
    let value: ProHint | null = null;
    try {
      value = raw ? (JSON.parse(raw) as ProHint) : null;
    } catch {
      value = null;
    }
    cached = { raw, value };
  }
  return cached.value;
}

function write(value: ProHint | null) {
  try {
    if (value) window.localStorage.setItem(KEY, JSON.stringify(value));
    else window.localStorage.removeItem(KEY);
  } catch {
    // Private browsing: the header simply shows the sign-in button.
  }
  listeners.forEach((notify) => notify());
}

/** Remember the signed-in professional; "replace: false" keeps the name and photo of their profile if already known. */
export function rememberPro(hint: ProHint, replace = true) {
  const current = read();
  const next = current && !replace ? { ...current, uid: hint.uid ?? current.uid } : { ...hint, uid: hint.uid ?? current?.uid };
  if (current && current.name === next.name && current.photoURL === next.photoURL && current.uid === next.uid) return;
  write(next);
}

/** Account id of the professional signed in on this browser, if any. */
export function proUid(): string | undefined {
  return read()?.uid;
}

export function forgetPro() {
  if (read()) write(null);
}

export function useProHint(): ProHint | null {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      const onStorage = (e: StorageEvent) => e.key === KEY && notify();
      window.addEventListener('storage', onStorage);
      return () => {
        listeners.delete(notify);
        window.removeEventListener('storage', onStorage);
      };
    },
    read,
    () => null,
  );
}
