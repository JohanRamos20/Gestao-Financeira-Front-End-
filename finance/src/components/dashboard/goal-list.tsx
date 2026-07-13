import { makeDashboardStyles } from '@/styles/dashboard-styles';
import { GoalProgressItem } from '@/components/dashboard/goal-label';
import { useTheme } from '@/hooks/use-theme';
import { Goal } from '@/types/goal';
import { useMemo } from 'react';
import { FlatList } from 'react-native-gesture-handler';

type GoalListProps = {
  goals: Goal[];
};

export function GoalList({ goals }: GoalListProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);

  return (
    <FlatList
      data={goals}
      style={styles.goalList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GoalProgressItem goal={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}
