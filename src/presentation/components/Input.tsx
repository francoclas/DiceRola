import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Props = TextInputProps & { label: string; hint?: string };

export function Input({ label, hint, ...props }: Props) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={{ color: theme.text, fontWeight: '600' }}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.muted}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        {...props}
      />
      {hint ? <Text style={{ color: theme.muted, fontSize: 12 }}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
  },
});
