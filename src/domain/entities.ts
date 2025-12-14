export type DiceConfig = {
  count: number;
  sides: number;
  modifier: number;
};

export type Roll = {
  id: string;
  timestamp: number;
  config: DiceConfig;
  values: number[];
  total: number;
};

export type Stats = {
  totalRolls: number;
  minTotal: number | null;
  maxTotal: number | null;
  avgTotal: number;
  distribution: Record<number, number>;
};

export type TargetRound = {
  roll: Roll;
  points: number;
  distance: number;
};

export type GameState = {
  target: number | null;
  rounds: TargetRound[];
  currentRound: number;
  score: number;
  completed: boolean;
};
