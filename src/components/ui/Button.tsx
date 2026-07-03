import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
};

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const buttonStyles = ({ variant = 'primary' }: { variant?: ButtonVariant }) => ({
  primary: {
    color: '#ffffff',
    background: '#111111',
    borderColor: '#111111',
  },
  secondary: {
    color: 'inherit',
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  ghost: {
    color: 'inherit',
    background: 'transparent',
    borderColor: 'transparent',
  },
}[variant]);

const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  display: inline-flex;
  min-height: 2.35rem;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ variant }) => buttonStyles({ variant }).color};
  background: ${({ variant }) => buttonStyles({ variant }).background};
  border-color: ${({ variant }) => buttonStyles({ variant }).borderColor};
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
    transform: none;
  }
`;

const StyledLink = StyledButton.withComponent('a');

export function Button({ variant = 'primary', icon, children, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

export function LinkButton({ variant = 'primary', icon, children, ...props }: LinkButtonProps) {
  return (
    <StyledLink variant={variant} {...props}>
      {icon}
      <span>{children}</span>
    </StyledLink>
  );
}
