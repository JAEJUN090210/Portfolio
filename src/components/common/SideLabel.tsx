import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../constants/site';

/** 홈에서 스크롤 위치에 따라 바뀌는 섹션 라벨. 순서가 곧 번호입니다. */
const HOME_SECTIONS = [
  { id: 'home', label: 'HERO' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
];

const DETAIL_LABEL = 'PROJECT DETAIL';
const TAGLINE = `${siteConfig.englishName} — ${siteConfig.role}`.toUpperCase();

const sectionLabel = (index: number) =>
  `${String(index).padStart(2, '0')} · ${HOME_SECTIONS[index].label}`;

/** 라벨 칸을 가장 긴 문구에 맞춰 고정해, 문구가 바뀌어도 나머지 글자가 밀리지 않게 합니다. */
const LABEL_CHARS = Math.max(
  ...HOME_SECTIONS.map((_, index) => sectionLabel(index).length),
  DETAIL_LABEL.length,
);

/** 섹션 판정 기준선: 뷰포트 높이의 이 비율 지점을 지나는 섹션을 현재 섹션으로 봅니다. */
const ANCHOR_RATIO = 0.45;

/** 섹션 요소가 하나라도 아직 없을 때(lazy 로딩 중) 다시 찾아보는 간격과 횟수 */
const RETRY_INTERVAL = 100;
const RETRY_LIMIT = 50;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Label = styled.div`
  position: fixed;
  top: 50%;
  left: 18px;
  z-index: 60;
  display: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.mono};
  font-size: 10px;
  letter-spacing: 0.24em;
  line-height: 1;
  white-space: nowrap;
  opacity: 0.7;
  pointer-events: none;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    display: block;
  }
`;

const Current = styled.span`
  display: inline-block;
  /* 글자 폭(1ch) + 자간(0.24em)을 글자 수만큼 확보합니다. */
  inline-size: calc(${LABEL_CHARS} * (1ch + 0.24em));
  text-align: end;
  animation: ${fadeIn} 320ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const pageLabel = (pathname: string) => {
  if (pathname.startsWith('/projects/')) {
    return DETAIL_LABEL;
  }
  const name = pathname.replace(/^\//, '').replace(/\/$/, '');
  return name ? name.toUpperCase() : HOME_SECTIONS[0].label;
};

/**
 * 뷰포트 기준선을 지나는 섹션의 인덱스를 돌려줍니다.
 * 아직 DOM에 없는 섹션이 있으면 `complete`가 false입니다.
 */
const resolveActiveIndex = () => {
  const elements = HOME_SECTIONS.map(({ id }) => document.getElementById(id));
  const complete = elements.every(Boolean);
  const anchor = window.innerHeight * ANCHOR_RATIO;

  // 페이지 끝까지 내려갔으면 마지막 섹션이 짧더라도 마지막으로 칩니다.
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (atBottom && complete) {
    return { index: HOME_SECTIONS.length - 1, complete };
  }

  let index = 0;
  elements.forEach((element, i) => {
    if (element && element.getBoundingClientRect().top <= anchor) {
      index = i;
    }
  });
  return { index, complete };
};

export function SideLabel() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    let retries = 0;
    let retryId = 0;

    // 스크롤 이벤트는 이미 프레임당 한 번만 오므로 별도 스로틀 없이 바로 계산합니다.
    const update = () => {
      const { index, complete } = resolveActiveIndex();
      setActiveIndex(index);
      return complete;
    };

    // 홈에 들어오면 이전 값을 들고 있지 않도록 즉시 다시 계산합니다.
    // 섹션이 lazy 로딩 중이면 모두 나타날 때까지 잠시 재시도합니다.
    const retry = () => {
      const complete = update();
      retries += 1;
      if (!complete && retries < RETRY_LIMIT) {
        retryId = window.setTimeout(retry, RETRY_INTERVAL);
      }
    };
    retry();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.clearTimeout(retryId);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome]);

  const current = isHome ? sectionLabel(activeIndex) : pageLabel(pathname);

  return (
    <Label className="no-print" aria-hidden="true">
      <Current key={current}>{current}</Current>
      {' — '}
      {TAGLINE}
    </Label>
  );
}
