import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function SegmentedControl<T extends string | number>({ options, value, onChange, ariaLabel }: Props<T>) {
  const { theme } = useTheme();
  return (
    <View accessibilityRole="tablist" accessibilityLabel={ariaLabel} style={[styles.row, { borderColor: theme.border }]}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.label}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.item,
              {
                backgroundColor: selected ? theme.primary : 'transparent',
                borderColor: selected ? theme.primary : theme.border,
              },
            ]}>
            <Text style={{ color: selected ? '#fff' : theme.text, fontWeight: '600' }}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRightWidth: 1,
  },
});
