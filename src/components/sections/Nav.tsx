import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLogoAnimation } from '../../hooks/useLogoAnimation';

const Nav = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { logoSrc } = useLogoAnimation();

  return isDesktop ? <DesktopNav logoSrc={logoSrc} /> : <MobileNav logoSrc={logoSrc} />;
};

export default Nav;
