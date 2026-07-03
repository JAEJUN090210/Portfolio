import styled from '@emotion/styled';

export const Tag = styled.span`
  display: inline-flex;
  min-height: 1.75rem;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.045);
  font-size: 0.78rem;
  font-weight: 700;
`;
