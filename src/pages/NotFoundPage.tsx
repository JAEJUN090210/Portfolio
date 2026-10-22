import { LinkButton } from '../components/ui/Button';
import { Section } from '../components/ui/Section';

export function NotFoundPage() {
  return (
    <Section id="not-found" title="404" description="페이지를 찾을 수 없습니다." width="narrow">
      <div style={{ textAlign: 'center' }}>
        <LinkButton href="/">홈으로 돌아가기</LinkButton>
      </div>
    </Section>
  );
}
