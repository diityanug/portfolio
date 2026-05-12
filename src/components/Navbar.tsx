import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education & Certifications', path: '/education' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex items-center w-full py-10 px-8 md:px-16 bg-white sticky top-0 z-50">
      <div className="flex-grow border-t border-black mr-12"></div>
      
      <div className="font-telegraf font-bold text-sm tracking-[0.3em] uppercase whitespace-nowrap">
        {isHome ? (
          <span>2025</span>
        ) : (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-40'
                } hover:opacity-100 transition-all duration-300 flex items-center`}
              >
                {link.name === 'Education & Certifications' ? (
                  <span className="flex flex-col leading-[1.1] text-center">
                    <span>Education &</span>
                    <span>Certifications</span>
                  </span>
                ) : (
                  link.name
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;