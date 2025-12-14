import { create } from '../../lib/zustand';
import { AsyncStorageRollRepository } from '../../data/storage/AsyncStorageRollRepository';
import { Roll } from '../../domain/entities';
import { rollDice } from '../../domain/services/rollDice';

const repository = new AsyncStorageRollRepository();

export type RollState = {
  history: Roll[];
  lastRoll: Roll | null;
  hydrated: boolean;
  load: () => Promise<void>;
  roll: (config: Roll['config']) => Promise<Roll>;
  clear: () => Promise<void>;
};

export const useRollStore = create<RollState>((set, get) => ({
  history: [],
  lastRoll: null,
  hydrated: false,
  load: async () => {
    const history = await repository.getHistory();
    set({ history, lastRoll: history[0] ?? null, hydrated: true });
  },
  roll: async (config) => {
    const result = rollDice(config);
    const history = await repository.addRoll(result);
    set({ history, lastRoll: result });
    return result;
  },
  clear: async () => {
    await repository.clear();
    set({ history: [], lastRoll: null });
  },
}));
