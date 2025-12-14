import React, { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card } from '../../src/presentation/components/Card';
import { Screen } from '../../src/presentation/components/Screen';
import { Button } from '../../src/presentation/components/Button';
import { DiceConfigurator } from '../../src/presentation/components/DiceConfigurator';
import { Input } from '../../src/presentation/components/Input';
import { spacing } from '../../src/presentation/theme/tokens';
import { useTheme } from '../../src/presentation/theme/useTheme';
import { useGameStore } from '../../src/presentation/stores/gameStore';
import { Badge } from '../../src/presentation/components/Badge';

export default function GameScreen() {
  const game = useGameStore();
  const { theme } = useTheme();
  const [targetInput, setTargetInput] = useState('');

  const minTotal = useMemo(() => game.config.count + game.config.modifier, [game.config]);
  const maxTotal = useMemo(() => game.config.count * game.config.sides + game.config.modifier, [game.config]);

  const startGame = () => {
    const target = Number(targetInput);
    if (Number.isNaN(target) || target < minTotal || target > maxTotal) {
      Alert.alert('Objetivo inválido', `Debe estar entre ${minTotal} y ${maxTotal}`);
      return;
    }
    game.setTarget(target);
    game.start();
  };

  const play = () => {
    if (game.target === null) {
      Alert.alert('Elige objetivo', 'Configura un objetivo válido antes de jugar.');
      return;
    }
    const round = game.playRound();
    if (!round) return;
    if (game.completed) {
      Alert.alert('Juego terminado', `Puntaje final: ${game.score}`);
    }
  };

  return (
    <Screen>
      <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>Target mini-game</Text>
      <Card>
        <DiceConfigurator config={game.config} onChange={game.configure} />
        <Input
          label={`Objetivo (${minTotal}-${maxTotal})`}
          keyboardType="number-pad"
          value={targetInput}
          onChangeText={setTargetInput}
          placeholder="Ej: 15"
        />
        <Button label="Iniciar" onPress={startGame} />
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>Rondas (10)</Text>
        <Button label="Tirar" onPress={play} disabled={game.completed || game.target === null} />
        <View style={{ gap: spacing.sm }}>
          {game.rounds.map((round, index) => (
            <Animated.View key={round.roll.id} entering={FadeIn} style={{ gap: spacing.xs }}>
              <Text style={{ color: theme.text, fontWeight: '700' }}>Ronda {index + 1}</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                {round.roll.values.map((value, idx) => (
                  <Badge key={`${value}-${idx}`} label={value} />
                ))}
              </View>
              <Text style={{ color: theme.muted }}>Total {round.roll.total}</Text>
              <Text style={{ color: theme.muted }}>Distancia: {round.distance} • Puntos: {round.points}</Text>
            </Animated.View>
          ))}
          {game.rounds.length === 0 ? <Text style={{ color: theme.muted }}>Aún no juegas.</Text> : null}
        </View>
        {game.completed ? (
          <Text style={{ color: theme.text, fontWeight: '800', fontSize: 18 }}>Score: {game.score}</Text>
        ) : null}
      </Card>
    </Screen>
  );
}
