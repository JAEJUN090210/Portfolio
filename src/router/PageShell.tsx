import { Suspense, type ReactNode } from 'react';
import { SEO } from '../components/common/SEO';
import { Skeleton } from '../components/ui/Skeleton';
import type { PageMeta } from '../constants/seo';

type PageShellProps = {
  meta: PageMeta;
  children: ReactNode;
};

/**
 * 로딩 자리표시자. 바깥 여백은 margin 대신 padding 으로 둡니다.
 * margin 은 <main> 으로 병합되어 본문 전체를 아래로 밀었다가 되돌리는 큰 레이아웃 이동(CLS)을 만듭니다.
 */
const fallbackStyle = {
  width: 'min(1120px, calc(100% - 2rem))',
  margin: '0 auto',
  padding: '6rem 0',
} as const;

export function PageShell({ meta, children }: PageShellProps) {
  return (
    <Suspense
      fallback={
        <div style={fallbackStyle} aria-busy="true" aria-label="페이지 불러오는 중">
          <Skeleton height="4rem" width="65%" />
          <div style={{ height: '1rem' }} />
          <Skeleton height="18rem" />
        </div>
      }
    >
      <SEO meta={meta} />
      {children}
    </Suspense>
  );
}
