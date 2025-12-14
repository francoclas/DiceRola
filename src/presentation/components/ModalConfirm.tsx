import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import { Button } from './Button';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ModalConfirm({ visible, title, message, onConfirm, onCancel }: Props) {
  const { theme } = useTheme();
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={[styles.box, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={{ color: theme.muted, marginBottom: spacing.lg }}>{message}</Text>
          <View style={styles.actions}>
            <Button label="Cancelar" type="ghost" onPress={onCancel} />
            <Button label="Confirmar" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  box: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'flex-end',
  },
});
