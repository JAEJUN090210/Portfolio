import type { ComponentProps, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToTarget } from '../../lib/smoothScroll';

type HashLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  /** `/#section` 형태의 해시 링크 */
  to: string;
};

/**
 * 섹션 해시 링크.
 * 일반 `<a href="/#id">`는 같은 페이지에서 브라우저가 먼저 즉시 점프해 버리므로,
 * Router 내비게이션으로 처리해 Lenis 부드러운 스크롤만 타도록 합니다.
 * 이미 같은 해시에 있을 때는 location이 바뀌지 않아 직접 스크롤합니다.
 */
export function HashLink({ to, onClick, ...rest }: HashLinkProps) {
  const location = useLocation();
  const hashIndex = to.indexOf('#');
  const targetPath = hashIndex >= 0 ? to.slice(0, hashIndex) || '/' : to;
  const targetHash = hashIndex >= 0 ? to.slice(hashIndex) : '';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !targetHash) {
      return;
    }

    const samePlace = location.pathname === targetPath && location.hash === targetHash;
    const target = document.getElementById(targetHash.slice(1));
    if (samePlace && target) {
      event.preventDefault();
      scrollToTarget(target);
    }
  };

  return <Link to={to} onClick={handleClick} {...rest} />;
}
