import '@/global.css';

import { Redirect } from 'expo-router';
import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { LogOut, Moon, Sun } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { makeLayoutStyles } from '@/styles/layout-styles';
import { useMemo, useState } from 'react';
import { FloatingActionButton } from '@/components/floating-action-button';
import { NewTransactionData, NewTransactionModal } from '@/components/modal/new-transaction-modal';
import { createTransaction } from '@/services/transactions-service';
import { emitTransactionsChanged } from '@/events/transaction-events';

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
  const [modalVisible, setModalVisible] = useState(false)
  const styles = useMemo(() => makeLayoutStyles(theme), [theme]);

  async function handleCreateTransaction(transaction: NewTransactionData) {
    try {
      await createTransaction(
        transaction.name,
        transaction.value,
        transaction.category,
        transaction.type,
      );
      emitTransactionsChanged();
    } catch(error) {
      console.log('Erro ao criar transação', error)
    }
  }

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
                style={{
                  fontSize: 16,
                  color: theme.textSecondary
                }}>
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
            <Pressable onPress={() => signOut()} style={[styles.drawerButton, {backgroundColor:'transparent', borderWidth: 1, borderColor:theme.red}]}>
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
      <FloatingActionButton onPress={() => setModalVisible(true)}/>
      <NewTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateTransaction}
      ></NewTransactionModal>
      </>
  );
}
