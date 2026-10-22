import styled from '@emotion/styled';
import { ArrowUp } from 'lucide-react';
import { useScrollPast } from '../../hooks/useScrollProgress';
import { scrollToTarget } from '../../lib/smoothScroll';

const Button = styled.button<{ visible: boolean }>`
  position: fixed;
  right: ${({ theme }) => theme.spacing[4]};
  bottom: ${({ theme }) => theme.spacing[20]};
  z-index: 60;
  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.panel};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transform: translateY(${({ visible }) => (visible ? '0' : '8px')});
  transition:
    opacity 160ms ease,
    transform 160ms ease;
`;

export function BackToTop() {
  const visible = useScrollPast(0.2);

  return (
    <Button
      className="no-print"
      visible={visible}
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTarget(0)}
    >
      <ArrowUp size={18} />
    </Button>
  );
}
