import styled from '@emotion/styled';
import type { HTMLAttributes, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

const StyledSection = styled.section<{ visible: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]} 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '20px')});
  transition:
    opacity 520ms ease,
    transform 520ms ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${({ theme }) => theme.spacing[10]} 0;
  }
`;

const Inner = styled.div`
  width: min(880px, calc(100% - 2rem));
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 680px;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.28rem, 2.6vw, 1.65rem);
  line-height: 1.38;
  letter-spacing: 0;
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing[5]} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.75;
`;

export function Section({ eyebrow, title, description, children, ...props }: SectionProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <StyledSection ref={ref} visible={isVisible} {...props}>
      <Inner>
        {(eyebrow || title || description) && (
          <Header>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </Header>
        )}
        {children}
      </Inner>
    </StyledSection>
  );
}
