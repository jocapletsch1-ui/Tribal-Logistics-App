import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

function subscribe(callback: () => void) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return () => {};

  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return Platform.OS === 'web' && typeof window !== 'undefined' && window.innerWidth > 760;
}

function getServerSnapshot() {
  return false;
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
