import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../constants/portfolio';
import type { Project } from '../../types/portfolio';
import { RichText } from '../common/RichText';

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

function ProjectRow({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `panel-${project.id}`;
  const contributions = project.detail.highlights;

  return (
    <Item>
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
      <Panel id={panelId} open={open} aria-hidden={!open}>
        <div>
          <PanelBody>
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

export function ProjectAccordion() {
  return (
    <>
      <Intro>최신순 · 항목을 눌러 역할과 작업 내용을 확인하세요.</Intro>
      <List>
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} defaultOpen={index === 0} />
        ))}
      </List>
    </>
  );
}
