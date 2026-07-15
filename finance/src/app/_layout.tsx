import '@/global.css';

import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { Moon, Sun } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { makeLayoutStyles } from '@/styles/layout-styles';
import { useMemo, useState } from 'react';
import { FloatingActionButton } from '@/components/floating-action-button';
import { ThemeProvider } from '@/providers/theme-provider';
import { NewTransactionData, NewTransactionModal } from '@/components/modal/new-transaction-modal';

import { DrawerTheme } from '@/constants/theme';
import { useTheme, useThemeMode } from '@/hooks/use-theme';

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}

function ThemedLayout() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [modalVisible, setModalVisible] = useState(false)
  const styles = useMemo(() => makeLayoutStyles(theme), [theme]);

  function handleCreateTransaction(transaction: NewTransactionData) {
    console.log('Nova transacao:', transaction);
  }

  return (
    <>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
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
                style={{
                  fontSize: 16,
                  color: theme.textSecondary
                }}>
                Gestão Financeira
              </Text>
            </View>
            <DrawerItemList {...props} />
            <Pressable onPress={toggleTheme} style={styles.themeToggle}>
              {mode === 'dark' ? (
                <Sun color={theme.text} size={20} />
              ) : (
                <Moon color={theme.text} size={20} />
              )}
              <Text style={styles.themeToggleText}>
                Usar tema {mode === 'dark' ? 'claro' : 'escuro'}
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
      <FloatingActionButton onPress={() => setModalVisible(true)}/>
      <NewTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateTransaction}
      ></NewTransactionModal>
      </>
  );
}
