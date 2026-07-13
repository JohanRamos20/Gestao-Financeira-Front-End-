import { makeDashboardStyles } from '@/styles/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { formatNumberToMoney } from '@/utils/formatters/format-number-to-money';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

type SummaryCardProps = {
  label: string;
  value: number;
};

export function SummaryCard({ label, value }: SummaryCardProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const formatedValue = formatNumberToMoney(value)

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardBalance}>{formatedValue}</Text>
    </View>
  );
}
