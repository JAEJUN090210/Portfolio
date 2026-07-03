import styled from '@emotion/styled';
import { ProjectCard } from '../components/section/ProjectCard';
import { Section } from '../components/ui/Section';
import { projects } from '../constants/portfolio';

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export function ProjectsPage() {
  return (
    <Section
      id="projects"
      title="프로젝트 목록"
      description="진행했던 프로젝트를 역할과 문제 해결 과정 중심으로 정리했습니다."
    >
      <Grid>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Grid>
    </Section>
  );
}
