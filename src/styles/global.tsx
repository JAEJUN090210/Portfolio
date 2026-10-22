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
          font-family:
            Montserrat,
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            'Apple SD Gothic Neo',
            'Malgun Gothic',
            'Segoe UI',
            system-ui,
            sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        body {
          min-width: 320px;
          margin: 0;
          background: #0a0a0a;
          color: #fafafa;
          word-break: keep-all;
          overflow-wrap: break-word;
        }

        body.light {
          color-scheme: light;
          background: #ffffff;
          color: #0a0a0a;
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

        html.lenis,
        html.lenis body {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-stopped {
          overflow: clip;
        }

        .lenis [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        html.has-custom-cursor,
        html.has-custom-cursor * {
          cursor: none !important;
        }

        section[id] {
          scroll-margin-top: 1.5rem;
        }

        ::selection {
          background: rgba(59, 130, 246, 0.35);
        }

        :focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
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

        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
          }
          100% {
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
          }
        }

        @keyframes titleCharIn {
          0% {
            opacity: 0;
            transform: translateY(0.6em) skewY(6deg);
            filter: blur(2px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) skewY(0);
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(110%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
