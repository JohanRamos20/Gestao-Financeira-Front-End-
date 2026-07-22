import '@/global.css';

import { Redirect } from 'expo-router';
import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { LogOut, Moon, Sun } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { makeLayoutStyles } from '@/styles/layout-styles';
import { useMemo } from 'react';
import { CreateTransactionAction } from '@/features/transactions/components/create-transaction-action';

import { DrawerTheme } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme, useThemeMode } from '@/hooks/use-theme';

export default function Layout() {
  return (
      <ThemedLayout/>
  );
}

function ThemedLayout() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const styles = useMemo(() => makeLayoutStyles(theme), [theme]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login"/>;
  }

  return (
    <>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.brand}>
              <Text
                style={[
                  styles.brandText,
                  {
                    color: theme.text,
                  },
                ]}>
                Finance
              </Text>
              <Text
                style={styles.brandSubtitle}>
                Gestão Financeira
              </Text>
            </View>
            <DrawerItemList {...props} />
            <Pressable onPress={toggleTheme} style={styles.drawerButton}>
              {mode === 'dark' ? (
                <Sun color={theme.text} size={20} />
              ) : (
                <Moon color={theme.text} size={20} />
              )}
              <Text style={styles.themeToggleText}>
                Usar tema {mode === 'dark' ? 'claro' : 'escuro'}
              </Text>
            </Pressable>
            <View style={styles.drawerSpacer} />
            <Pressable onPress={() => signOut()} style={[styles.drawerButton, styles.logoutButton]}>
              <LogOut color= {theme.red}>
              </LogOut>
              <Text style={styles.themeToggleText}>
                Sair
              </Text>
            </Pressable>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerShown: false,
          drawerType: 'permanent',
          drawerStyle: {
            width: DrawerTheme.width,
            backgroundColor: theme.surface,
            borderRightColor: theme.border,
          },
          drawerLabelStyle: {
            fontSize: DrawerTheme.labelFontSize,
            fontWeight: DrawerTheme.labelFontWeight,
          },
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.textSecondary,
          drawerActiveBackgroundColor: theme.primarySoft,
          drawerItemStyle: {
            borderRadius: DrawerTheme.itemRadius,
            marginHorizontal: DrawerTheme.itemMarginHorizontal,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Dashboard',
          }}
        />
        <Drawer.Screen
          name="transactions"
          options={{
            drawerLabel: 'Transações',
          }}
        />
        <Drawer.Screen
          name="goals"
          options={{
            drawerLabel: 'Metas',
          }}
        />
      </Drawer>
      <CreateTransactionAction />
      </>
  );
}
