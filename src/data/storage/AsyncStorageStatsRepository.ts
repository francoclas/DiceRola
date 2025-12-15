import AsyncStorage from '../../lib/async-storage';
import { Stats } from '../../domain/entities';
import { StatsRepository } from '../repositories/StatsRepository';

const KEY = 'dicerola:stats';

export class AsyncStorageStatsRepository implements StatsRepository {
  async load(): Promise<Stats | null> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Stats;
    } catch (error) {
      console.warn('Failed to parse stats', error);
      return null;
    }
  }

  async save(stats: Stats): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(stats));
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
}
