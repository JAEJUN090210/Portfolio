import { useEffect, useState } from 'react';

/** 스크롤 진행도가 threshold(0~1)를 넘었는지만 알려줍니다. 경계를 넘을 때만 리렌더됩니다. */
export function useScrollPast(threshold: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const check = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      setPast(progress > threshold);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [threshold]);

  return past;
}
