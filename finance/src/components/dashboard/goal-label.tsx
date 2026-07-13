import { makeDashboardStyles } from '@/styles/dashboard-styles';
import { useTheme } from '@/hooks/use-theme';
import { Goal } from '@/types/goal';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

type GoalProgressItemProps = {
  goal: Goal;
};

export function GoalProgressItem({ goal }: GoalProgressItemProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeDashboardStyles(theme), [theme]);

  const percentage = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={styles.containersColumn}>
      <View style={styles.containersRow}>
        <Text style={styles.containersText}>{goal.name}</Text>
        <View style={styles.goalPercentage}>
          <Text style={styles.percentageText}>{clampedPercentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={styles.emptyProgressBar}>
        <View style={[styles.fillProgressBar, { width: `${clampedPercentage}%` }]} />
      </View>
      <Text style={styles.descriptionText}>
        R$ {goal.savedAmount} guardados de R$ {goal.targetAmount}
      </Text>
    </View>
  );
}
