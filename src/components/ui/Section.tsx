import styled from '@emotion/styled';
import type { HTMLAttributes, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { SplitTitle } from '../common/SplitTitle';

type SectionProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
  align?: 'center' | 'left';
  width?: 'wide' | 'narrow' | 'full';
  children: ReactNode;
};

const StyledSection = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[20]} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${({ theme }) => theme.spacing[16]} 0;
  }
`;

const widths = { wide: '1280px', narrow: '896px' } as const;

const Inner = styled.div<{ $width: 'wide' | 'narrow' | 'full' }>`
  width: ${({ $width }) =>
    $width === 'full' ? '100%' : `min(${widths[$width]}, calc(100% - 2rem))`};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    width: ${({ $width }) =>
      $width === 'full' ? '100%' : `min(${widths[$width]}, calc(100% - 4rem))`};
  }
`;

const Header = styled.div<{ $align: 'center' | 'left'; visible: boolean }>`
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto ${({ theme }) => theme.spacing[12]};
  text-align: ${({ $align }) => $align};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '20px')});
  transition:
    opacity 600ms ease,
    transform 600ms ease;
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.875rem, 3.2vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const Description = styled.p<{ $align: 'center' | 'left' }>`
  max-width: 42rem;
  margin: ${({ $align }) => ($align === 'center' ? '0 auto' : '0')};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.125rem;
  line-height: 1.7;
`;

export function Section({
  title,
  description,
  align = 'center',
  width = 'wide',
  children,
  ...props
}: SectionProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <StyledSection {...props}>
      <Inner $width={width}>
        {(title || description) && (
          <Header ref={ref} $align={align} visible={isVisible}>
            {title && (
              <Title>
                <SplitTitle text={title} />
              </Title>
            )}
            {description && <Description $align={align}>{description}</Description>}
          </Header>
        )}
        {children}
      </Inner>
    </StyledSection>
  );
}
