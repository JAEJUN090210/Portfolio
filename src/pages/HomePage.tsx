import styled from '@emotion/styled';
import { Copy, Download, Github, Mail } from 'lucide-react';
import { useMemo } from 'react';
import { GitHubPanel } from '../components/section/GitHubPanel';
import { ProjectCard } from '../components/section/ProjectCard';
import { SkillMatrix } from '../components/section/SkillMatrix';
import { Button, LinkButton } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { Tag } from '../components/ui/Tag';
import { contactLinks, experiences, projects } from '../constants/portfolio';
import { siteConfig } from '../constants/site';
import { downloadPortfolioPdf } from '../services/pdfService';
import { usePushToast } from '../stores/settingStore';

const Hero = styled.section`
  width: min(880px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[10]};
`;

const HeroLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.95rem;
  font-weight: 800;
`;

const Title = styled.h1`
  max-width: 680px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.9rem, 4vw, 2.45rem);
  line-height: 1.34;
  letter-spacing: 0;
  font-weight: 800;
  word-break: keep-all;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const AboutText = styled.div`
  display: grid;
  max-width: 820px;
  gap: ${({ theme }) => theme.spacing[4]};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.85;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Timeline = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing[5]};

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.75;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[5]};
  background: ${({ theme }) => theme.colors.panel};

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export function HomePage() {
  const pushToast = usePushToast();
  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    pushToast('이메일을 복사했습니다.', 'success');
  };

  return (
    <>
      <Hero id="home">
        <HeroLayout>
          <div>
            <Eyebrow>{siteConfig.role}</Eyebrow>
            <Title>{siteConfig.headline}</Title>
            <Actions>
              <LinkButton href="#projects">프로젝트 보기</LinkButton>
              <Button
                type="button"
                variant="secondary"
                icon={<Download />}
                onClick={() => downloadPortfolioPdf('portfolio-print', 'Jaejun-Jeon-Portfolio.pdf')}
              >
                PDF 다운로드
              </Button>
              <Button type="button" variant="ghost" icon={<Copy />} onClick={copyEmail}>
                이메일 복사
              </Button>
            </Actions>
          </div>
        </HeroLayout>
      </Hero>

      <Section id="about" eyebrow="About" title="저는 이런 사람입니다.">
        <AboutText>
          <p>
            저는 다양한 경험을 통해 더 나은 사람이 되고자 노력하는 사람입니다. 개발자로서의 경험을
            쌓는 과정에서, 문제를 해결하고 개선하는 과정에서 성장할 수 있다는 것을 깨달았습니다.
            아직 부족한 점이 많지만, 끊임 없이 배우며 성장하는 개발자가 되기 위해 노력하고 있습니다.
            앞으로도 다양한 경험을 통해 더 나은 개발자로 성장해 나가겠습니다.
          </p>
          <p>
            이를 통해, 저는 세상에 이로운 개발자가 되고자 합니다. 기술을 통해 사람들의 삶을 개선하고, 더 나은 세상을 만드는 데 기여하고 싶습니다.
          </p>
        </AboutText>
      </Section>

      <Section
        id="skills"
        eyebrow="Stack"
        title="이런 기술을 사용합니다."
        description="주로 사용하는 기술을 정리했습니다."
      >
        <SkillMatrix />
      </Section>

      <Section
        id="projects"
        eyebrow="Projects"
        title="이런 프로젝트를 진행했습니다."
        description="역할, 사용 기술, 해결한 문제를 중심으로 정리했습니다."
      >
        <ProjectGrid>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectGrid>
      </Section>

      <Section
        id="github"
        eyebrow="GitHub"
        title="최근 이러한 작업을 했습니다."
        description="최근 작업한 저장소를 간단히 확인할 수 있습니다."
      >
        <GitHubPanel />
      </Section>

      <Section id="experience" eyebrow="Experience" title="이런 활동을 했습니다.">
        <Timeline>
          {experiences.map((experience) => (
            <TimelineItem key={experience.title}>
              <Tag>{experience.period}</Tag>
              <div>
                <h3>{experience.title}</h3>
                <p>
                  {experience.organization} · {experience.description}
                </p>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section
        id="contact"
        title="Contact"
      >
        <Actions>
          <Button type="button" icon={<Copy />} onClick={copyEmail}>
            이메일 복사
          </Button>
          <LinkButton href={`mailto:${siteConfig.email}`} variant="secondary" icon={<Mail />}>
            이메일 보내기
          </LinkButton>
          <LinkButton
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<Github />}
          >
            GitHub
          </LinkButton>
        </Actions>
        <ContactGrid>
          {contactLinks.map((link) => (
            <ContactCard
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <strong>{link.label}</strong>
              <span>{link.value}</span>
            </ContactCard>
          ))}
        </ContactGrid>
      </Section>
    </>
  );
}
