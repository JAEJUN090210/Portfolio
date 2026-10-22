import styled from '@emotion/styled';
import type { Project } from '../../types/portfolio';

type ProjectPreviewProps = {
  variant: Project['imageVariant'];
  fill?: boolean;
};

const Preview = styled.div<{ variant: Project['imageVariant']; $fill: boolean }>`
  position: relative;
  min-height: ${({ $fill }) => ($fill ? '100%' : '112px')};
  height: 100%;
  overflow: hidden;
  background: ${({ variant }) =>
    ({
      aurora:
        'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.4), transparent 50%), #0f1115',
      mono: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 55%), linear-gradient(160deg, #1a1a1a, #0b0b0b)',
      studio:
        'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.42), transparent 55%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.35), transparent 50%), #0f1115',
    })[variant]};

  &::before {
    position: absolute;
    inset: 0;
    content: '';
    background:
      linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(circle at center, #000 30%, transparent 85%);
  }
`;

const Window = styled.div`
  position: absolute;
  right: 8%;
  bottom: 10%;
  width: min(60%, 420px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: rgba(10, 10, 10, 0.72);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(18px);
`;

const Chrome = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  height: 1.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 ${({ theme }) => theme.spacing[3]};
`;

const Dot = styled.span<{ tone: string }>`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ tone }) => tone};
`;

const Rows = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Row = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.7), rgba(59, 130, 246, 0.45));
`;

export function ProjectPreview({ variant, fill = false }: ProjectPreviewProps) {
  return (
    <Preview variant={variant} $fill={fill} aria-hidden="true">
      <Window>
        <Chrome>
          <Dot tone="#ff8a8a" />
          <Dot tone="#f5c16c" />
          <Dot tone="#8bd39c" />
        </Chrome>
        <Rows>
          <Row $width="74%" />
          <Row $width="92%" />
          <Row $width="48%" />
          <Row $width="82%" />
        </Rows>
      </Window>
    </Preview>
  );
}
