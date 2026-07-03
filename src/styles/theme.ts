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
    bg: '#050505',
    bgElevated: '#0d0e10',
    panel: '#121417',
    panelSoft: '#171a1f',
    text: '#f7f7f5',
    textMuted: '#b4b7bd',
    textSubtle: '#818892',
    border: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(255, 255, 255, 0.18)',
    accent: '#7dd3fc',
    accentStrong: '#38bdf8',
    warm: '#f5c16c',
    success: '#8bd39c',
    danger: '#ff8a8a',
    white: '#ffffff',
    black: '#050505',
  },
  lightColors: {
    bg: '#fbfbfa',
    bgElevated: '#ffffff',
    panel: '#f4f4f1',
    panelSoft: '#ffffff',
    text: '#111111',
    textMuted: '#50545b',
    textSubtle: '#777c84',
    border: 'rgba(0, 0, 0, 0.1)',
    borderStrong: 'rgba(0, 0, 0, 0.16)',
    accent: '#0369a1',
    accentStrong: '#0284c7',
    warm: '#a16207',
    success: '#047857',
    danger: '#b91c1c',
    white: '#ffffff',
    black: '#050505',
  },
  spacing,
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '18px',
    pill: '999px',
  },
  shadows: {
    soft: '0 18px 70px rgba(0, 0, 0, 0.36)',
    focus: '0 0 0 3px rgba(125, 211, 252, 0.35)',
  },
  typography: {
    sans:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"SFMono-Regular", "Cascadia Code", Consolas, monospace',
  },
  breakpoints,
} as const;

type ThemeColors = Record<keyof typeof theme.colors, string>;

export type AppTheme = Omit<typeof theme, 'colors' | 'lightColors'> & {
  colors: ThemeColors;
  lightColors: ThemeColors;
};
