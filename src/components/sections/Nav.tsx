import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Nav = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <DesktopNav /> : <MobileNav />;
};

export default Nav;
export { DesktopNav, MobileNav };