import { useSyncExternalStore } from 'react';
import { findVenue } from '../data';
import { track } from './track';

/*
 * The couple's saved venues ("Mes lieux"), kept in this browser only: no account needed.
 * Shared across tabs through the "storage" event.
 */
const KEY = 'edition:saved';
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  try {
    const list = JSON.parse(window.localStorage.getItem(KEY) || '[]');
    // Unknown slugs are kept (a venue published recently may not be loaded yet) and skipped when displayed.
    return Array.isArray(list) ? list.filter((slug): slug is string => typeof slug === 'string') : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cache === null) cache = read();
  return cache;
}

function write(list: string[]) {
  cache = list;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable (private mode): the selection lasts for this visit only */
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = read();
    notify();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', onStorage);
  };
}

/** Saved venue slugs, oldest first. Empty during prerendering. */
export function useSaved(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

/** Number of saved venues that exist in the directory. */
export function useSavedCount(): number {
  return useSaved().filter((slug) => findVenue(slug)).length;
}

export function isSaved(slug: string): boolean {
  return getSnapshot().includes(slug);
}

/** Add or remove a venue; returns true when it is now saved. */
export function toggleSaved(slug: string): boolean {
  const list = getSnapshot();
  if (list.includes(slug)) {
    write(list.filter((s) => s !== slug));
    return false;
  }
  write([...list, slug]);
  void track('save', slug, findVenue(slug)?.ownerUid);
  return true;
}

/** Add several venues at once (from a shared selection). */
export function saveAll(slugs: string[]) {
  const list = getSnapshot();
  const added = slugs.filter((slug) => findVenue(slug) && !list.includes(slug));
  if (added.length === 0) return;
  write([...list, ...added]);
  added.forEach((slug) => void track('save', slug, findVenue(slug)?.ownerUid));
}

export function removeSaved(slug: string) {
  write(getSnapshot().filter((s) => s !== slug));
}

export function clearSaved() {
  write([]);
}
