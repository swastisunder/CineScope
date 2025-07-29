import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md w-full">
      <nav className="container mx-auto flex items-center py-6 px-6">
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-yellow-400 transition-colors"
          >
            CineScope
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="flex space-x-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition-colors ${
                    isActive ? "text-yellow-400 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition-colors ${
                    isActive ? "text-yellow-400 font-semibold" : ""
                  }`
                }
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition-colors ${
                    isActive ? "text-yellow-400 font-semibold" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-yellow-400 transition-colors ${
                    isActive ? "text-yellow-400 font-semibold" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1"></div>
      </nav>
    </header>
  );
}
