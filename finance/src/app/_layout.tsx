import '@/global.css';

import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';

import { DrawerTheme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function Layout() {
  const theme = useTheme();

  return (
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
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'permanent',
        drawerStyle: {
          width: DrawerTheme.width,
          backgroundColor: theme.surface,
          borderRightColor: 'transparent',
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
    
  );
}

const styles = StyleSheet.create({
  brand: {
    padding: 20,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '700',
  },
});
