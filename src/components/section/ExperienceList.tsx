import styled from '@emotion/styled';
import { awards, education, experiences } from '../../constants/portfolio';
import { useReveal } from '../../hooks/useReveal';
import type { ExperienceItem } from '../../types/portfolio';
import { SplitTitle } from '../common/SplitTitle';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.text};

  &:first-of-type {
    border-top: 0;
  }
`;

const Row = styled.div<{ visible: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[10]} 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '16px')});
  transition:
    opacity 600ms ease,
    transform 600ms ease;

  li:first-of-type > & {
    padding-top: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr 1.5fr;
    gap: ${({ theme }) => theme.spacing[10]};
  }
`;

const Organization = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const Role = styled.p`
  margin: ${({ theme }) => theme.spacing[3]} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Period = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.sans};
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

const Highlights = styled.ul`
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  list-style: none;
  line-height: 1.6;

  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.625rem;
  }
`;

const Stack = styled.p`
  margin: ${({ theme }) => theme.spacing[4]} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;

const SubBlock = styled.div`
  margin-top: ${({ theme }) => theme.spacing[16]};
  border-top: 2px solid ${({ theme }) => theme.colors.text};
  padding-top: ${({ theme }) => theme.spacing[8]};
`;

const SubHeading = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.mono};
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Rows = styled.ul`
  margin: ${({ theme }) => theme.spacing[3]} 0 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[4]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing[3]} 0;
    color: ${({ theme }) => theme.colors.text};
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }

  time {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
  }
`;

function ExperienceRow({ item }: { item: ExperienceItem }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <Item>
      <Row ref={ref} visible={isVisible}>
        <div>
          <Organization>{item.organization}</Organization>
          <Role>{item.title}</Role>
          <Period>{item.period}</Period>
        </div>
        <div>
          <Highlights>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </Highlights>
          {item.stack.length > 0 && <Stack>{item.stack.join(' · ')}</Stack>}
        </div>
      </Row>
    </Item>
  );
}

export function EducationRows() {
  return (
    <SubBlock>
      <SubHeading id="education">
        <SplitTitle text="EDUCATION" />
      </SubHeading>
      <Rows>
        {education.map((item) => (
          <li key={item.id}>
            <span>
              {item.organization} · {item.title} <small>({item.badge})</small>
            </span>
            <time>{item.period}</time>
          </li>
        ))}
      </Rows>
    </SubBlock>
  );
}

export function AwardRows({ standalone = false }: { standalone?: boolean }) {
  const rows = (
    <Rows>
      {awards.map((award) => (
        <li key={award.title}>
          <span>
            {award.title} <small>· {award.issuer}</small>
          </span>
          <time>{award.year}</time>
        </li>
      ))}
    </Rows>
  );

  if (standalone) {
    return rows;
  }

  return (
    <SubBlock>
      <SubHeading id="awards">
        <SplitTitle text="AWARDS" />
      </SubHeading>
      {rows}
    </SubBlock>
  );
}

export function ExperienceList() {
  return (
    <>
      <List>
        {experiences.map((item) => (
          <ExperienceRow key={item.id} item={item} />
        ))}
      </List>
      <EducationRows />
      <AwardRows />
    </>
  );
}
