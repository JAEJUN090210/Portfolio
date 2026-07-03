import { ThemeProvider } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/AppRouter';
import { GlobalStyles } from './styles/global';
import { useThemeMode } from './stores/themeStore';
import { createAppTheme } from './utils/theme';

export function App() {
  const mode = useThemeMode();
  const appTheme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    document.body.classList.toggle('light', mode === 'light');
  }, [mode]);

  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
