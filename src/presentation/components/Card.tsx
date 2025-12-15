import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export function Card({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  return <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.shadow }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    gap: spacing.md,
  },
});
