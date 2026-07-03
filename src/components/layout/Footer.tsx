import styled from '@emotion/styled';
import { Github, Mail } from 'lucide-react';
import { siteConfig } from '../../constants/site';

const Shell = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[10]} 0;
`;

const Inner = styled.div`
  display: flex;
  width: min(1120px, calc(100% - 2rem));
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[6]};
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Links = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};

  a {
    display: inline-grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export function Footer() {
  return (
    <Shell className="no-print">
      <Inner>
        <p>세상을 이롭게 만들 수 있는 개발자가 되고 싶은 전재준입니다.</p>
        <Links aria-label="외부 링크">
          <a href={`mailto:${siteConfig.email}`} aria-label="이메일 보내기">
            <Mail size={17} />
          </a>
          <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
        </Links>
      </Inner>
    </Shell>
  );
}
