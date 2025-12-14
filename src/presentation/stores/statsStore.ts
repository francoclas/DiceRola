import { create } from '../../lib/zustand';
import { AsyncStorageStatsRepository } from '../../data/storage/AsyncStorageStatsRepository';
import { Stats } from '../../domain/entities';
import { emptyStats, updateStats } from '../../domain/services/updateStats';

const repository = new AsyncStorageStatsRepository();

export type StatsState = {
  stats: Stats;
  hydrated: boolean;
  load: () => Promise<void>;
  applyRoll: (roll: { total: number }) => Promise<void>;
  reset: () => Promise<void>;
};

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: emptyStats,
  hydrated: false,
  load: async () => {
    const saved = await repository.load();
    set({ stats: saved ?? emptyStats, hydrated: true });
  },
  applyRoll: async (roll) => {
    const next = updateStats(get().stats, roll as any);
    set({ stats: next });
    await repository.save(next);
  },
  reset: async () => {
    await repository.clear();
    set({ stats: emptyStats });
  },
}));
