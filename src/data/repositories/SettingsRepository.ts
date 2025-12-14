export type ThemePreference = 'light' | 'dark' | 'system';

export type Settings = {
  theme: ThemePreference;
  haptics: boolean;
  sound: boolean;
};

export interface SettingsRepository {
  load(): Promise<Settings | null>;
  save(settings: Settings): Promise<void>;
  clear(): Promise<void>;
}
