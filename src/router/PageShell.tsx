import { Suspense, type ReactNode } from 'react';
import { SEO } from '../components/common/SEO';
import { Skeleton } from '../components/ui/Skeleton';

type PageShellProps = {
  title: string;
  path: string;
  children: ReactNode;
};

export function PageShell({ title, path, children }: PageShellProps) {
  return (
    <Suspense
      fallback={
        <div style={{ width: 'min(1120px, calc(100% - 2rem))', margin: '6rem auto' }}>
          <Skeleton height="4rem" width="65%" />
          <div style={{ height: '1rem' }} />
          <Skeleton height="18rem" />
        </div>
      }
    >
      <SEO title={title} path={path} />
      {children}
    </Suspense>
  );
}
