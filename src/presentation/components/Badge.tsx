import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Props = {
  label: string | number;
};

export function Badge({ label }: Props) {
  const { theme } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: theme.border }]}> 
      <Text style={{ color: theme.text, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
});
