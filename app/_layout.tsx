// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* grupo de abas com a barra customizada */}
      <Stack.Screen name="(tabs)" />
      {/* seu modal (opcional) */}
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
