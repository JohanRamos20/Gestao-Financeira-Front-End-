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
  title: {
    fontSize: 22,
    color: theme.text,
    fontWeight: 'bold'
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
  },
  modalContainer: {
    backgroundColor : theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 24,
    boxShadow: theme.shadow,
    padding: 24,
    width: '90%',
    maxWidth: 520,
    maxHeight: '90%'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.shadow
  },

})
