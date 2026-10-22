import styled from '@emotion/styled';
import type { CSSProperties } from 'react';
import { useReveal } from '../../hooks/useReveal';

type SplitTitleProps = {
  text: string;
  className?: string;
};

const Wrapper = styled.span`
  display: inline-block;

  .tchar {
    display: inline-block;
    white-space: pre;
    opacity: 0;
    transform: translateY(0.6em) skewY(6deg);
    will-change: transform, opacity, filter;
  }

  &.is-inview .tchar {
    animation: titleCharIn 700ms cubic-bezier(0.2, 0.65, 0.2, 1) forwards;
    animation-delay: calc(var(--i, 0) * 50ms);
  }

  @media (prefers-reduced-motion: reduce) {
    .tchar {
      opacity: 1;
      transform: none;
      animation: none !important;
    }
  }
`;

/**
 * 제목을 글자 단위로 나눠, 화면에 들어올 때 글자가 아래에서 차례로 솟아오르듯 나타납니다.
 * 스크린리더에는 원래 문자열 하나로 읽힙니다.
 */
export function SplitTitle({ text, className }: SplitTitleProps) {
  const { ref, isVisible } = useReveal<HTMLSpanElement>();
  const chars = Array.from(text);

  return (
    <Wrapper
      ref={ref}
      className={[className, isVisible ? 'is-inview' : ''].filter(Boolean).join(' ')}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="tchar"
          aria-hidden="true"
          style={{ '--i': index } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </Wrapper>
  );
}
