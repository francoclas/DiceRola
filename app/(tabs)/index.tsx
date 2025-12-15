import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as Clipboard from '../../src/lib/clipboard';
import { Card } from '../../src/presentation/components/Card';
import { Screen } from '../../src/presentation/components/Screen';
import { DiceConfigurator } from '../../src/presentation/components/DiceConfigurator';
import { Button } from '../../src/presentation/components/Button';
import { Badge } from '../../src/presentation/components/Badge';
import { spacing } from '../../src/presentation/theme/tokens';
import { useTheme } from '../../src/presentation/theme/useTheme';
import { useRollStore } from '../../src/presentation/stores/rollStore';
import { useStatsStore } from '../../src/presentation/stores/statsStore';
import { useSettingsStore } from '../../src/presentation/stores/settingsStore';
import { formatConfig } from '../../src/domain/services/rollDice';
import { Roll } from '../../src/domain/entities';

export default function HomeScreen() {
  const { theme } = useTheme();
  const rollStore = useRollStore();
  const statsStore = useStatsStore();
  const settings = useSettingsStore();
  const [config, setConfig] = useState({ count: 2, sides: 6, modifier: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    rollStore.load();
    statsStore.load();
  }, []);

  const onRoll = async () => {
    try {
      setLoading(true);
      const result = await rollStore.roll(config);
      await statsStore.applyRoll(result);
      if (settings.haptics) {
        await Haptics.selectionAsync();
      }
    } catch (error) {
      Alert.alert('Error', 'No pudimos tirar los dados. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async (roll: Roll) => {
    await Clipboard.setStringAsync(`Total ${roll.total} => ${roll.values.join(', ')}`);
    Alert.alert('Copiado', 'Resultado copiado al portapapeles');
  };

  const reroll = async (roll: Roll) => {
    setConfig(roll.config);
    await onRoll();
  };

  const lastRoll = rollStore.lastRoll;

  const history = useMemo(() => rollStore.history, [rollStore.history]);

  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>Roll rápido</Text>
      <Card>
        <DiceConfigurator config={config} onChange={setConfig} />
        <Button label="Roll" onPress={onRoll} loading={loading} accessibilityLabel="Tirar dados" />
        {lastRoll ? (
          <Animated.View entering={FadeInUp} exiting={FadeOut} style={{ gap: spacing.sm }}>
            <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700' }}>Último resultado</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
              {lastRoll.values.map((value, index) => (
                <Badge key={`${value}-${index}`} label={value} />
              ))}
            </View>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '800' }}>Total: {lastRoll.total}</Text>
          </Animated.View>
        ) : null}
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>Historial</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          renderItem={({ item }) => (
            <View
              accessible
              accessibilityRole="button"
              style={{ padding: spacing.sm, borderWidth: 1, borderColor: theme.border, borderRadius: 12, gap: spacing.xs }}>
              <Text style={{ color: theme.text, fontWeight: '700' }}>{formatConfig(item.config)}</Text>
              <Text style={{ color: theme.muted }}>Total: {item.total}</Text>
              <Text style={{ color: theme.muted, fontSize: 12 }}>{new Date(item.timestamp).toLocaleString()}</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button label="Re-roll" type="secondary" onPress={() => reroll(item)} />
                <Button label="Copiar" type="ghost" onPress={() => copyResult(item)} />
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: theme.muted }}>Sin tiradas aún</Text>}
        />
      </Card>
    </Screen>
  );
}
