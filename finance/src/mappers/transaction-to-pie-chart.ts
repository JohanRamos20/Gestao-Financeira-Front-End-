import { Transaction } from '../types/transaction';
import { PieChartProps } from '@/components/dashboard/pie-chart';

type ChartColors = {
  spent: string;
  remaining: string;
};

export function mapTransactionsToPieChartData(
  transactions: Transaction[],
  remaining: number,
  colors: ChartColors
): PieChartProps {
  const spent = transactions
    .filter((transaction) => transaction.type === 'debit')
    .reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

  return [
    {
      label: 'Gasto',
      value: spent,
      color: colors.spent
    },
    {
      label: 'Restante',
      value: remaining,
      color: colors.remaining
    },
  ];
}
