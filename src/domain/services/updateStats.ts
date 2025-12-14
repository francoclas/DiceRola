import { Roll, Stats } from '../entities';

const average = (sum: number, count: number) => (count === 0 ? 0 : sum / count);

export function updateStats(current: Stats, roll: Roll): Stats {
  const totalRolls = current.totalRolls + 1;
  const minTotal = current.minTotal === null ? roll.total : Math.min(current.minTotal, roll.total);
  const maxTotal = current.maxTotal === null ? roll.total : Math.max(current.maxTotal, roll.total);
  const sumTotals = current.avgTotal * current.totalRolls + roll.total;
  const avgTotal = average(sumTotals, totalRolls);
  const distribution = { ...current.distribution, [roll.total]: (current.distribution[roll.total] ?? 0) + 1 };

  return {
    totalRolls,
    minTotal,
    maxTotal,
    avgTotal,
    distribution,
  };
}

export const emptyStats: Stats = {
  totalRolls: 0,
  minTotal: null,
  maxTotal: null,
  avgTotal: 0,
  distribution: {},
};
