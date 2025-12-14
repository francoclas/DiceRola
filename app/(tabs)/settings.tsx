import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card } from '../../src/presentation/components/Card';
import { Screen } from '../../src/presentation/components/Screen';
import { Button } from '../../src/presentation/components/Button';
import { SegmentedControl } from '../../src/presentation/components/SegmentedControl';
import { ModalConfirm } from '../../src/presentation/components/ModalConfirm';
import { spacing } from '../../src/presentation/theme/tokens';
import { useTheme } from '../../src/presentation/theme/useTheme';
import { useSettingsStore } from '../../src/presentation/stores/settingsStore';
import { useRollStore } from '../../src/presentation/stores/rollStore';
import { useStatsStore } from '../../src/presentation/stores/statsStore';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const settings = useSettingsStore();
  const rollStore = useRollStore();
  const statsStore = useStatsStore();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const clearAll = async () => {
    await Promise.all([settings.reset(), rollStore.clear(), statsStore.reset()]);
    setConfirmVisible(false);
  };

  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>Settings</Text>
      <Card>
        <Text style={{ color: theme.text, fontWeight: '700' }}>Tema</Text>
        <SegmentedControl
          ariaLabel="Tema"
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
          value={settings.theme}
          onChange={(value) => settings.update({ theme: value as any })}
        />
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontWeight: '700' }}>Preferencias</Text>
        <ToggleRow label="Haptics" value={settings.haptics} onToggle={() => settings.update({ haptics: !settings.haptics })} />
        <ToggleRow label="Sonido" value={settings.sound} onToggle={() => settings.update({ sound: !settings.sound })} />
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontWeight: '700' }}>Datos</Text>
        <Button label="Clear all data" type="danger" onPress={() => setConfirmVisible(true)} />
      </Card>

      <ModalConfirm
        visible={confirmVisible}
        title="¿Borrar todo?"
        message="Esto borrará historial, stats y ajustes."
        onCancel={() => setConfirmVisible(false)}
        onConfirm={clearAll}
      />
    </Screen>
  );
}

function ToggleRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  const { theme } = useTheme();
  return (
    <View
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ color: theme.text }}>{label}</Text>
      <Button label={value ? 'On' : 'Off'} type={value ? 'primary' : 'secondary'} onPress={onToggle} />
    </View>
  );
}
