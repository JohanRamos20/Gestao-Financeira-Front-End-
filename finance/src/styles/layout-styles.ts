import { useTheme } from '@/hooks/use-theme';
import { StyleSheet } from 'react-native';

type Theme = ReturnType<typeof useTheme>;

export const makeLayoutStyles = (theme: Theme) => StyleSheet.create({
  drawerContent: {
    flexGrow: 1,
  },
  brand: {
    padding: 20,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '700',
  },
  brandSubtitle: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  title: {
    fontSize: 22,
    color: theme.text,
    fontWeight: 'bold'
  },
  drawerButton: {
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
  drawerSpacer: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.red,
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
  modalScrollContent: {
    gap: 20,
    flexGrow: 1,
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalCloseButton: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: theme.surfaceSoft,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.border,
  },
  secondaryButtonText: {
    color: theme.textSecondary,
  },
  primaryButton: {
    backgroundColor: theme.primary,
  },
  primaryButtonText: {
    color: '#FFF',
  },

})
