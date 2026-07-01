import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#f5f5f7',
    surface: '#ffffff',
    surfaceSoft: '#f7f5ff',
    text: '#1a1a2e',
    muted: '#888888',
    border: '#e6e2f5',
    primary: '#6c47ff',
    primaryDark: '#1e1060',
    primarySoft: '#e0d9ff',
    primaryMuted: '#c9beff',
    green: '#3b6d11',
    greenSoft: '#eaf3de',
    red: '#e24b4a',
    yellow: '#854f0b',
    yellowSoft: '#faeeda',
    shadow: 'rgba(42, 30, 85, 0.10)',
    backgroundElement: '#ffffff',
    backgroundSelected: '#e0d9ff',
    textSecondary: '#888888',
  },
  dark: {
    background: '#0f0f12',
    surface: '#171720',
    surfaceSoft: '#1e1a3a',
    text: '#e0e0e0',
    muted: '#6f6f80',
    border: '#2a2a36',
    primary: '#9980ff',
    primaryDark: '#1e1060',
    primarySoft: '#443584',
    primaryMuted: '#9980ff',
    green: '#97c459',
    greenSoft: '#1a2a1a',
    red: '#f09595',
    yellow: '#ef9f27',
    yellowSoft: '#2a2010',
    shadow: 'rgba(0, 0, 0, 0.22)',
    backgroundElement: '#171720',
    backgroundSelected: '#2e2060',
    textSecondary: '#6f6f80',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const DrawerTheme = {
  width: 280,
  itemRadius: 8,
  labelFontSize: 16,
  labelFontWeight: '600',
  itemMarginHorizontal: Spacing.three,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
