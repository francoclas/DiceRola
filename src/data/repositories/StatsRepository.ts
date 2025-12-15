import { Stats } from '../../domain/entities';

export interface StatsRepository {
  load(): Promise<Stats | null>;
  save(stats: Stats): Promise<void>;
  clear(): Promise<void>;
}
