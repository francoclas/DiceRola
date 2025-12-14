import { DiceConfig, Roll } from '../entities';

const randomInt = (max: number) => Math.floor(Math.random() * max) + 1;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function validateConfig(config: DiceConfig): DiceConfig {
  const count = clamp(Math.round(config.count), 1, 6);
  const sides = clamp(Math.round(config.sides), 2, 999);
  const modifier = clamp(Math.round(config.modifier), -50, 50);
  return { count, sides, modifier };
}

export function rollDice(config: DiceConfig): Roll {
  const valid = validateConfig(config);
  const values = Array.from({ length: valid.count }, () => randomInt(valid.sides));
  const baseTotal = values.reduce((sum, value) => sum + value, 0);
  const total = baseTotal + valid.modifier;
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: Date.now(),
    config: valid,
    values,
    total,
  };
}

export function formatConfig(config: DiceConfig): string {
  const sign = config.modifier === 0 ? '' : config.modifier > 0 ? ` +${config.modifier}` : ` ${config.modifier}`;
  return `${config.count}×d${config.sides}${sign}`;
}
