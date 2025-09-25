// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const COLORS = {
  barBg: '#FFFFFF',            // fundo branco como na imagem
  icon: '#33C37E',             // verde dos ícones
  border: 'rgba(0,0,0,0.08)',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      // ← troca a barra padrão pela sua barra custom
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="explore" options={{ title: 'Buscar' }} />
      {/* terceira aba para o ícone de Perfil */}
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}

function BottomBar({ state, navigation }: any) {
  const router = useRouter();

  // helpers pra saber qual rota está ativa
  const isActive = (routeName: string) =>
    state.index === state.routes.findIndex((r: any) => r.name === routeName);

  const go = (routeName: string) => navigation.navigate(routeName);

  return (
    <View style={styles.wrap}>
      <IconButton icon="home" active={isActive('index')} onPress={() => go('index')} />
      <IconButton icon="search" active={isActive('explore')} onPress={() => go('explore')} />

      {/* Botão central (abre modal) */}
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => router.push('/modal')}
        style={styles.centerBtn}
      >
        <Feather name="plus-square" size={26} color={COLORS.icon} />
      </TouchableOpacity>

      <IconButton icon="user" active={isActive('profile')} onPress={() => go('profile')} />
    </View>
  );
}

function IconButton({
  icon,
  active,
  onPress,
}: {
  icon: any;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      {/* todos verdes; se quiser, mude a opacidade quando inativo */}
      <Feather name={icon} size={24} color={COLORS.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 64,
    backgroundColor: COLORS.barBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    ...Platform.select({
      android: { elevation: 14 },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 12,
      },
    }),
  },
  tabItem: { padding: 10, borderRadius: 12 },
  centerBtn: { padding: 10, borderRadius: 12 },
});
