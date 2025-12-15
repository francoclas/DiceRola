import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/presentation/theme/useTheme';

export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Roll', tabBarIcon: ({ color }) => <Ionicons name="dice" size={20} color={color} /> }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats', tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={20} color={color} /> }} />
      <Tabs.Screen name="game" options={{ title: 'Game', tabBarIcon: ({ color }) => <Ionicons name="game-controller" size={20} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Ionicons name="settings" size={20} color={color} /> }} />
    </Tabs>
  );
}
