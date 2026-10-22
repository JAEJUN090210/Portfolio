import styled from '@emotion/styled';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RichText } from '../components/common/RichText';
import { SEO } from '../components/common/SEO';
import { ProjectPreview } from '../components/section/ProjectPreview';
import { Badge, Tag } from '../components/ui/Tag';
import { projects } from '../constants/portfolio';
import type { Project, ProjectTroubleshooting } from '../types/portfolio';
import { NotFoundPage } from './NotFoundPage';

const Shell = styled.article`
  width: min(896px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} 0 ${({ theme }) => theme.spacing[20]};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 160ms ease;

  &:hover {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 8%, transparent);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Gallery = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.panel};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GalleryTitle = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.45);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
`;

const GalleryButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ side }) => side}: 0.75rem;
  display: inline-grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
  transform: translateY(-50%);
  transition: background 160ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  display: flex;
  gap: 0.4rem;
  transform: translateX(-50%);

  button {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
  }

  button[aria-current='true'] {
    background: #ffffff;
  }
`;

const Head = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing[10]};
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(1.875rem, 3.5vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 0.35rem 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.8rem;
    font-weight: 600;
    transition: border-color 160ms ease;
  }

  a:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  svg {
    width: 0.85rem;
    height: 0.85rem;
  }
`;

const Summary = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.125rem;
  line-height: 1.7;
`;

const Facts = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[5]} 0;

  div {
    display: grid;
    gap: 0.3rem;
  }

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9375rem;
    line-height: 1.6;
    word-break: keep-all;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Body = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const Block = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};

  h2 {
    margin: 0 0 -${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  h3 {
    margin: ${({ theme }) => theme.spacing[4]} 0 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.375rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  h3 small {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.8;
    word-break: keep-all;
  }

  ul {
    display: grid;
    gap: ${({ theme }) => theme.spacing[2]};
    margin: 0;
    padding-left: 1.5rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.75;
    word-break: keep-all;
  }

  mark {
    color: ${({ theme }) => theme.colors.accent};
    background: transparent;
  }
`;

const Features = styled.ul`
  && {
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    gap: 0.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[3]} 0;
  }

  li:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    li {
      grid-template-columns: 8rem 1fr;
      gap: ${({ theme }) => theme.spacing[4]};
    }
  }
`;

const Trouble = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.panel} 60%, transparent);

  h3 {
    margin: 0;
  }
`;

const Steps = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  margin: 0;

  div {
    display: grid;
    gap: 0.35rem;
  }

  dt {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.8;
    word-break: keep-all;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    div {
      grid-template-columns: 5.5rem 1fr;
      gap: ${({ theme }) => theme.spacing[4]};
    }

    dt {
      padding-top: 0.2rem;
    }
  }
`;

const Retrospective = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  padding-left: ${({ theme }) => theme.spacing[5]};
`;

/** 트러블슈팅 항목을 보여 줄 순서와 라벨 */
const TROUBLE_STEPS: { key: keyof ProjectTroubleshooting; label: string }[] = [
  { key: 'situation', label: '상황' },
  { key: 'problem', label: '문제' },
  { key: 'cause', label: '원인' },
  { key: 'solution', label: '해결' },
  { key: 'decision', label: '판단 기준' },
  { key: 'result', label: '결과' },
  { key: 'improvement', label: '개선점' },
];

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [index, setIndex] = useState(0);
  const count = images.length;
  const move = (delta: number) => setIndex((current) => (current + delta + count) % count);

  if (count === 0) {
    return (
      <Gallery>
        <ProjectPreview variant={project.imageVariant} fill />
        <GalleryTitle>{project.title}.</GalleryTitle>
      </Gallery>
    );
  }

  return (
    <Gallery>
      <img src={images[index]} alt={`${project.title} - ${index + 1}`} />
      {count > 1 && (
        <>
          <GalleryButton
            type="button"
            side="left"
            aria-label="이전 이미지"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} />
          </GalleryButton>
          <GalleryButton
            type="button"
            side="right"
            aria-label="다음 이미지"
            onClick={() => move(1)}
          >
            <ChevronRight size={20} />
          </GalleryButton>
          <Dots>
            {images.map((image, dotIndex) => (
              <button
                key={image}
                type="button"
                aria-label={`${dotIndex + 1}번째 이미지`}
                aria-current={dotIndex === index}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </Dots>
        </>
      )}
    </Gallery>
  );
}

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <NotFoundPage />;
  }

  const { detail } = project;
  const statusTone = project.status === '서비스 중' ? 'green' : 'blue';
  const facts = [
    { label: '기간', value: project.period },
    { label: '팀', value: project.team },
    { label: '역할', value: project.position },
    { label: '기여도', value: project.contribution },
    { label: '운영 규모', value: project.scale },
    { label: '협업', value: project.collaboration },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <Shell>
      <SEO
        title={`${project.title} - ${project.summary}`}
        description={project.description}
        path={`/projects/${project.id}`}
      />
      <BackLink to="/#projects">
        <ChevronLeft />
        프로젝트 목록으로
      </BackLink>

      <ProjectGallery project={project} />

      <Head>
        <TitleRow>
          <Title>
            <h1>{project.title}</h1>
            <Badge tone={statusTone}>{project.status}</Badge>
          </Title>
          <Links>
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowRight />
              </a>
            ))}
          </Links>
        </TitleRow>
        <Summary>{project.summary}</Summary>
        <Facts>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </Facts>
        <Chips>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Chips>
      </Head>

      <Body>
        <Block>
          <h2>프로젝트 소개</h2>
          {detail.intro.map((paragraph) => (
            <p key={paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}
        </Block>

        {detail.features && detail.features.length > 0 && (
          <Block>
            <h2>주요 기능</h2>
            <Features>
              {detail.features.map((feature) => (
                <li key={feature.label}>
                  <strong>{feature.label}</strong>
                  <span>{feature.text}</span>
                </li>
              ))}
            </Features>
          </Block>
        )}

        <Block>
          <h2>내 역할과 개발 내용</h2>
          {detail.sections.map((section, index) => (
            <Fragment key={section.title}>
              <h3>
                <small>{String(index + 1).padStart(2, '0')}</small>
                {section.title}
              </h3>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}
        </Block>

        {detail.troubleshooting && detail.troubleshooting.length > 0 && (
          <Block>
            <h2>트러블슈팅</h2>
            {detail.troubleshooting.map((item, index) => (
              <Trouble key={item.title}>
                <h3>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  {item.title}
                </h3>
                <Steps>
                  {TROUBLE_STEPS.filter((step) => item[step.key]).map((step) => (
                    <div key={step.key}>
                      <dt>{step.label}</dt>
                      <dd>
                        <RichText text={item[step.key] as string} />
                      </dd>
                    </div>
                  ))}
                </Steps>
              </Trouble>
            ))}
          </Block>
        )}

        {detail.retrospective && detail.retrospective.length > 0 && (
          <Block>
            <h2>회고</h2>
            <Retrospective>
              {detail.retrospective.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </Retrospective>
          </Block>
        )}
      </Body>
    </Shell>
  );
}
