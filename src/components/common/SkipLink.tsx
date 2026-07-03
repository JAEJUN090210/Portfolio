import styled from '@emotion/styled';

const Link = styled.a`
  position: fixed;
  top: ${({ theme }) => theme.spacing[3]};
  left: ${({ theme }) => theme.spacing[3]};
  z-index: 100;
  transform: translateY(-150%);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};
  font-weight: 800;
  transition: transform 160ms ease;

  &:focus {
    transform: translateY(0);
  }
`;

export function SkipLink() {
  return <Link href="#main-content">Skip to content</Link>;
}
