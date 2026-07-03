import { theme, type AppTheme } from '../styles/theme';
import type { ThemeMode } from '../stores/themeStore';

export const createAppTheme = (mode: ThemeMode): AppTheme => ({
  ...theme,
  colors: mode === 'dark' ? theme.colors : theme.lightColors,
});
