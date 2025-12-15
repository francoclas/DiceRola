import AsyncStorage from '../../lib/async-storage';
import { Roll } from '../../domain/entities';
import { RollRepository } from '../repositories/RollRepository';

const KEY = 'dicerola:rolls';

export class AsyncStorageRollRepository implements RollRepository {
  async getHistory(): Promise<Roll[]> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Roll[];
      return parsed;
    } catch (error) {
      console.warn('Failed to parse history', error);
      return [];
    }
  }

  async addRoll(roll: Roll): Promise<Roll[]> {
    const history = await this.getHistory();
    const next = [roll, ...history].slice(0, 20);
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
}
