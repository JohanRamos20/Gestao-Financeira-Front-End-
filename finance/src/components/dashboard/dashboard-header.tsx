import { makeDashboardStyles } from '@/styles/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { formatNumberToMoney } from '@/utils/formatters/format-number-to-money';
import { useMemo } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { SummaryCard } from './summary-card';

type HeaderProps = {
  username : string,
  balance : number,
  revenue : number,
  expense : number,
  future : number,
  style? : StyleProp<ViewStyle>
};

export function DashboardHeader( props : HeaderProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const valueFormated = formatNumberToMoney(props.balance ?? 0)

  return (
    <View style = {[styles.container, props.style]}>
      <View>
        <Text style={styles.subtitle}>Olá, {props.username}</Text>
        <Text style={styles.title}>Visão geral</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Saldo total</Text>
        <Text style={styles.balancetext}>{valueFormated}</Text>
      </View>
      <View style={styles.cardsRow}>
        <SummaryCard label="Receitas" value={props.revenue} />
        <SummaryCard label="Gastos" value={props.expense} />
        <SummaryCard label="Futuros" value={props.future} />
      </View>
    </View>
  );
}
