import { GoalList } from '@/components/dashboard/goal-list';
import { makeDashboardStyles } from '@/components/dashboard/dashboard-styles';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { TransactionList } from '@/components/dashboard/transaction-list';
import { useTheme } from '@/hooks/use-theme';
import { goalMock, mockBarChartData, mockTransactions } from '@/mocks/dashboard';
import { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from '@/components/dashboard/bar-chart';
import { mapTransactionsToChartData } from '@/mappers/transactions-to-chart';

export default function DashboardScreen() {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);
  const barChartData = useMemo(
  () => mapTransactionsToChartData(mockTransactions),
  []
);

  return (
    <ScrollView style = {{flex : 1}}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.innerCollumn}>
            <Text style={styles.subtitle}>Ola, usuario</Text>
            <Text style={styles.title}>Visao geral</Text>
          </View>

          <View style={styles.innerCollumn}>
            <Text style={styles.subtitle}>Saldo total</Text>
            <Text style={styles.balancetext}>R$ 12.345,00</Text>
          </View>
          <View style={styles.cardsRow}>
            <SummaryCard label="Receitas" value={5200} />
            <SummaryCard label="Gastos" value={2000} />
            <SummaryCard label="Futuros" value={1500} />
          </View>
        </View>
        <View style={styles.dashboardSectionsColumn}>
          <View style = { styles.containersRow }>
          <View style={styles.movementsContainer}>
            <View style = {[styles.containersRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
              <View>
              <Text style={styles.subtitle}>Gráficos</Text>
              <Text style={styles.containersText}>Gasto x Categoria</Text>
              </View>
              <Text style={styles.subtitle}>Julho</Text>
            </View>
            <BarChart data={barChartData}></BarChart>
          </View>
          <View style = { styles.goalContainer}>
          </View>
          </View>
        <View style={styles.dashboardSectionsRow}>
          <View style={styles.movementsContainer}>
            <View style={[styles.containersRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
              <View>
                <Text style={styles.subtitle}>Movimentacoes</Text>
                <Text style={styles.containersText}>Ultimas transacoes</Text>
              </View>
              <TouchableOpacity onPress={() => console.log('apertado')}>
              <Text style={styles.subtitle}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <TransactionList transactions={mockTransactions} />
          </View>

          <View style={styles.goalContainer}>
            <Text style={styles.subtitle}>Metas</Text>
            <GoalList goals={goalMock} />
          </View>
        </View>
        </View>
      </View>
      </ScrollView>
  );
}
