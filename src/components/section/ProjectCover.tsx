import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type ProjectCoverProps = {
  src: string;
  alt: string;
  /** 검은 레이어의 불투명도 (0–1) */
  dim?: number;
  /** 첫 화면에 보이는 이미지는 eager 로 바로 불러옵니다. */
  eager?: boolean;
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
export function ProjectCover({ src, alt, dim = 0.45, eager = false, children }: ProjectCoverProps) {
  return (
    <Frame>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <Shade $dim={dim} aria-hidden="true" />
      {children && <Content>{children}</Content>}
    </Frame>
  );
}
