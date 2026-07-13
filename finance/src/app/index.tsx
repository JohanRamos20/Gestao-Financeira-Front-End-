import { GoalList } from "@/components/dashboard/goal-list";
import { makeDashboardStyles } from "@/components/dashboard/dashboard-styles";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { useTheme } from "@/hooks/use-theme";
import { goalMock, mockTransactions } from "@/mocks/dashboard";
import { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { BarChart } from "@/components/dashboard/bar-chart";
import { mapTransactionsToChartData } from "@/mappers/transaction-to-bar-chart";
import { mapTransactionsToPieChartData } from "@/mappers/transaction-to-pie-chart";
import { PieChart } from "@/components/dashboard/pie-chart";
import { ChartLegend } from "@/components/dashboard/chart-legend";
import { mapTransactionsToChartLegendData } from "@/mappers/data-to-chart-legend";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
export default function DashboardScreen() {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const barChartData = useMemo(
    () => mapTransactionsToChartData(mockTransactions),
    [],
  );
  const pieChartData = useMemo(
    () => mapTransactionsToPieChartData(mockTransactions, 4000, theme),
    [theme],
  );
  const legendPieChartData = useMemo(
    () => mapTransactionsToChartLegendData(pieChartData, theme),
    [pieChartData, theme]
  )

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <DashboardHeader 
        username="teste" 
        balance={1000} 
        expense={2000} 
        future={1000} 
        revenue={3000} 
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
              <TransactionList transactions={mockTransactions}/>
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
