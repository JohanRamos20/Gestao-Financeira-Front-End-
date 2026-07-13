import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

export type ThemeMode = keyof typeof Colors;

type ThemeContextValue = {
  mode: ThemeMode;
  theme: (typeof Colors)[ThemeMode];
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function normalizeThemeMode(scheme: ReturnType<typeof useColorScheme>): ThemeMode {
  return scheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [selectedMode, setSelectedMode] = useState<ThemeMode | null>(null);
  const mode = selectedMode ?? normalizeThemeMode(systemScheme);

  const toggleTheme = useCallback(() => {
    setSelectedMode((currentMode) => {
      const activeMode = currentMode ?? normalizeThemeMode(systemScheme);
      return activeMode === 'light' ? 'dark' : 'light';
    });
  }, [systemScheme]);

  const value = useMemo(
    () => ({ mode, theme: Colors[mode], toggleTheme }),
    [mode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Os hooks de tema devem ser usados dentro de ThemeProvider.');
  }

  return context;
}

export function useTheme() {
  return useThemeContext().theme;
}

export function useThemeMode() {
  const { mode, toggleTheme } = useThemeContext();
  return { mode, toggleTheme };
}
