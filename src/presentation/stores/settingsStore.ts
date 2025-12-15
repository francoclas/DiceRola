import { create } from '../../lib/zustand';
import { AsyncStorageSettingsRepository, defaultSettings } from '../../data/storage/AsyncStorageSettingsRepository';
import { Settings } from '../../data/repositories/SettingsRepository';

const repository = new AsyncStorageSettingsRepository();

export type SettingsState = Settings & {
  hydrated: boolean;
  load: () => Promise<void>;
  update: (settings: Partial<Settings>) => Promise<void>;
  reset: () => Promise<void>;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  hydrated: false,
  load: async () => {
    const stored = await repository.load();
    set({ ...(stored ?? defaultSettings), hydrated: true });
  },
  update: async (settings) => {
    const next = { ...get(), ...settings };
    set(next);
    await repository.save({ theme: next.theme, haptics: next.haptics, sound: next.sound });
  },
  reset: async () => {
    await repository.clear();
    set({ ...defaultSettings });
  },
}));
