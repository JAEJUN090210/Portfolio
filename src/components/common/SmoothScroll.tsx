import Lenis from 'lenis';
import { useEffect } from 'react';
import { setLenis } from '../../lib/smoothScroll';

/** 휠·트랙패드 스크롤을 부드럽게 감속시키는 Lenis를 전역에 적용합니다. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    setLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    // 부드러운 스크롤이 끝나기 전에 새로고침하면 브라우저가 중간 위치를 저장하므로,
    // 페이지를 떠나기 직전에 목표 위치로 바로 이동시켜 둡니다.
    const settleBeforeLeave = () => {
      if (lenis.isScrolling) {
        lenis.scrollTo(lenis.targetScroll, { immediate: true, force: true });
      }
    };
    window.addEventListener('pagehide', settleBeforeLeave);
    window.addEventListener('beforeunload', settleBeforeLeave);

    return () => {
      window.removeEventListener('pagehide', settleBeforeLeave);
      window.removeEventListener('beforeunload', settleBeforeLeave);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
