import { useSyncExternalStore } from 'react';

export type StateCreator<T> = (
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
  getState: () => T,
  api: StoreApi<T>
) => T;

export interface StoreApi<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: () => void) => () => void;
}

export type UseStore<T> = (<U>(selector?: (state: T) => U) => U) & StoreApi<T>;

export function create<T>(initializer: StateCreator<T>): UseStore<T> {
  let state: T;
  const listeners = new Set<() => void>();

  const getState = () => state;
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
    const next = typeof partial === 'function' ? (partial as (state: T) => Partial<T>)(state) : partial;
    state = { ...state, ...next };
    listeners.forEach((l) => l());
  };

  const api: StoreApi<T> = { getState, setState, subscribe };
  state = initializer(setState, getState, api);

  const useStore = (<U>(selector: (state: T) => U = (s) => s as unknown as U) =>
    useSyncExternalStore(api.subscribe, () => selector(state))
  ) as UseStore<T>;

  useStore.getState = getState;
  useStore.setState = setState;
  useStore.subscribe = subscribe;

  return useStore;
}
