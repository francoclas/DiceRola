export type ThemeName = 'light' | 'dark';

export const palette = {
  light: {
    background: '#f7f7f8',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#475569',
    border: '#e2e8f0',
    primary: '#4f46e5',
    accent: '#22c55e',
    danger: '#ef4444',
    shadow: 'rgba(15, 23, 42, 0.08)',
  },
  dark: {
    background: '#0b1220',
    surface: '#111827',
    text: '#e2e8f0',
    muted: '#94a3b8',
    border: '#1f2937',
    primary: '#818cf8',
    accent: '#34d399',
    danger: '#f87171',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};
