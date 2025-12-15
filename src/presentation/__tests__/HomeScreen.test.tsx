import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../../app/(tabs)/index';
import { ThemeProvider } from '../../presentation/theme/ThemeProvider';
import { Settings } from '../../data/repositories/SettingsRepository';

jest.mock('../../presentation/stores/settingsStore', () => ({
  useSettingsStore: () => ({ theme: 'light', haptics: false, sound: false, hydrated: true, load: jest.fn(), update: jest.fn() }),
}));

jest.mock('../../presentation/stores/statsStore', () => {
  const actual = jest.requireActual('../../presentation/stores/statsStore');
  return {
    useStatsStore: () => ({ stats: actual.useStatsStore.getState().stats, load: jest.fn(), applyRoll: jest.fn(), reset: jest.fn() }),
  };
});

jest.mock('../../domain/services/rollDice', () => {
  const actual = jest.requireActual('../../domain/services/rollDice');
  return {
    ...actual,
    rollDice: jest.fn(() => ({
      id: 'test',
      timestamp: 0,
      config: { count: 2, sides: 6, modifier: 0 },
      values: [3, 4],
      total: 7,
    })),
  };
});

describe('HomeScreen', () => {
  it('rolls dice and renders result', async () => {
    const { getByText, queryByText } = render(
      <ThemeProvider preference={(('light' as unknown) as Settings['theme'])}>
        <HomeScreen />
      </ThemeProvider>
    );

    const rollButton = getByText('Roll');
    fireEvent.press(rollButton);

    await waitFor(() => expect(queryByText(/Total:/)).toBeTruthy());
    expect(getByText('Total: 7')).toBeTruthy();
  });
});
