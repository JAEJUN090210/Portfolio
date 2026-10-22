import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { clamp } from '../../utils/format';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 80;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.warm}
  );
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
`;

/** 스크롤 진행도를 React 상태 없이 스크롤 이벤트마다 DOM transform으로 직접 그립니다. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return undefined;
    }

    const render = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : clamp(window.scrollY / maxScroll, 0, 1);
      bar.style.transform = `scaleX(${progress})`;
    };

    render();
    window.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', render);

    return () => {
      window.removeEventListener('scroll', render);
      window.removeEventListener('resize', render);
    };
  }, []);

  return <Bar ref={barRef} aria-hidden="true" />;
}
