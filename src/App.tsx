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
    // 모바일 브라우저 상단 바 색을 현재 테마 배경과 맞춥니다.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'light' ? '#ffffff' : '#0a0a0a');
  }, [mode]);

  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
