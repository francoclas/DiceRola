import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Card } from '../../src/presentation/components/Card';
import { Screen } from '../../src/presentation/components/Screen';
import { Button } from '../../src/presentation/components/Button';
import { StatBar } from '../../src/presentation/components/StatBar';
import { spacing } from '../../src/presentation/theme/tokens';
import { useTheme } from '../../src/presentation/theme/useTheme';
import { useStatsStore } from '../../src/presentation/stores/statsStore';

export default function StatsScreen() {
  const { theme } = useTheme();
  const { stats, load, reset } = useStatsStore();

  useEffect(() => {
    load();
  }, []);

  const maxDistribution = Object.values(stats.distribution).reduce((max, value) => Math.max(max, value), 0);

  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>Estadísticas</Text>
      <Card>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>Resumen</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <StatBlock label="Total de tiradas" value={stats.totalRolls} />
          <StatBlock label="Promedio" value={stats.avgTotal.toFixed(1)} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <StatBlock label="Mínimo" value={stats.minTotal ?? '-'} />
          <StatBlock label="Máximo" value={stats.maxTotal ?? '-'} />
        </View>
        <Button label="Reset stats" type="danger" onPress={reset} />
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>Distribución</Text>
        <View style={{ gap: spacing.sm }}>
          {Object.entries(stats.distribution)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([total, count]) => (
              <StatBar key={total} label={`Total ${total}`} value={count} max={maxDistribution} />
            ))}
          {Object.keys(stats.distribution).length === 0 ? (
            <Text style={{ color: theme.muted }}>Sin datos todavía</Text>
          ) : null}
        </View>
      </Card>
    </Screen>
  );
}

function StatBlock({ label, value }: { label: string; value: number | string }) {
  const { theme } = useTheme();
  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={{ color: theme.muted }}>{label}</Text>
      <Text style={{ color: theme.text, fontWeight: '700', fontSize: 16 }}>{value}</Text>
    </View>
  );
}
