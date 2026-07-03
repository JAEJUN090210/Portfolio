import { Global, css } from '@emotion/react';

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        :root {
          color-scheme: dark;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }

        body {
          min-width: 320px;
          margin: 0;
          background: #050505;
          color: #f7f7f5;
          word-break: keep-all;
          overflow-wrap: break-word;
        }

        body.light {
          color-scheme: light;
          background: #fbfbfa;
          color: #111111;
        }

        body.command-open {
          overflow: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        img {
          display: block;
          max-width: 100%;
        }

        ::selection {
          background: rgba(125, 211, 252, 0.32);
        }

        :focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(125, 211, 252, 0.35);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media print {
          body {
            background: #ffffff !important;
            color: #111111 !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}
    />
  );
}
