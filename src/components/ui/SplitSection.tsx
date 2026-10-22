import styled from '@emotion/styled';
import type { HTMLAttributes, ReactNode } from 'react';
import { SplitTitle } from '../common/SplitTitle';

type SplitSectionProps = HTMLAttributes<HTMLElement> & {
  title: string;
  children: ReactNode;
};

const Shell = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  display: grid;
  width: min(1152px, calc(100% - 2.5rem));
  gap: ${({ theme }) => theme.spacing[10]};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[24]} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 11rem minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing[12]};
    padding: 9rem 0;
  }
`;

const Heading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.mono};
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    position: sticky;
    top: 6rem;
    font-size: 1.25rem;
  }
`;

/** 왼쪽에 고정되는 이탤릭 제목, 오른쪽에 내용을 두는 2단 섹션입니다. */
export function SplitSection({ title, children, ...props }: SplitSectionProps) {
  return (
    <Shell {...props}>
      <Inner>
        <div>
          <Heading>
            <SplitTitle text={title} />
          </Heading>
        </div>
        <div>{children}</div>
      </Inner>
    </Shell>
  );
}
