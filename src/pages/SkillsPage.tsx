import { SkillMatrix } from '../components/section/SkillMatrix';
import { Section } from '../components/ui/Section';

export function SkillsPage() {
  return (
    <Section
      id="skills"
      title="기술 스택"
      description="주로 사용하는 기술을 정리했습니다."
    >
      <SkillMatrix />
    </Section>
  );
}
