import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'portfolio-theme-v2',
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
);

export const useThemeMode = () => useThemeStore((state) => state.mode);
export const useIsDarkMode = () => useThemeStore((state) => state.mode === 'dark');
export const useSetThemeMode = () => useThemeStore((state) => state.setMode);
export const useToggleThemeMode = () => useThemeStore((state) => state.toggleMode);

export const useTheme = () => ({
  mode: useThemeMode(),
  isDark: useIsDarkMode(),
});
