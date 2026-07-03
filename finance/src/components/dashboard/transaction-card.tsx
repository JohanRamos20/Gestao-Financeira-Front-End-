import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { Transaction } from '@/types/transaction';
import { formatDate } from '@/utils/formatters/format-date';
import { formatValueTransaction } from '@/utils/formatters/format-value-transaction';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

type TransactionCardProps = {
  transaction: Transaction;
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const formattedDate = formatDate(transaction.date);
  const formattedValue = formatValueTransaction(transaction.value, transaction.type);

  return (
    <View style={styles.transactionCard}>
      <View style={[styles.containersRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
        <View>
          <Text style={styles.containersText}>{transaction.name}</Text>
          <Text style={styles.descriptionText}>
            {formattedDate} · {transaction.category}
          </Text>
        </View>
        <Text
          style={[
            styles.subtitle,
            { marginRight: -20, color: transaction.type === 'debit' ? theme.red : theme.green },
          ]}
        >
          {formattedValue}
        </Text>
      </View>
    </View>
  );
}
