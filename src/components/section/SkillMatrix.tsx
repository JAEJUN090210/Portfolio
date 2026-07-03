import styled from '@emotion/styled';
import { useMemo } from 'react';
import { skills } from '../../constants/portfolio';
import type { SkillCategory } from '../../types/portfolio';

const categories: SkillCategory[] = ['Frontend', 'Backend', 'DevOps', 'Cloud', 'PackageManager', 'Tools'];

const categoryLabels: Record<SkillCategory, string> = {
  Frontend: '프론트엔드',
  Backend: '백엔드',
  DevOps: 'DevOps',
  Cloud: '배포',
  PackageManager: '패키지 매니저',
  Tools: '도구',
};

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Category = styled.article`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.98rem;
`;

const SkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SkillItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.bgElevated};
  font-size: 0.88rem;
`;

export function SkillMatrix() {
  const groupedSkills = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: skills.filter((skill) => skill.category === category),
        }))
        .filter(({ items }) => items.length > 0),
    [],
  );

  return (
    <Grid>
      {groupedSkills.map(({ category, items }) => (
        <Category key={category}>
          <Title>{categoryLabels[category]}</Title>
          <SkillList>
            {items.map((skill) => (
              <SkillItem key={skill.name}>{skill.name}</SkillItem>
            ))}
          </SkillList>
        </Category>
      ))}
    </Grid>
  );
}
