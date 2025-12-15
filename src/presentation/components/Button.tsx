import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

export function Button({ label, onPress, type = 'primary', disabled, loading, accessibilityLabel, style }: ButtonProps) {
  const { theme } = useTheme();
  const background =
    type === 'primary'
      ? theme.primary
      : type === 'danger'
        ? theme.danger
        : type === 'secondary'
          ? theme.surface
          : 'transparent';
  const borderColor = type === 'secondary' ? theme.border : 'transparent';
  const textColor = type === 'primary' || type === 'danger' ? '#fff' : theme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: background, borderColor },
        pressed && { opacity: 0.85 },
        (disabled || loading) && { opacity: 0.6 },
        style,
      ]}>
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
