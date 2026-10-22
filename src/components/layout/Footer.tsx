import styled from '@emotion/styled';
import { Github, Mail } from 'lucide-react';
import { footerBio, sectionAnchors, siteConfig } from '../../constants/site';
import { HashLink } from '../common/HashLink';

const Shell = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
`;

const Inner = styled.div`
  display: grid;
  width: min(1280px, calc(100% - 2rem));
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[12]};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[16]} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[10]};
    padding: ${({ theme }) => theme.spacing[12]} 0;
  }
`;

const Column = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Name = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const Bio = styled(Muted)`
  max-width: 20rem;
`;

const Heading = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const LinkList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};

  a {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
    transition: color 160ms ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const quickLinks = sectionAnchors.filter((anchor) => anchor.id !== 'home');

export function Footer() {
  return (
    <Shell className="no-print">
      <Inner>
        <Column>
          <div>
            <Name>{siteConfig.englishName}</Name>
            <Muted style={{ marginTop: '0.25rem' }}>{siteConfig.role}</Muted>
          </div>
          <Bio>
            {footerBio.lead} <strong>{footerBio.highlight}</strong>
            {footerBio.tail}
          </Bio>
        </Column>
        <Column>
          <Heading>Connect</Heading>
          <LinkList>
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github />
              GitHub
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail />
              Email
            </a>
          </LinkList>
        </Column>
        <Column>
          <Heading>Quick Links</Heading>
          <LinkList>
            {quickLinks.map((anchor) => (
              <HashLink key={anchor.id} to={`/#${anchor.id}`}>
                {anchor.label}
              </HashLink>
            ))}
          </LinkList>
        </Column>
      </Inner>
    </Shell>
  );
}
