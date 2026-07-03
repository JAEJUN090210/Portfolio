import { Outlet } from 'react-router-dom';
import { BackToTop } from '../components/common/BackToTop';
import { PdfPortfolio } from '../components/common/PdfPortfolio';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { SkipLink } from '../components/common/SkipLink';
import { ToastViewport } from '../components/common/ToastViewport';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useScrollSpy } from '../hooks/useScrollSpy';

export function AppLayout() {
  useScrollSpy();

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main-content" style={{ minHeight: 'calc(100vh - 13rem)' }}>
        <Outlet />
      </main>
      <Footer />
      <ToastViewport />
      <BackToTop />
      <PdfPortfolio />
    </>
  );
}
