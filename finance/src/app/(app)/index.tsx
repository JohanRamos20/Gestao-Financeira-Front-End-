import { ScrollView, View } from "react-native";
import { useMemo } from "react";
import { BarChart } from "@/components/dashboard/bar-chart";
import { ChartLegend } from "@/components/dashboard/chart-legend";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { GoalList } from "@/components/dashboard/goal-list";
import { PieChart } from "@/components/dashboard/pie-chart";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { ModalError } from "@/components/modal/modal-error";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { useAuthenticatedUser } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { goalMock } from "@/mocks/dashboard";
import { makeDashboardStyles } from "@/styles/dashboard-styles";
import { getFirstName } from "@/utils/formatters/get-first-name";

export default function DashboardScreen() {
  const user = useAuthenticatedUser();
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const {
    transactions,
    balance,
    expenses,
    revenue,
    barChartData,
    pieChartData,
    legendPieChartData,
    errorMessage,
    dismissError,
  } = useDashboardData(theme);

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.wrapper}>
          <DashboardHeader
            username={getFirstName(user.name)}
            balance={balance}
            expense={expenses}
            future={1000}
            revenue={revenue}
            style={styles.header}
          />

          <View style={styles.dashboardSectionsColumn}>
            <View style={styles.chartContainersRow}>
              <DashboardSection title="Gasto por Categoria" subtitle="Graficos">
                <BarChart data={barChartData} />
              </DashboardSection>
              <DashboardSection
                title="Gasto por Categoria"
                subtitle="Graficos"
                contentStyle={styles.pieChartContentRow}
              >
                <PieChart data={pieChartData} />
                <ChartLegend data={legendPieChartData} />
              </DashboardSection>
            </View>

            <View style={styles.dashboardSectionsRow}>
              <DashboardSection
                subtitle="Movimentacoes"
                title="Ultimas transacoes"
                badge="Ver todos"
                style={styles.transactionsSection}
              >
                <TransactionList transactions={transactions} />
              </DashboardSection>
              <DashboardSection
                subtitle="Reservas"
                title="Metas"
                style={styles.goalsSection}
              >
                <GoalList goals={goalMock} />
              </DashboardSection>
            </View>
          </View>
        </View>
      </ScrollView>

      <ModalError
        visible={!!errorMessage}
        title="Erro ao carregar dashboard"
        message={errorMessage}
        variant="error"
        buttonLabel="Entendi"
        onClose={dismissError}
      />
    </>
  );
}
