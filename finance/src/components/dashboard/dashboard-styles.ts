import { useTheme } from '@/hooks/use-theme';
import { Dimensions, StyleSheet } from 'react-native';

type Theme = ReturnType<typeof useTheme>;
const { height } = Dimensions.get('window');

export const makeDashboardStyles = (theme: Theme) => StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.background,
    paddingTop: 40,
    gap: 30,
  },
  listContent: {
    gap: 20,
  },
  container: {
    backgroundColor: theme.primaryDark,
    width: '95%',
    height: '45%',
    borderRadius: 30,
    padding: 25,
    gap: 30,
  },
  containersRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  dashboardSectionsRow: {
    width: '95%',
    height: '45%',
    flexDirection: 'row',
    gap: 20,
  },
  containersColumn: {
    width: '95%',
    flexDirection: 'column',
    gap: 10,
  },
  movementsContainer: {
    overflow: 'hidden',
    backgroundColor: theme.surface,
    width: '65%',
    borderRadius: 30,
    padding: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: theme.border,
  },
  transactionCard: {
    backgroundColor: theme.background,
    justifyContent: 'center',
    width: '100%',
    height: '23%',
    borderRadius: 10,
    padding: 10,
  },
  containersText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  goalContainer: {
    overflow: 'hidden',
    backgroundColor: theme.surface,
    width: '33%',
    height: '100%',
    borderRadius: 30,
    padding: 20,
    paddingRight: 0,
    gap: 10,
    borderWidth: 1,
    borderColor: theme.border,
  },
  goalList: {
    flex: 1,
  },
  goalPercentage: {
    marginRight: -20,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 24,
    borderRadius: 30,
    backgroundColor: theme.primaryMuted,
  },
  percentageText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: 'bold',
    alignContent: 'center',
  },
  emptyProgressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.primarySoft,
    overflow: 'hidden',
  },
  fillProgressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.primaryMuted,
  },
  innerCollumn: {
    borderRadius: 8,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: theme.primarySoft,
    borderRadius: 16,
    padding: 16,
    height: height * 0.1,
  },
  cardLabel: {
    fontSize: 16,
    color: theme.primary,
  },
  cardBalance: {
    fontSize: 22,
    color: theme.text,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: 'bold',
  },
  balancetext: {
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: -10,
    color: theme.text,
  },
  descriptionText: {
    marginTop: -5,
    fontSize: 14,
    color: theme.textSecondary,
  },
  iconContainer: {
    width : 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextGroup: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  flex: 1,
  }
});
