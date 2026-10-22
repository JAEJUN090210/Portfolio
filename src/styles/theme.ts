export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const;

export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const theme = {
  colors: {
    bg: '#0a0a0a',
    panel: '#171717',
    panelSoft: '#1f1f1f',
    text: '#fafafa',
    textMuted: '#a1a1a1',
    textSubtle: '#737373',
    border: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',
    accent: '#3b82f6',
    warm: '#f5c16c',
    success: '#22c55e',
    danger: '#ff8a8a',
    white: '#ffffff',
    black: '#0a0a0a',
  },
  lightColors: {
    bg: '#ffffff',
    panel: '#f5f5f5',
    panelSoft: '#ffffff',
    text: '#0a0a0a',
    textMuted: '#737373',
    textSubtle: '#a3a3a3',
    border: 'rgba(0, 0, 0, 0.1)',
    borderStrong: 'rgba(0, 0, 0, 0.2)',
    accent: '#2563eb',
    warm: '#a16207',
    success: '#16a34a',
    danger: '#b91c1c',
    white: '#ffffff',
    black: '#0a0a0a',
  },
  spacing,
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '14px',
    pill: '999px',
  },
  shadows: {
    soft: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    lift: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  },
  typography: {
    sans: 'Montserrat, Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", system-ui, sans-serif',
    mono: 'ui-monospace, "SFMono-Regular", "Cascadia Code", Menlo, Consolas, monospace',
    serif: 'Georgia, "Times New Roman", "Noto Serif KR", "Apple SD Gothic Neo", serif',
  },
  breakpoints,
} as const;

type ThemeColors = Record<keyof typeof theme.colors, string>;

export type AppTheme = Omit<typeof theme, 'colors' | 'lightColors'> & {
  colors: ThemeColors;
  lightColors: ThemeColors;
};
