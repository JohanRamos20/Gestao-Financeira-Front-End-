import { useCallback, useEffect, useMemo, useState } from 'react';
import { subscribeTransactionsChanged } from '@/events/transaction-events';
import { mapTransactionsToChartLegendData } from '@/mappers/data-to-chart-legend';
import { mapTransactionsToChartData } from '@/mappers/transaction-to-bar-chart';
import { mapTransactionsToPieChartData } from '@/mappers/transaction-to-pie-chart';
import { mapTransactionsToTypeValue } from '@/mappers/transactions-to-type-value';
import { findTransaction } from '@/services/transactions-service';
import { getBalance } from '@/services/wallet-service';
import type { Transaction } from '@/types/transaction';
import { getErrorMessage } from '@/utils/get-error-message';

type ChartColors = {
  spent: string;
  remaining: string;
};

export function useDashboardData(chartColors: ChartColors) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboardData = useCallback(async () => {
    try {
      const [nextTransactions, nextBalance] = await Promise.all([
        findTransaction(),
        getBalance(),
      ]);

      setTransactions(nextTransactions);
      setBalance(nextBalance);
    } catch (error) {
      console.log('Erro ao carregar dashboard:', error);
      setErrorMessage(getErrorMessage(error));
    }
  }, []);

  useEffect(() => {
    void loadDashboardData();

    return subscribeTransactionsChanged(() => {
      void loadDashboardData();
    });
  }, [loadDashboardData]);

  const expenses = useMemo(
    () => mapTransactionsToTypeValue('debit', transactions),
    [transactions],
  );
  const revenue = useMemo(
    () => mapTransactionsToTypeValue('credit', transactions),
    [transactions],
  );
  const barChartData = useMemo(
    () => mapTransactionsToChartData(transactions),
    [transactions],
  );
  const pieChartData = useMemo(
    () => mapTransactionsToPieChartData(expenses, revenue, chartColors),
    [expenses, revenue, chartColors],
  );
  const legendPieChartData = useMemo(
    () => mapTransactionsToChartLegendData(pieChartData, chartColors),
    [pieChartData, chartColors],
  );

  return {
    transactions,
    balance,
    expenses,
    revenue,
    barChartData,
    pieChartData,
    legendPieChartData,
    errorMessage,
    dismissError: () => setErrorMessage(''),
  };
}
