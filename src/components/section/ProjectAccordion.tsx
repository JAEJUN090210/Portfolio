import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../constants/portfolio';
import type { Project } from '../../types/portfolio';
import { ACCORDION_COVER_SIZES } from '../../utils/image';
import { RichText } from '../common/RichText';
import { ProjectCover } from './ProjectCover';

const Intro = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.text};
  list-style: none;
`;

const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

/** 아코디언 헤딩. 제목 h2(PROJECTS) 아래 프로젝트 이름이 h3 로 읽히도록 버튼을 감쌉니다. */
const Heading = styled.h3`
  margin: 0;
  font: inherit;
`;

const Toggle = styled.button<{ open: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  column-gap: ${({ theme }) => theme.spacing[6]};
  row-gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[6]} 0;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  text-align: left;

  .year {
    grid-column: 1 / -1;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }

  .title {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    transition: color 200ms ease;
  }

  .summary {
    display: block;
    margin-top: ${({ theme }) => theme.spacing[1]};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .plus {
    color: ${({ open, theme }) => (open ? theme.colors.accent : theme.colors.text)};
    font-size: 1.5rem;
    line-height: 1;
    transform: rotate(${({ open }) => (open ? '45deg' : '0deg')});
    transition: transform 200ms ease;
  }

  &:hover .title {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 7.5rem 1fr auto;

    .year {
      grid-column: auto;
    }

    .title {
      font-size: 1.5rem;
    }
  }
`;

const Panel = styled.div<{ open: boolean }>`
  display: grid;
  grid-template-rows: ${({ open }) => (open ? '1fr' : '0fr')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition:
    grid-template-rows 320ms ease,
    opacity 320ms ease;

  > div {
    min-height: 0;
    overflow: hidden;
  }
`;

const PanelBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[10]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    margin-left: 7.5rem;
  }
`;

const CoverLink = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  img {
    transition: transform 600ms ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  .label {
    position: absolute;
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => theme.spacing[4]};
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: ${({ theme }) => theme.radii.pill};
    padding: 0.35rem 0.85rem;
    color: #ffffff;
    background: rgba(10, 10, 10, 0.55);
    font-size: 0.8125rem;
    font-weight: 600;
    backdrop-filter: blur(12px);
    transition: background 160ms ease;
  }

  &:hover .label {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[1]};
  line-height: 1.7;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-family: ${({ theme }) => theme.typography.sans};
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  p {
    margin: 0;
  }

  p + p {
    margin-top: ${({ theme }) => theme.spacing[2]};
  }

  mark {
    color: ${({ theme }) => theme.colors.accent};
    background: transparent;
  }

  .muted {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 8.5rem 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const Contributions = styled.ul`
  display: grid;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    gap: ${({ theme }) => theme.spacing[3]};
  }

  li::before {
    color: ${({ theme }) => theme.colors.accent};
    content: '→';
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 160ms ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

type ProjectRowProps = {
  project: Project;
  defaultOpen: boolean;
  /** 첫 화면에 보이는 대표 이미지는 바로 불러옵니다(프로젝트 목록 페이지의 첫 항목). */
  eagerCover?: boolean;
};

function ProjectRow({ project, defaultOpen, eagerCover = false }: ProjectRowProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `panel-${project.id}`;
  const contributions = project.detail.highlights;

  // 닫힌 패널은 inert 로 포커스·보조기기 접근을 함께 막습니다.
  // aria-hidden 만 쓰면 안의 링크가 여전히 Tab 으로 닿아 접근성 검사에 걸립니다. (React 18 은 inert 를 모르는 속성이라 문자열로 넘깁니다.)
  const inert = open ? {} : { inert: '' };

  return (
    <Item>
      <Heading>
        <Toggle
          type="button"
          open={open}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="year">{project.period}</span>
          <span>
            <span className="title">{project.title}</span>
            <span className="summary">{project.summary}</span>
          </span>
          <span className="plus" aria-hidden="true">
            +
          </span>
        </Toggle>
      </Heading>
      <Panel id={panelId} open={open} {...inert}>
        <div>
          <PanelBody>
            {project.cover && (
              <CoverLink to={`/projects/${project.id}`} aria-label={`${project.title} 상세 보기`}>
                <ProjectCover
                  src={project.cover}
                  alt={`${project.title} 서비스 화면`}
                  eager={eagerCover}
                  dim={0.4}
                  sizes={ACCORDION_COVER_SIZES}
                >
                  <span className="label" aria-hidden="true">
                    상세 보기 ↗
                  </span>
                </ProjectCover>
              </CoverLink>
            )}
            <Field>
              <h4>Role</h4>
              <div>
                <p>{project.role}</p>
                <p className="muted">{project.status}</p>
              </div>
            </Field>
            <Field>
              <h4>Overview</h4>
              <div>
                {project.detail.intro.map((paragraph) => (
                  <p key={paragraph}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            </Field>
            {contributions.length > 0 && (
              <Field>
                <h4>Contribution</h4>
                <Contributions>
                  {contributions.map((bullet) => (
                    <li key={bullet}>
                      <span>
                        <RichText text={bullet} />
                      </span>
                    </li>
                  ))}
                </Contributions>
              </Field>
            )}
            <Field>
              <h4>Tech</h4>
              <p className="muted">{project.tags.join(' · ')}</p>
            </Field>
            <Field>
              <h4>Links</h4>
              <Links>
                <Link to={`/projects/${project.id}`}>상세 보기 ↗</Link>
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </Links>
            </Field>
          </PanelBody>
        </div>
      </Panel>
    </Item>
  );
}

const MoreButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[5]} 0;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  background: transparent;
  font-weight: 600;
  transition: color 160ms ease;

  .plus {
    font-size: 1.25rem;
    line-height: 1;
    transition: transform 200ms ease;
  }

  &[aria-expanded='true'] .plus {
    transform: rotate(45deg);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

type ProjectAccordionProps = {
  /** 목록이 페이지 첫 화면에 올 때(/projects) 첫 프로젝트 이미지를 바로 불러옵니다. 홈에서는 화면 아래라 lazy 로 둡니다. */
  eagerFirstCover?: boolean;
  /** 처음에 보여 줄 프로젝트 수. 나머지는 더보기 버튼으로 펼칩니다. 없으면 전부 보여 줍니다. */
  initialCount?: number;
};

export function ProjectAccordion({ eagerFirstCover = false, initialCount }: ProjectAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const limit = initialCount ?? projects.length;
  const visible = expanded ? projects : projects.slice(0, limit);
  const hiddenCount = projects.length - limit;
  const listId = 'project-list';

  return (
    <>
      <Intro>주요 프로젝트부터 · 항목을 눌러 역할과 작업 내용을 확인하세요.</Intro>
      <List id={listId} aria-label="프로젝트 목록">
        {visible.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            defaultOpen={index === 0}
            eagerCover={eagerFirstCover && index === 0}
          />
        ))}
      </List>
      {hiddenCount > 0 && (
        <MoreButton
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? '접기' : `프로젝트 ${hiddenCount}개 더보기`}
          <span className="plus" aria-hidden="true">
            +
          </span>
        </MoreButton>
      )}
    </>
  );
}
