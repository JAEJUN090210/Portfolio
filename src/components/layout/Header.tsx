import styled from '@emotion/styled';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../constants/site';
import { useCloseMobileMenu, useMobileMenuOpen, useToggleMobileMenu } from '../../stores/menuStore';
import { useIsDarkMode, useToggleThemeMode } from '../../stores/themeStore';

const Shell = styled.header`
  position: sticky;
  top: 0;
  z-index: 70;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 82%, transparent);
  backdrop-filter: blur(18px);
`;

const Inner = styled.div`
  display: flex;
  width: min(880px, calc(100% - 2rem));
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Nav = styled.nav<{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};

  a {
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.88rem;
    font-weight: 700;
  }

  a.active,
  a:hover {
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    position: fixed;
    top: 4.5rem;
    right: 1rem;
    left: 1rem;
    display: ${({ open }) => (open ? 'grid' : 'none')};
    align-items: stretch;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => theme.spacing[2]};
    background: ${({ theme }) => theme.colors.panel};
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const IconButton = styled.button`
  display: inline-grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.04);

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}px) {
    display: inline-grid;
  }
`;

export function Header() {
  const isDark = useIsDarkMode();
  const toggleTheme = useToggleThemeMode();
  const isMobileOpen = useMobileMenuOpen();
  const toggleMobileMenu = useToggleMobileMenu();
  const closeMobileMenu = useCloseMobileMenu();

  return (
    <Shell className="no-print">
      <Inner>
        <Nav open={isMobileOpen} aria-label="주요 내비게이션">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={closeMobileMenu}>
              {item.label}
            </NavLink>
          ))}
        </Nav>
        <Actions>
          <IconButton type="button" aria-label="테마 변경" onClick={toggleTheme}>
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </IconButton>
          <MenuButton type="button" aria-label="내비게이션 메뉴 열기" onClick={toggleMobileMenu}>
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </MenuButton>
        </Actions>
      </Inner>
    </Shell>
  );
}
