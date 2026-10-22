import { useEffect, useState } from 'react';

const SYMBOLS = '{}[]<>/#*>|=+-_$%&';

type ScrambleTextProps = {
  text: string;
  /** 글자 하나가 고정되기까지의 간격(ms). 왼쪽부터 순서대로 고정됩니다. */
  stagger?: number;
  /** 첫 글자가 고정되기 전 기호만 돌아가는 시간(ms). */
  delay?: number;
  className?: string;
};

const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

/** 모션 축소 설정이 켜져 있으면 재생하지 않습니다. */
const shouldPlay = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 글자가 기호로 무작위로 바뀌다가 왼쪽부터 차례로 원래 글자로 고정되는 효과입니다.
 * 컴포넌트가 마운트될 때마다(새로고침, 페이지 재진입 포함) 재생됩니다.
 */
export function ScrambleText({ text, stagger = 80, delay = 300, className }: ScrambleTextProps) {
  const [playing] = useState(shouldPlay);
  const [display, setDisplay] = useState(() => (playing ? '' : text));

  useEffect(() => {
    if (!playing) {
      return undefined;
    }

    const chars = Array.from(text);
    const start = performance.now();

    // 기호는 40ms마다 교체해 너무 어지럽지 않게 하고, 고정 시점은 경과 시간으로 계산합니다.
    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const output = chars.map((char, index) => {
        if (char === ' ' || char === '\n') {
          return char;
        }
        return elapsed >= delay + index * stagger ? char : randomSymbol();
      });
      setDisplay(output.join(''));

      if (elapsed >= delay + (chars.length - 1) * stagger) {
        window.clearInterval(intervalId);
        setDisplay(text);
      }
    }, 40);

    return () => window.clearInterval(intervalId);
  }, [delay, playing, stagger, text]);

  return (
    <span className={className} aria-label={text}>
      {display || '\u00a0'}
    </span>
  );
}
