import { NavLink, Link } from "react-router-dom";
import { useCallback, useState } from "react";
import logo from "../../public/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkStyles = useCallback(
    ({ isActive }) =>
      `relative px-3 py-2 text-sm md:text-base transition-all duration-300 rounded-xl
     ${
       isActive
         ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
         : "text-white/90 hover:text-cyan-200 hover:bg-white/5 border border-transparent"
     }`,
    []
  );

  const mobileNavLinkStyles = useCallback(
    ({ isActive }) =>
      `block px-4 py-3 text-base transition-all duration-300 rounded-xl
     ${
       isActive
         ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/30"
         : "text-white/90 hover:text-cyan-200 hover:bg-white/5"
     }`,
    []
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60">
      <nav className="w-[95%] sm:w-[90%] mx-auto my-2 sm:my-3 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex justify-between items-center px-3 sm:px-5 py-3">
          {/* Logo */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
            <Link to={"/"} className="flex items-center gap-2 justify-center">
              <img src={logo} alt="CineScope Logo" className="w-10 sm:w-12 md:w-14" />
              <span className="text-white">CineScope</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden sm:flex items-center gap-2 md:gap-3 font-medium">
            <li>
              <NavLink to="/" className={navLinkStyles} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={navLinkStyles}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/genres" className={navLinkStyles}>
                Genres
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" className={navLinkStyles}>
                About
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-lg text-white/90 hover:text-cyan-200 hover:bg-white/5 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 px-3 py-4 bg-black/20 rounded-b-2xl">
            <ul className="space-y-2 font-medium">
              <li>
                <NavLink to="/" className={mobileNavLinkStyles} end onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={mobileNavLinkStyles} onClick={closeMobileMenu}>
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink to="/genres" className={mobileNavLinkStyles} onClick={closeMobileMenu}>
                  Genres
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" className={mobileNavLinkStyles} onClick={closeMobileMenu}>
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
