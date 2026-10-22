import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="interactive"]';

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  will-change: transform;
  opacity: 0;
  mix-blend-mode: difference;
  transition: opacity 200ms;

  &.is-visible {
    opacity: 1;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50%;
    transition:
      transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 200ms;
  }

  .cursor-core {
    width: 15px;
    height: 15px;
    margin: -7.5px 0 0 -7.5px;
    background: #ffffff;
  }

  .cursor-ring {
    width: 42px;
    height: 42px;
    margin: -21px 0 0 -21px;
    border: 1.5px solid #ffffff;
    opacity: 0;
    transform: scale(0.35);
  }

  &.is-interactive .cursor-core {
    transform: scale(0.45);
  }

  &.is-interactive .cursor-ring {
    opacity: 1;
    transform: scale(1);
  }

  &.is-pressed .cursor-core {
    transform: scale(0.7);
  }

  &.is-interactive.is-pressed .cursor-core {
    transform: scale(0.45);
  }

  &.is-interactive.is-pressed .cursor-ring {
    transform: scale(0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      transition: none;
    }
  }
`;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!dot || !finePointer.matches) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = 0;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.classList.add('is-visible');
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      dot.classList.toggle('is-interactive', interactive);
    };

    const onDown = () => dot.classList.add('is-pressed');
    const onUp = () => dot.classList.remove('is-pressed');
    const onLeave = () => dot.classList.remove('is-visible');
    const onEnter = () => dot.classList.add('is-visible');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);

    return () => {
      root.classList.remove('has-custom-cursor');
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return (
    <Dot ref={dotRef} className="no-print" aria-hidden="true">
      <span className="cursor-core" />
      <span className="cursor-ring" />
    </Dot>
  );
}
