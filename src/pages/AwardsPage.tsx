import { AwardRows } from '../components/section/ExperienceList';
import { SplitSection } from '../components/ui/SplitSection';

export function AwardsPage() {
  return (
    <SplitSection id="awards" title="AWARDS">
      <AwardRows standalone />
    </SplitSection>
  );
}
