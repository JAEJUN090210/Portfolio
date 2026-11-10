import styled from '@emotion/styled';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Fragment, type CSSProperties } from 'react';
import type {
  DiagramBlock,
  DiagramNode,
  ProjectDiagram as DiagramData,
} from '../../types/portfolio';

type Owner = NonNullable<DiagramNode['owner']> | 'external';

const OWNER_LABEL: Record<Owner, string> = {
  own: '직접 맡음',
  shared: '함께 개발',
  external: '팀원·외부 서비스',
};

const ownerOf = (node: DiagramNode): Owner => node.owner ?? 'external';

const Figure = styled.figure`
  --diagram-accent: ${({ theme }) => theme.colors.accent};
  --diagram-panel: color-mix(in srgb, ${({ theme }) => theme.colors.panel} 60%, transparent);
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  min-width: 0;
  margin: 0;

  figcaption {
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 0.8125rem;
    line-height: 1.7;
    word-break: keep-all;
  }
`;

/* 범례: 칸과 같은 테두리·채움을 작은 네모로 보여 줍니다. 상세 페이지의 ul 스타일보다 우선하도록 && 를 씁니다. */
const Legend = styled.ul`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.4;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  i {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border: 1px solid var(--swatch-border, ${({ theme }) => theme.colors.borderStrong});
    border-style: var(--swatch-style, solid);
    border-radius: 3px;
    background: var(--swatch-bg, transparent);
  }
`;

const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  min-width: 0;
`;

const Label = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

/**
 * 칸 하나. 직접 맡은 칸은 강조색으로 채우고, 함께 개발한 칸은 강조색 점선, 나머지는 패널 색입니다.
 * 트러블슈팅 카드와 같은 테두리·모서리·배경을 씁니다.
 */
const Node = styled.div<{ $owner: Owner }>`
  display: grid;
  align-content: center;
  gap: 0.3rem;
  min-width: 0;
  border: 1px ${({ $owner }) => ($owner === 'shared' ? 'dashed' : 'solid')}
    ${({ theme, $owner }) =>
      $owner === 'own'
        ? theme.colors.accent
        : $owner === 'shared'
          ? `color-mix(in srgb, ${theme.colors.accent} 70%, transparent)`
          : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme, $owner }) =>
    $owner === 'own'
      ? `color-mix(in srgb, ${theme.colors.accent} 12%, transparent)`
      : $owner === 'shared'
        ? 'transparent'
        : `color-mix(in srgb, ${theme.colors.panel} 60%, transparent)`};
  text-align: center;

  strong {
    color: ${({ theme, $owner }) => ($owner === 'own' ? theme.colors.accent : theme.colors.text)};
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.4;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.8125rem;
    line-height: 1.5;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
`;

const Arrow = styled.span`
  display: inline-grid;
  flex: none;
  place-items: center;
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.colors.textSubtle};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

/**
 * 가로 흐름. 좁은 화면에서는 세로로 쌓고 화살표를 아래로 돌립니다.
 * 칸이 다섯 개 이상이면 노트북 폭 아래에서부터 세로로 바꿉니다.
 */
const FlowRow = styled.div<{ $dense: boolean; $arrows: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $arrows }) => ($arrows ? theme.spacing[2] : theme.spacing[3])};
  min-width: 0;

  > .diagram-node {
    flex: 1 1 0;
  }

  > .diagram-arrow svg {
    transform: rotate(90deg);
  }

  @media (min-width: ${({ theme, $dense }) =>
    $dense ? theme.breakpoints.laptop : theme.breakpoints.tablet}px) {
    flex-direction: row;
    align-items: stretch;

    > .diagram-arrow svg {
      transform: none;
    }
  }
`;

const Connector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  line-height: 1.5;
  text-align: center;
  word-break: keep-all;
`;

const Group = styled.div<{ $owner: Owner }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
  border: 1px ${({ $owner }) => ($owner === 'shared' ? 'dashed' : 'solid')}
    ${({ theme, $owner }) =>
      $owner === 'external'
        ? theme.colors.border
        : `color-mix(in srgb, ${theme.colors.accent} 70%, transparent)`};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[4]};

  > strong {
    color: ${({ theme, $owner }) =>
      $owner === 'external' ? theme.colors.text : theme.colors.accent};
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
`;

/* 묶음 안의 한 줄. 좁아지면 칸이 다음 줄로 내려갑니다. */
const GroupRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};

  > .diagram-node {
    flex: 1 1 8.5rem;
  }
`;

/**
 * 왼쪽 주체 → 오른쪽 앱 줄들과, 줄 전체가 향하는 옆 칸.
 * 태블릿 폭부터는 5열 격자(주체 · 화살표 · 앱 · 화살표 · 옆 칸)로 두고, 그 아래에서는 한 열로 쌓습니다.
 */
const Lanes = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[2]};
  min-width: 0;

  > .diagram-arrow svg {
    transform: rotate(90deg);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: minmax(7rem, auto) auto minmax(0, 1fr) auto minmax(9rem, 11rem);
    gap: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};

    > * {
      grid-row: var(--row);
      grid-column: var(--col);
    }

    > .diagram-arrow svg {
      transform: none;
    }
  }
`;

/* 옆 칸 묶음. 줄 전체 높이를 칸들이 나눠 가집니다. */
const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};

  > .diagram-node {
    flex: 1;
  }

  > .diagram-arrow svg {
    transform: none;
  }
`;

/* 화살표. 부모가 .diagram-arrow 로 방향을 돌릴 수 있게 클래스 이름을 둡니다. */
function ArrowMark({ direction, style }: { direction: 'right' | 'down'; style?: CSSProperties }) {
  return (
    <Arrow aria-hidden="true" className="diagram-arrow" style={style}>
      {direction === 'down' ? <ArrowDown /> : <ArrowRight />}
    </Arrow>
  );
}

function DiagramNodeView({ node, style }: { node: DiagramNode; style?: CSSProperties }) {
  return (
    <Node $owner={ownerOf(node)} className="diagram-node" style={style}>
      <strong>{node.title}</strong>
      {node.description && <span>{node.description}</span>}
    </Node>
  );
}

function FlowBlock({ block }: { block: Extract<DiagramBlock, { type: 'flow' }> }) {
  const arrows = block.arrows ?? true;
  return (
    <div>
      {block.label && <Label>{block.label}</Label>}
      <FlowRow $dense={block.nodes.length >= 5} $arrows={arrows}>
        {block.nodes.map((node, index) => (
          <Fragment key={node.title}>
            {index > 0 && arrows && <ArrowMark direction="right" />}
            <DiagramNodeView node={node} />
          </Fragment>
        ))}
      </FlowRow>
    </div>
  );
}

function GroupBlock({ block }: { block: Extract<DiagramBlock, { type: 'group' }> }) {
  return (
    <Group $owner={block.owner ?? 'external'}>
      <strong>{block.title}</strong>
      {block.rows.map((row) => (
        <GroupRow key={row.map((node) => node.title).join('|')}>
          {row.map((node) => (
            <DiagramNodeView key={node.title} node={node} />
          ))}
        </GroupRow>
      ))}
    </Group>
  );
}

/* 격자 위치를 CSS 변수로 넘겨, 좁은 화면에서는 미디어 쿼리가 무시하게 합니다. */
const place = (row: number | string, col: number) =>
  ({ '--row': row, '--col': col }) as CSSProperties;

function LanesBlock({ block }: { block: Extract<DiagramBlock, { type: 'lanes' }> }) {
  const span = `1 / ${block.lanes.length + 1}`;

  return (
    <Lanes>
      {block.lanes.map((lane, index) => (
        <Fragment key={lane.to.title}>
          <DiagramNodeView node={lane.from} style={place(index + 1, 1)} />
          <ArrowMark direction="right" style={place(index + 1, 2)} />
          <DiagramNodeView node={lane.to} style={place(index + 1, 3)} />
        </Fragment>
      ))}
      <ArrowMark direction="right" style={place(span, 4)} />
      <Side style={place(span, 5)}>
        {block.side.map((node, index) => (
          <Fragment key={node.title}>
            {index > 0 && <ArrowMark direction="down" />}
            <DiagramNodeView node={node} />
          </Fragment>
        ))}
      </Side>
    </Lanes>
  );
}

function BlockView({ block }: { block: DiagramBlock }) {
  switch (block.type) {
    case 'flow':
      return <FlowBlock block={block} />;
    case 'group':
      return <GroupBlock block={block} />;
    case 'connector':
      return (
        <Connector>
          <ArrowMark direction="down" />
          {block.label}
        </Connector>
      );
    case 'lanes':
      return <LanesBlock block={block} />;
  }
}

/** 구성도에 실제로 쓰인 구분만 범례에 보여 줍니다. */
function ownersIn(blocks: DiagramBlock[]): Owner[] {
  const found = new Set<Owner>();
  const visit = (node: DiagramNode) => found.add(ownerOf(node));
  for (const block of blocks) {
    if (block.type === 'flow') block.nodes.forEach(visit);
    else if (block.type === 'group') block.rows.flat().forEach(visit);
    else if (block.type === 'lanes') {
      block.lanes.forEach((lane) => {
        visit(lane.from);
        visit(lane.to);
      });
      block.side.forEach(visit);
    }
  }
  return (['own', 'shared', 'external'] as const).filter((owner) => found.has(owner));
}

const SWATCH: Record<Owner, CSSProperties> = {
  own: {
    '--swatch-border': 'var(--diagram-accent)',
    '--swatch-bg': 'color-mix(in srgb, var(--diagram-accent) 18%, transparent)',
  } as CSSProperties,
  shared: {
    '--swatch-border': 'color-mix(in srgb, var(--diagram-accent) 70%, transparent)',
    '--swatch-style': 'dashed',
  } as CSSProperties,
  external: {
    '--swatch-bg': 'var(--diagram-panel)',
  } as CSSProperties,
};

/** 서비스 구성도. 칸 색으로 직접 맡은 부분과 함께 개발한 부분을 구분해 보여 줍니다. */
export function ProjectDiagram({ data }: { data: DiagramData }) {
  const owners = ownersIn(data.blocks);

  return (
    <Figure>
      <Legend aria-label="구성도 범례">
        {owners.map((owner) => (
          <li key={owner} style={SWATCH[owner]}>
            <i aria-hidden="true" />
            {OWNER_LABEL[owner]}
          </li>
        ))}
      </Legend>
      <Stack>
        {data.blocks.map((block, index) => (
          <BlockView key={`${block.type}-${index}`} block={block} />
        ))}
      </Stack>
      {data.caption && <figcaption>{data.caption}</figcaption>}
    </Figure>
  );
}
