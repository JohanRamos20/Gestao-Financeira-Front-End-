import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

export const makeLayoutStyles = (theme: Theme) => StyleSheet.create({
  brand: {
    padding: 20,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '700',
  },
  themeToggle: {
    minHeight: 48,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.surfaceSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggleText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 24,
    right: 54,
    width: 77,
    height: 77,
    borderRadius: 15,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
