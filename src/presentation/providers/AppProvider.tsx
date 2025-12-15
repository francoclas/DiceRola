import React, { PropsWithChildren, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { ThemeProvider } from '../theme/ThemeProvider';

export function AppProvider({ children }: PropsWithChildren) {
  const settings = useSettingsStore();

  useEffect(() => {
    settings.load();
  }, []);

  if (!settings.hydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <ThemeProvider preference={settings.theme}>{children}</ThemeProvider>;
}
