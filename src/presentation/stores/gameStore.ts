import { create } from '../../lib/zustand';
import { DiceConfig, GameState, TargetRound } from '../../domain/entities';
import { rollDice, validateConfig } from '../../domain/services/rollDice';
import { scoreTargetRound } from '../../domain/services/scoreTargetRound';

export type GameActions = {
  configure: (config: DiceConfig) => void;
  setTarget: (target: number) => void;
  start: () => void;
  playRound: () => TargetRound | null;
  reset: () => void;
};

export type GameStore = GameState & { config: DiceConfig } & GameActions;

const initialConfig: DiceConfig = { count: 2, sides: 6, modifier: 0 };

export const useGameStore = create<GameStore>((set, get) => ({
  config: initialConfig,
  target: null,
  rounds: [],
  currentRound: 0,
  score: 0,
  completed: false,
  configure: (config) => set({ config: validateConfig(config) }),
  setTarget: (target) => set({ target }),
  start: () => set({ rounds: [], currentRound: 0, score: 0, completed: false }),
  playRound: () => {
    const state = get();
    if (state.target === null || state.completed) return null;
    const roll = rollDice(state.config);
    const points = scoreTargetRound(state.target, roll.total);
    const distance = Math.abs((state.target ?? 0) - roll.total);
    const round: TargetRound = { roll, points, distance };
    const rounds = [...state.rounds, round];
    const currentRound = state.currentRound + 1;
    const completed = currentRound >= 10;
    const score = state.score + points;
    set({ rounds, currentRound, completed, score });
    return round;
  },
  reset: () => set({ target: null, rounds: [], currentRound: 0, score: 0, completed: false }),
}));
