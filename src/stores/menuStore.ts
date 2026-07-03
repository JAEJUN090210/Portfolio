import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type MenuState = {
  isMobileMenuOpen: boolean;
  activeSection: string;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  setActiveSection: (sectionId: string) => void;
};

const useMenuStore = create<MenuState>((set) => ({
  isMobileMenuOpen: false,
  activeSection: 'home',
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
}));

export const useMobileMenuOpen = () => useMenuStore((state) => state.isMobileMenuOpen);
export const useActiveSection = () => useMenuStore((state) => state.activeSection);
export const useCloseMobileMenu = () => useMenuStore((state) => state.closeMobileMenu);
export const useToggleMobileMenu = () => useMenuStore((state) => state.toggleMobileMenu);
export const useSetActiveSection = () => useMenuStore((state) => state.setActiveSection);

export const useMenu = () =>
  useMenuStore(
    useShallow((state) => ({
      isMobileMenuOpen: state.isMobileMenuOpen,
      activeSection: state.activeSection,
    })),
  );
