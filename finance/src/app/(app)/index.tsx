import { GoalList } from "@/components/dashboard/goal-list";
import { makeDashboardStyles } from "@/styles/dashboard-styles";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { useTheme } from "@/hooks/use-theme";
import { goalMock } from "@/mocks/dashboard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import { BarChart } from "@/components/dashboard/bar-chart";
import { mapTransactionsToChartData } from "@/mappers/transaction-to-bar-chart";
import { mapTransactionsToPieChartData } from "@/mappers/transaction-to-pie-chart";
import { PieChart } from "@/components/dashboard/pie-chart";
import { ChartLegend } from "@/components/dashboard/chart-legend";
import { mapTransactionsToChartLegendData } from "@/mappers/data-to-chart-legend";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { findTransaction } from "@/services/transactions-service";
import { mapTransactionsToTypeValue } from "@/mappers/transactions-to-type-value";
import { Transaction } from "@/types/transaction";
import { getBalance } from "@/services/wallet-service";
import { subscribeTransactionsChanged } from "@/events/transaction-events";
import { useAuthenticatedUser } from "@/hooks/use-auth";
import { getFirstName } from "@/utils/formatters/get-first-name";
export default function DashboardScreen() {
  const user = useAuthenticatedUser()
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const expenses = mapTransactionsToTypeValue('debit', transactions)
  const revenue = mapTransactionsToTypeValue('credit', transactions)

  const loadTransactions = useCallback(() => {
    findTransaction()
      .then(setTransactions)
      .catch((error) => {
        console.log('Erro ao buscar transacoes:', error);
      });
  }, []);

  const loadBalance = useCallback(() => {
    getBalance()
      .then(setBalance)
      .catch((error) => {
        console.log('Erro ao buscar saldo:', error);
      });
  }, []);

  const loadDashboardData = useCallback(() => {
    loadTransactions();
    loadBalance();
  }, [loadTransactions, loadBalance]);

  useEffect(() => {
    loadDashboardData();

    return subscribeTransactionsChanged(loadDashboardData);
  }, [loadDashboardData]);

  const barChartData = useMemo(
    () => mapTransactionsToChartData(transactions),
    [transactions],
  );
  const pieChartData = useMemo(
    () => mapTransactionsToPieChartData(expenses, revenue, theme),
    [transactions, revenue, theme],
  );
  const legendPieChartData = useMemo(
    () => mapTransactionsToChartLegendData(pieChartData, theme),
    [pieChartData, theme]
  )
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <DashboardHeader 
        username={getFirstName(user.name)}
        balance={balance}
        expense={expenses} 
        future={1000}
        revenue={revenue} 
        style={{minHeight:400}}
        />
        <View style={styles.dashboardSectionsColumn}>
          <View style={styles.chartContainersRow}>
            <DashboardSection title = 'Gasto por Categoria' subtitle="Gráficos">
              <BarChart data={barChartData}></BarChart>
            </DashboardSection>
            <DashboardSection title = 'Gasto por Categoria' subtitle="Gráficos" contentStyle = {styles.pieChartContentRow}>
              <PieChart data={pieChartData}></PieChart>
              <ChartLegend data={legendPieChartData}></ChartLegend>
            </DashboardSection>
          </View>
          <View style={styles.dashboardSectionsRow}>
            <DashboardSection subtitle='Movimentações' title="Últimas transações" badge="Ver todos" style={{flex:2, minHeight:100}}>
              <TransactionList transactions={transactions}/>
            </DashboardSection>
            <DashboardSection subtitle = 'Reservas' title='Metas' style={{flex:1, minHeight:100}}>
              <GoalList goals={goalMock}></GoalList>
            </DashboardSection>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
