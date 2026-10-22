import styled from '@emotion/styled';

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.25rem 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  transition: border-color 300ms ease;

  &:hover {
    border-color: color-mix(in srgb, ${({ theme }) => theme.colors.textMuted} 50%, transparent);
  }
`;

export const Badge = styled.span<{ tone?: 'green' | 'blue' | 'violet' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  color: ${({ tone = 'green' }) =>
    ({
      green: '#86efac',
      blue: '#93c5fd',
      violet: '#c4b5fd',
      neutral: 'inherit',
    })[tone]};
  background: ${({ tone = 'green' }) =>
    ({
      green: 'rgba(34, 197, 94, 0.2)',
      blue: 'rgba(59, 130, 246, 0.2)',
      violet: 'rgba(139, 92, 246, 0.2)',
      neutral: 'rgba(128, 128, 128, 0.2)',
    })[tone]};

  body.light & {
    color: ${({ tone = 'green' }) =>
      ({
        green: '#15803d',
        blue: '#1d4ed8',
        violet: '#6d28d9',
        neutral: 'inherit',
      })[tone]};
  }
`;
