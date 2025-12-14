import React, { PropsWithChildren, createContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { Settings } from '../../data/repositories/SettingsRepository';
import { palette, ThemeName } from './tokens';

export type Theme = typeof palette.light;

type ThemeContextValue = {
  theme: Theme;
  name: ThemeName;
};

export const ThemeContext = createContext<ThemeContextValue>({ name: 'light', theme: palette.light });

const resolveTheme = (preference: Settings['theme'], system: ColorSchemeName): ThemeName => {
  if (preference === 'system') return (system as ThemeName) ?? 'light';
  return preference;
};

export function ThemeProvider({ children, preference }: PropsWithChildren<{ preference: Settings['theme'] }>) {
  const systemScheme = useColorScheme();
  const name = resolveTheme(preference, systemScheme);
  const value = useMemo(() => ({ name, theme: palette[name] }), [name]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
