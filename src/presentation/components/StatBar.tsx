import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Props = {
  label: string;
  value: number;
  max: number;
};

export function StatBar({ label, value, max }: Props) {
  const { theme } = useTheme();
  const width = max === 0 ? 0 : (value / max) * 100;
  return (
    <View style={{ gap: spacing.xs }}>
      <View style={styles.row}>
        <Text style={{ color: theme.text }}>{label}</Text>
        <Text style={{ color: theme.muted }}>{value}</Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.border }]}> 
        <View style={[styles.fill, { width: `${width}%`, backgroundColor: theme.accent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
