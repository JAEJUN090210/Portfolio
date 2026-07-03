import styled from '@emotion/styled';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const Bar = styled.div<{ progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 80;
  width: ${({ progress }) => progress * 100}%;
  height: 2px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.warm});
  transition: width 80ms linear;
`;

export function ScrollProgress() {
  const progress = useScrollProgress();
  return <Bar progress={progress} aria-hidden="true" />;
}
