import styled from '@emotion/styled';

export const Skeleton = styled.div<{ height?: string; width?: string }>`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '1rem' }) => height};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.06)
  );
  background-size: 200% 100%;
  animation: shimmer 1.3s ease-in-out infinite;

  @keyframes shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }
`;
