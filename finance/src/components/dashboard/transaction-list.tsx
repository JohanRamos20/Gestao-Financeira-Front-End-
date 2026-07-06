import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { TransactionCard } from '@/components/dashboard/transaction-card';
import { useTheme } from '@/hooks/use-theme';
import { Transaction } from '@/types/transaction';
import { useMemo } from 'react';
import { View } from 'react-native';

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const latestTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 4),
    [transactions],
  );

  return (
    <View style={styles.listContent}>
      {latestTransactions.map((item) => (
        <TransactionCard key={item.id} transaction={item} />
      ))}
    </View>
  );
}
