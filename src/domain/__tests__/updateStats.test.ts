import { Roll } from '../entities';
import { emptyStats, updateStats } from '../services/updateStats';

const roll = (total: number): Roll => ({
  id: `${total}`,
  timestamp: 0,
  config: { count: 1, sides: 6, modifier: 0 },
  values: [total],
  total,
});

describe('updateStats', () => {
  it('updates aggregates and distribution', () => {
    const afterFirst = updateStats(emptyStats, roll(4));
    expect(afterFirst).toEqual({
      totalRolls: 1,
      minTotal: 4,
      maxTotal: 4,
      avgTotal: 4,
      distribution: { 4: 1 },
    });

    const afterSecond = updateStats(afterFirst, roll(6));
    expect(afterSecond.totalRolls).toBe(2);
    expect(afterSecond.minTotal).toBe(4);
    expect(afterSecond.maxTotal).toBe(6);
    expect(afterSecond.avgTotal).toBeCloseTo(5);
    expect(afterSecond.distribution[6]).toBe(1);
  });
});
