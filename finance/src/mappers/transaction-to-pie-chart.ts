import { Transaction } from '../types/transaction';
import { PieChartProps } from '@/components/dashboard/pie-chart';

type ChartColors = {
  spent: string;
  remaining: string;
};

export function mapTransactionsToPieChartData(
  expenses: number,
  revenue: number,
  colors: ChartColors
): PieChartProps {
  return [
    {
      label: 'Gasto',
      value: expenses,
      color: colors.spent
    },
    {
      label: 'Receita',
      value: revenue,
      color: colors.remaining
    },
  ];
}
