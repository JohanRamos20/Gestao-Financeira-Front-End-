import { BarChartProps } from '@/components/dashboard/bar-chart';
import { Transaction } from '../types/transaction';

export function mapTransactionsToChartData(transactions: Transaction[]) : BarChartProps {

    const groupedTransactions = transactions.filter(
        transaction => transaction.type === 'debit')
        .reduce<Record<string, number>>((acc, transaction) => {
                acc[transaction.category] = (acc[transaction.category] || 0) + transaction.value;
                return acc;
            }, {});

    return Object.entries(groupedTransactions).map(([label, value]) => ({
        label,
        value
    }));
}