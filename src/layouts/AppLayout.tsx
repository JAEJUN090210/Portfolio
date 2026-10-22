import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BackToTop } from '../components/common/BackToTop';
import { CustomCursor } from '../components/common/CustomCursor';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { SideLabel } from '../components/common/SideLabel';
import { SkipLink } from '../components/common/SkipLink';
import { SmoothScroll } from '../components/common/SmoothScroll';
import { ToastViewport } from '../components/common/ToastViewport';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { scrollToTarget } from '../lib/smoothScroll';

function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true });
      return undefined;
    }

    // 바로 찾으면 즉시 스크롤하고, 대상 섹션이 lazy 로딩 중이면 나타날 때까지 잠시 재시도합니다.
    const id = hash.slice(1);
    const immediateTarget = document.getElementById(id);
    if (immediateTarget) {
      scrollToTarget(immediateTarget);
      return undefined;
    }

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      const target = document.getElementById(id);
      attempts += 1;
      if (target || attempts >= 30) {
        window.clearInterval(intervalId);
        if (target) {
          scrollToTarget(target);
        }
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [hash, pathname]);
}

export function AppLayout() {
  useHashScroll();

  return (
    <>
      <SkipLink />
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <SideLabel />
      <main id="main-content" style={{ minHeight: 'calc(100vh - 13rem)' }}>
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
      <BackToTop />
      <CustomCursor />
    </>
  );
}
