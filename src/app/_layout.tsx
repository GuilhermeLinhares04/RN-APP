import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../utils/theme';
import { useNotifications } from '../hooks/useNotifications';

export default function RootLayout() {
  useNotifications();

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: 'Product Details',
          }}
        />
        <Stack.Screen
          name="camera"
          options={{
            title: 'Add Product',
          }}
        />
      </Stack>
    </PaperProvider>
  );
} 