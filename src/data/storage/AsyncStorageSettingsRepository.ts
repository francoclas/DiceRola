import AsyncStorage from '../../lib/async-storage';
import { Settings, SettingsRepository } from '../repositories/SettingsRepository';

const KEY = 'dicerola:settings';

export const defaultSettings: Settings = {
  theme: 'system',
  haptics: true,
  sound: false,
};

export class AsyncStorageSettingsRepository implements SettingsRepository {
  async load(): Promise<Settings | null> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Settings;
    } catch (error) {
      console.warn('Failed to parse settings', error);
      return null;
    }
  }

  async save(settings: Settings): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(settings));
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
}
