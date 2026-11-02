import { SEO } from '../components/common/SEO';
import { LinkButton } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { pageMeta } from '../constants/seo';

/** 존재하지 않는 경로·프로젝트. 검색엔진이 색인하지 않도록 noindex 를 겁니다. */
export function NotFoundPage() {
  return (
    <>
      <SEO meta={pageMeta.notFound} />
      <Section id="not-found" title="404" description="페이지를 찾을 수 없습니다." width="narrow">
        <div style={{ textAlign: 'center' }}>
          <LinkButton href="/">홈으로 돌아가기</LinkButton>
        </div>
      </Section>
    </>
  );
}
