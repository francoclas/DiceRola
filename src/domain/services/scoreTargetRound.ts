export function scoreTargetRound(target: number, total: number): number {
  const distance = Math.abs(target - total);
  if (distance === 0) return 3;
  if (distance === 1) return 2;
  if (distance <= 3) return 1;
  return 0;
}
