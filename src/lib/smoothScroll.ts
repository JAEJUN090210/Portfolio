import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

type ScrollTarget = number | HTMLElement;

/** Lenis가 활성화되어 있으면 Lenis로, 아니면 브라우저 기본 스크롤로 이동합니다. */
export const scrollToTarget = (target: ScrollTarget, options: { immediate?: boolean } = {}) => {
  if (instance) {
    // Lenis 1.3+는 섹션의 scroll-margin-top을 스스로 반영하므로 별도 offset을 주지 않습니다.
    instance.scrollTo(target, { immediate: options.immediate });
    return;
  }

  const behavior = options.immediate ? 'auto' : 'smooth';
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior });
  } else {
    target.scrollIntoView({ behavior });
  }
};
