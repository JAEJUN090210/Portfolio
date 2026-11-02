/** 프로젝트 대표 이미지는 원본(2000px) 외에 이 너비들로 미리 변환해 둡니다. 예) entry-dsm-480.webp */
export const COVER_WIDTHS = [480, 960, 1440] as const;

export const coverVariant = (src: string, width: number) =>
  src.replace(/\.webp$/, `-${width}.webp`);

export const coverSrcSet = (src: string) =>
  COVER_WIDTHS.map((width) => `${coverVariant(src, width)} ${width}w`).join(', ');

/** 프로젝트 상세 페이지 갤러리: min(896px, 100% - 2rem) */
export const DETAIL_COVER_SIZES = '(min-width: 928px) 896px, calc(100vw - 2rem)';

/** 프로젝트 아코디언 패널: 1152px 컨테이너에서 왼쪽 제목 칸(11rem + 3rem 간격)을 뺀 폭 */
export const ACCORDION_COVER_SIZES =
  '(min-width: 1192px) 928px, (min-width: 768px) calc(100vw - 16.5rem), calc(100vw - 2.5rem)';
