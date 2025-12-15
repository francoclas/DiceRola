import { rollDice, validateConfig } from '../services/rollDice';

describe('rollDice', () => {
  it('clamps invalid config and rolls correct count', () => {
    const result = rollDice({ count: 10, sides: 1, modifier: 100 });
    expect(result.config).toEqual({ count: 6, sides: 2, modifier: 50 });
    expect(result.values).toHaveLength(6);
  });

  it('rolls deterministic values when Math.random is mocked', () => {
    const original = Math.random;
    Math.random = () => 0.5;
    const result = rollDice({ count: 2, sides: 6, modifier: 0 });
    expect(result.values).toEqual([3, 3]);
    Math.random = original;
  });
});

describe('validateConfig', () => {
  it('enforces limits', () => {
    expect(validateConfig({ count: -2, sides: 1000, modifier: -100 })).toEqual({
      count: 1,
      sides: 999,
      modifier: -50,
    });
  });
});
