import styled from '@emotion/styled';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { headerNav, siteConfig } from '../../constants/site';
import { HashLink } from '../common/HashLink';
import { useIsDarkMode, useToggleThemeMode } from '../../stores/themeStore';

const Shell = styled.header`
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    width: min(1280px, calc(100% - 4rem));
  }
`;

const Nav = styled.nav`
  display: flex;
  height: 3.75rem;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const ThemeToggle = styled.button`
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  transition: background 160ms ease;

  &:hover {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent);
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  a {
    display: inline-block;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    line-height: 3.75rem;
    opacity: 0.85;
    transition: opacity 160ms ease;
  }

  a:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    a {
      padding: 0 ${({ theme }) => theme.spacing[2]};
      font-size: 0.9rem;
    }
  }
`;

export function Header() {
  const isDark = useIsDarkMode();
  const toggleTheme = useToggleThemeMode();

  return (
    <Shell className="no-print">
      <Nav aria-label="주요 내비게이션">
        <Logo>
          <Brand to="/" title={`${siteConfig.name} (홈)`}>
            {siteConfig.name}
          </Brand>
          <ThemeToggle
            type="button"
            aria-label="라이트/다크 테마 전환"
            title="라이트/다크 테마 전환"
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </ThemeToggle>
        </Logo>
        <Menu>
          {headerNav.map((item) => (
            <li key={item.href}>
              <HashLink to={item.href} title={item.label}>
                {item.label}
              </HashLink>
            </li>
          ))}
        </Menu>
      </Nav>
    </Shell>
  );
}
