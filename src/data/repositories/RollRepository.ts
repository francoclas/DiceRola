import { Roll } from '../../domain/entities';

export interface RollRepository {
  getHistory(): Promise<Roll[]>;
  addRoll(roll: Roll): Promise<Roll[]>;
  clear(): Promise<void>;
}
