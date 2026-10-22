import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light';

type ThemeState = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'portfolio-theme-v4',
      // 사이트에 새로 진입할 때는 항상 다크 모드로 시작하고,
      // 같은 탭 안에서 새로고침할 때만 선택한 모드를 유지합니다.
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
);

export const useThemeMode = () => useThemeStore((state) => state.mode);
export const useIsDarkMode = () => useThemeStore((state) => state.mode === 'dark');
export const useToggleThemeMode = () => useThemeStore((state) => state.toggleMode);
