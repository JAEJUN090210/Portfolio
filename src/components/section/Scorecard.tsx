import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';
import { useId, type CSSProperties } from 'react';
import { useReveal } from '../../hooks/useReveal';
import type { ProjectScoreItem, ProjectScorecard } from '../../types/portfolio';

/** Lighthouse 와 같은 구간: 0–49 미흡, 50–89 보통, 90–100 양호 */
type Tone = 'good' | 'average' | 'poor';

function toneOf(score: number): Tone {
  if (score >= 90) return 'good';
  if (score >= 50) return 'average';
  return 'poor';
}

const TONE_LABEL: Record<Tone, string> = {
  good: '양호',
  average: '보통',
  poor: '미흡',
};

const Wrap = styled.div`
  --score-good: ${({ theme }) => theme.colors.success};
  --score-average: ${({ theme }) => theme.colors.warm};
  --score-poor: ${({ theme }) => theme.colors.danger};
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  i {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: var(--tone);
  }
`;

/**
 * 줄당 카드 수를 1 → 2 → 3으로 늘립니다. 마지막 줄이 덜 찼을 때 가운데 정렬되도록
 * grid 대신 flex-wrap을 씁니다. 카드가 넓어야 링 두 개를 크게 넣을 수 있습니다.
 */
const Grid = styled.div`
  --cols: 1;
  --gap: ${({ theme }) => theme.spacing[3]};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--gap);

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    --cols: 2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    --cols: 3;
  }
`;

const Card = styled.figure`
  container-type: inline-size;
  display: grid;
  flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));
  justify-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[2]};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.panel} 60%, transparent);

  figcaption {
    display: grid;
    justify-items: center;
    gap: 0.25rem;
    text-align: center;
  }

  figcaption strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9375rem;
    font-weight: 600;
    word-break: keep-all;
  }
`;

const Pair = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  max-width: 100%;

  svg.arrow {
    flex: none;
    width: 0.875rem;
    height: 0.875rem;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

/**
 * 링 지름은 카드 폭(cqw) 기준으로 잡아, OS 배율·글꼴 크기가 커져도 두 링이 카드 밖으로
 * 넘치지 않게 합니다. 컨테이너 쿼리를 모르는 브라우저는 첫 번째 rem 값을 씁니다.
 */
const Ring = styled.div<{ size: 'sm' | 'lg' }>`
  --size: ${({ size }) => (size === 'lg' ? '6.25rem' : '3.75rem')};
  --size: ${({ size }) => (size === 'lg' ? 'clamp(3.5rem, 46cqw, 6.25rem)' : 'clamp(2rem, 26cqw, 3.75rem)')};
  position: relative;
  display: grid;
  width: var(--size);
  height: var(--size);
  place-items: center;
  flex: none;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: ${({ size }) => (size === 'lg' ? 7 : 6)};
  }

  circle.track {
    stroke: var(--tone);
    opacity: 0.18;
  }

  circle.value {
    stroke: var(--tone);
    stroke-linecap: round;
    transition: stroke-dashoffset 1100ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  output {
    position: relative;
    color: ${({ theme, size }) => (size === 'lg' ? theme.colors.text : theme.colors.textMuted)};
    font-family: ${({ theme }) => theme.typography.sans};
    font-size: calc(var(--size) * ${({ size }) => (size === 'lg' ? 0.32 : 0.28)});
    font-weight: ${({ size }) => (size === 'lg' ? 800 : 600)};
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
    line-height: 1;
  }
`;

const Delta = styled.span<{ tone: 'up' | 'flat' }>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.15rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, tone }) => (tone === 'up' ? theme.colors.success : theme.colors.textSubtle)};
  background: ${({ theme, tone }) =>
    tone === 'up'
      ? `color-mix(in srgb, ${theme.colors.success} 14%, transparent)`
      : `color-mix(in srgb, ${theme.colors.textSubtle} 14%, transparent)`};
`;

const Conditions = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem ${({ theme }) => theme.spacing[3]};
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  line-height: 1.6;

  dt {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
`;

const Notes = styled.ul`
  && {
    gap: 0.25rem;
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 0.8125rem;
    line-height: 1.7;
  }
`;

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Gauge({
  score,
  display,
  size,
  visible,
  label,
}: {
  score: number;
  display?: string;
  size: 'sm' | 'lg';
  visible: boolean;
  label: string;
}) {
  const tone = toneOf(score);
  const clamped = Math.max(0, Math.min(100, score));
  const offset = visible ? CIRCUMFERENCE * (1 - clamped / 100) : CIRCUMFERENCE;
  const toneColor = {
    good: 'var(--score-good)',
    average: 'var(--score-average)',
    poor: 'var(--score-poor)',
  }[tone];

  return (
    <Ring
      size={size}
      style={{ '--tone': toneColor } as CSSProperties}
      role="img"
      aria-label={`${label} ${display ?? `${score}점`} (${TONE_LABEL[tone]})`}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="track" cx="50" cy="50" r={RADIUS} />
        <circle
          className="value"
          cx="50"
          cy="50"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <output aria-hidden="true">{display ?? score}</output>
    </Ring>
  );
}

function ScoreCard({ item, visible }: { item: ProjectScoreItem; visible: boolean }) {
  const delta = item.after - item.before;
  const deltaText =
    item.display && item.display[0] === item.display[1]
      ? '변화 없음'
      : delta > 0
        ? `+${delta}`
        : delta === 0
          ? '변화 없음'
          : `${delta}`;

  return (
    <Card>
      <Pair>
        <Gauge
          score={item.before}
          display={item.display?.[0]}
          size="sm"
          visible={visible}
          label={`${item.label} 개선 전`}
        />
        <ArrowRight className="arrow" aria-hidden="true" />
        <Gauge
          score={item.after}
          display={item.display?.[1]}
          size="lg"
          visible={visible}
          label={`${item.label} 개선 후`}
        />
      </Pair>
      <figcaption>
        <strong>{item.label}</strong>
        <Delta tone={delta > 0 ? 'up' : 'flat'}>{deltaText}</Delta>
      </figcaption>
    </Card>
  );
}

/** 개선 전후 점수를 원형 게이지로 비교해 보여 줍니다. */
export function Scorecard({ data }: { data: ProjectScorecard }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const tableId = useId();

  return (
    <Wrap ref={ref}>
      <Conditions>
        <dt>개선 전</dt>
        <dd>{data.conditions[0]}</dd>
        <dt>개선 후</dt>
        <dd>{data.conditions[1]}</dd>
      </Conditions>

      <Grid aria-describedby={tableId}>
        {data.items.map((item) => (
          <ScoreCard key={item.label} item={item} visible={isVisible} />
        ))}
      </Grid>

      <Legend aria-hidden="true">
        <span style={{ '--tone': 'var(--score-good)' } as CSSProperties}>
          <i />
          90–100 양호
        </span>
        <span style={{ '--tone': 'var(--score-average)' } as CSSProperties}>
          <i />
          50–89 보통
        </span>
        <span style={{ '--tone': 'var(--score-poor)' } as CSSProperties}>
          <i />
          0–49 미흡
        </span>
      </Legend>

      <table id={tableId} className="sr-only">
        <caption>{data.title} 점수표</caption>
        <thead>
          <tr>
            <th scope="col">항목</th>
            <th scope="col">개선 전</th>
            <th scope="col">개선 후</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>{item.display?.[0] ?? item.before}</td>
              <td>{item.display?.[1] ?? item.after}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.notes && data.notes.length > 0 && (
        <Notes>
          {data.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </Notes>
      )}
    </Wrap>
  );
}
