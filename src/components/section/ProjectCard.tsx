import styled from '@emotion/styled';
import { ExternalLink, Github } from 'lucide-react';
import { memo } from 'react';
import type { Project } from '../../types/portfolio';
import { LinkButton } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { ProjectPreview } from './ProjectPreview';

type ProjectCardProps = {
  project: Project;
};

const Card = styled.article`
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.panel} 88%, transparent);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.panelSoft};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
  }
`;

const Body = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[5]};
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.08rem;
  line-height: 1.24;
`;

const Summary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const Detail = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;

  div {
    display: grid;
    gap: ${({ theme }) => theme.spacing[1]};
  }

  dt {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 800;
  }

  dd {
    margin: 0;
    line-height: 1.65;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`;

function ProjectCardComponent({ project }: ProjectCardProps) {
  return (
    <Card>
      <ProjectPreview variant={project.imageVariant} />
      <Body>
        <Meta>
          <Tag>{project.year}</Tag>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Meta>
        <div>
          <Title>{project.title}</Title>
          <Summary>{project.summary}</Summary>
        </div>
        <Detail>
          <div>
            <dt>역할</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>문제 해결</dt>
            <dd>{project.problemSolving}</dd>
          </div>
        </Detail>
        <Actions>
          <LinkButton href={project.githubUrl} target="_blank" rel="noreferrer" variant="secondary" icon={<Github />}>
            GitHub
          </LinkButton>
          <LinkButton href={project.demoUrl} target="_blank" rel="noreferrer" variant="ghost" icon={<ExternalLink />}>
            보기
          </LinkButton>
        </Actions>
      </Body>
    </Card>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
