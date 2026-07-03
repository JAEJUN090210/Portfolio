import { LinkButton } from '../components/ui/Button';
import { Section } from '../components/ui/Section';

export function NotFoundPage() {
  return (
    <Section id="not-found" eyebrow="404" title="페이지를 찾을 수 없습니다.">
      <LinkButton href="/">홈으로 돌아가기</LinkButton>
    </Section>
  );
}
