import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

/**
 * Main Nav Component
 * Decoupled into DesktopNav and MobileNav for modular management.
 */
const Nav = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

export default Nav;
export { DesktopNav, MobileNav };
