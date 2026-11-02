import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { coverSrcSet, DETAIL_COVER_SIZES } from '../../utils/image';

type ProjectCoverProps = {
  src: string;
  alt: string;
  /** 검은 레이어의 불투명도 (0–1) */
  dim?: number;
  /** 첫 화면에 보이는 이미지는 eager 로 바로, 높은 우선순위로 불러옵니다. */
  eager?: boolean;
  /** 이미지가 실제로 차지하는 폭. srcset 에서 알맞은 크기를 고르는 데 씁니다. */
  sizes?: string;
  children?: ReactNode;
};

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0a0a0a;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
`;

const Shade = styled.div<{ $dim: number }>`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 100%),
    rgba(0, 0, 0, ${({ $dim }) => $dim});
  transition: background 240ms ease;
`;

const Content = styled.div`
  position: absolute;
  inset: 0;
`;

/** 서비스 대표 이미지에 검은 레이어를 씌워 포트폴리오 톤에 맞춥니다. */
export function ProjectCover({
  src,
  alt,
  dim = 0.45,
  eager = false,
  sizes = DETAIL_COVER_SIZES,
  children,
}: ProjectCoverProps) {
  // React 18 은 fetchpriority 를 아직 모르는 속성이라 소문자 그대로 넘깁니다.
  const priority = eager ? { fetchpriority: 'high' } : {};

  return (
    <Frame>
      <img
        src={src}
        srcSet={coverSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...priority}
      />
      <Shade $dim={dim} aria-hidden="true" />
      {children && <Content>{children}</Content>}
    </Frame>
  );
}
