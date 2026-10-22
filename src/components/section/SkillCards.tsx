import styled from '@emotion/styled';
import { useMemo } from 'react';
import { skillGroups, skills } from '../../constants/portfolio';
import { skillIcons, skillMonogramColors } from '../../constants/skillIcons';

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition:
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    border-color: color-mix(in srgb, ${({ theme }) => theme.colors.text} 50%, transparent);
    box-shadow: ${({ theme }) => theme.shadows.lift};
  }
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.xl} ${({ theme }) => theme.radii.xl} 0 0;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.panelSoft} 60%, transparent);

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.875rem;
    line-height: 1.6;
    text-wrap: balance;
  }
`;

const CardContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: 0 0 ${({ theme }) => theme.radii.xl} ${({ theme }) => theme.radii.xl};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 50%, transparent);
`;

const IconRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const IconTile = styled.li<{ accent?: string }>`
  position: relative;
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.textMuted} 25%, transparent);
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ accent, theme }) => accent ?? theme.colors.text};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.panelSoft} 50%, transparent);
  outline: none;
  cursor: default;
  transition:
    border-color 200ms ease,
    background 200ms ease,
    transform 200ms ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover,
  &:focus-visible {
    border-color: color-mix(in srgb, currentColor 60%, transparent);
    background: ${({ theme }) => theme.colors.panelSoft};
    transform: translateY(-2px);
  }

  /* 호버/포커스 시 위로 떠오르는 툴팁 */
  &::after {
    content: attr(data-label);
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 50%;
    z-index: 2;
    padding: 0.3rem 0.6rem;
    border-radius: ${({ theme }) => theme.radii.md};
    color: ${({ theme }) => theme.colors.bg};
    background: ${({ theme }) => theme.colors.text};
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.01em;
    white-space: nowrap;
    opacity: 0;
    transform: translate(-50%, 4px);
    transition:
      opacity 160ms ease,
      transform 160ms ease;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 0.5rem - 4px);
    left: 50%;
    z-index: 2;
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.text};
    opacity: 0;
    transform: translate(-50%, 4px);
    transition:
      opacity 160ms ease,
      transform 160ms ease;
    pointer-events: none;
  }

  &:hover::after,
  &:hover::before,
  &:focus-visible::after,
  &:focus-visible::before {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const Monogram = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

function SkillIcon({ name }: { name: string }) {
  const entry = skillIcons[name];
  if (entry) {
    return <entry.Icon aria-hidden="true" />;
  }
  return <Monogram aria-hidden="true">{name.slice(0, 2)}</Monogram>;
}

export function SkillCards() {
  const groups = useMemo(
    () =>
      skillGroups.map((group) => ({
        ...group,
        items: skills.filter((skill) => group.categories.includes(skill.category)),
      })),
    [],
  );

  return (
    <Grid>
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
          </CardHeader>
          <CardContent>
            <IconRow aria-label={`${group.title} 기술 스택`}>
              {group.items.map((skill) => (
                <IconTile
                  key={skill.name}
                  data-label={skill.name}
                  aria-label={skill.name}
                  accent={skillIcons[skill.name]?.color ?? skillMonogramColors[skill.name]}
                  tabIndex={0}
                >
                  <SkillIcon name={skill.name} />
                </IconTile>
              ))}
            </IconRow>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
