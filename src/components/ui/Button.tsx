import styled from '@emotion/styled';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

const StyledLink = styled.a`
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  transition:
    transform 180ms ease,
    opacity 180ms ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

export function LinkButton({ children, ...props }: LinkButtonProps) {
  return <StyledLink {...props}>{children}</StyledLink>;
}
