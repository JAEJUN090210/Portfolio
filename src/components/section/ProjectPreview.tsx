import styled from '@emotion/styled';
import type { Project } from '../../types/portfolio';

type ProjectPreviewProps = {
  variant: Project['imageVariant'];
};

const Preview = styled.div<{ variant: Project['imageVariant'] }>`
  position: relative;
  min-height: 112px;
  overflow: hidden;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ variant }) =>
    ({
      aurora:
        'linear-gradient(135deg, rgba(125, 211, 252, 0.28), rgba(245, 193, 108, 0.14)), #101216',
      mono: 'linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.03)), #101113',
      studio:
        'linear-gradient(135deg, rgba(139, 211, 156, 0.22), rgba(125, 211, 252, 0.16)), #101216',
    })[variant]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  &::before {
    position: absolute;
    inset: 0.8rem;
    content: '';
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: ${({ theme }) => theme.radii.lg};
    background:
      linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-size: 22px 22px;
  }
`;

const Window = styled.div`
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  width: min(72%, 260px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: rgba(5, 5, 5, 0.78);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
`;

const Chrome = styled.div`
  display: flex;
  gap: 0.36rem;
  align-items: center;
  height: 1.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 ${({ theme }) => theme.spacing[3]};
`;

const Dot = styled.span<{ tone: string }>`
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 50%;
  background: ${({ tone }) => tone};
`;

const Rows = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]};
`;

const Row = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 0.48rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.74), rgba(125, 211, 252, 0.44));
`;

export function ProjectPreview({ variant }: ProjectPreviewProps) {
  return (
    <Preview variant={variant} aria-hidden="true">
      <Window>
        <Chrome>
          <Dot tone="#ff8a8a" />
          <Dot tone="#f5c16c" />
          <Dot tone="#8bd39c" />
        </Chrome>
        <Rows>
          <Row width="74%" />
          <Row width="92%" />
          <Row width="48%" />
          <Row width="82%" />
        </Rows>
      </Window>
    </Preview>
  );
}
