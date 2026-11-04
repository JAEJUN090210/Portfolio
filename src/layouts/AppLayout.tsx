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

/** 섹션으로 이동한 뒤 URL에서 해시를 지워, 새로고침하면 다시 그 섹션으로 가지 않고 맨 위에서 시작하게 합니다. */
function clearHashFromUrl() {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, '', pathname + search);
}

function useHashScroll() {
  const { hash, pathname } = useLocation();

  // 브라우저가 새로고침 시 이전 스크롤 위치를 되살리지 않도록 해, 항상 맨 위에서 시작합니다.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

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
      clearHashFromUrl();
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
        clearHashFromUrl();
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
      {/* 본문이 한 화면을 꽉 채우게 해, 페이지 청크를 기다리는 동안 푸터가 첫 화면에 보였다가 밀려나는 레이아웃 이동을 막습니다. */}
      <main id="main-content" style={{ minHeight: '100svh' }}>
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
      <BackToTop />
      <CustomCursor />
    </>
  );
}
