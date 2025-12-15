import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { DiceConfig } from '../../domain/entities';
import { validateConfig } from '../../domain/services/rollDice';
import { spacing } from '../theme/tokens';
import { Button } from './Button';
import { Input } from './Input';
import { SegmentedControl } from './SegmentedControl';

const presetSides = [4, 6, 8, 10, 12, 20, 100, 'custom'] as const;

type Props = {
  config: DiceConfig;
  onChange: (next: DiceConfig) => void;
};

export function DiceConfigurator({ config, onChange }: Props) {
  const [customSides, setCustomSides] = useState(String(config.sides));
  const selectedSides = presetSides.includes(config.sides as any) ? (config.sides as number) : 'custom';

  const onSidesChange = (value: (typeof presetSides)[number]) => {
    if (value === 'custom') {
      onChange({ ...config, sides: Number(customSides) || 2 });
    } else {
      onChange({ ...config, sides: value });
    }
  };

  const updateCount = (delta: number) => {
    const next = validateConfig({ ...config, count: config.count + delta });
    onChange(next);
  };

  const updateModifier = (delta: number) => {
    const next = validateConfig({ ...config, modifier: config.modifier + delta });
    onChange(next);
  };

  const minTotal = useMemo(() => config.count + config.modifier, [config]);
  const maxTotal = useMemo(() => config.count * config.sides + config.modifier, [config]);

  const handleCustomSidesBlur = () => {
    const parsed = Number(customSides);
    if (Number.isNaN(parsed) || parsed < 2 || parsed > 999) {
      Alert.alert('Valor inválido', 'Las caras personalizadas deben estar entre 2 y 999.');
      return;
    }
    onChange({ ...config, sides: parsed });
  };

  return (
    <View style={{ gap: spacing.md }}>
      <SegmentedControl
        ariaLabel="Cantidad de dados"
        options={[1, 2, 3, 4, 5, 6].map((value) => ({ label: `${value} dados`, value }))}
        value={config.count}
        onChange={(value) => onChange({ ...config, count: Number(value) })}
      />

      <SegmentedControl
        ariaLabel="Caras"
        options={presetSides.map((value) => ({ label: value === 'custom' ? 'Custom' : `d${value}`, value }))}
        value={selectedSides as any}
        onChange={onSidesChange}
      />

      {selectedSides === 'custom' ? (
        <Input
          label="Caras personalizadas"
          keyboardType="number-pad"
          value={customSides}
          onChangeText={(text) => setCustomSides(text)}
          onBlur={handleCustomSidesBlur}
          placeholder="Entre 2 y 999"
        />
      ) : null}

      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <Button label="-" type="secondary" onPress={() => updateModifier(-1)} accessibilityLabel="Reducir modificador" />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Input
            label={`Modificador (${config.modifier})`}
            keyboardType="number-pad"
            value={String(config.modifier)}
            onChangeText={(value) => onChange(validateConfig({ ...config, modifier: Number(value) }))}
          />
        </View>
        <Button label="+" type="secondary" onPress={() => updateModifier(1)} accessibilityLabel="Aumentar modificador" />
      </View>

      <View style={{ gap: spacing.xs }}>
        <Button label="-" type="secondary" onPress={() => updateCount(-1)} accessibilityLabel="Menos dados" />
        <Button label="+" type="secondary" onPress={() => updateCount(1)} accessibilityLabel="Más dados" />
      </View>

      <View style={{ gap: spacing.xs }}>
        <Input
          label="Caras actuales"
          editable={false}
          value={`d${config.sides}`}
          accessibilityLabel="Caras seleccionadas"
        />
        <Input label="Rango esperado" editable={false} value={`${minTotal} a ${maxTotal}`} accessibilityLabel="Rango de resultados" />
      </View>
    </View>
  );
}
