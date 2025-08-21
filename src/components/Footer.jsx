import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 sm:mt-10 border-t border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="w-[95%] sm:w-[90%] mx-auto py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold">
            <Link to={"/"} className="flex items-center gap-2">
              <img src={logo} alt="CineScope Logo" className="w-8 sm:w-10" />
              <span className="text-white">CineScope</span>
            </Link>
          </div>
          <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Discover movies, explore genres, and dive deep into cast & crew.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-white/90 font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-white/70 hover:text-cyan-300 transition"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white/70 hover:text-cyan-300 transition"
                to="/movies"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                className="text-white/70 hover:text-cyan-300 transition"
                to="/genres"
              >
                Genres
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-white/90 font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-white/70 hover:text-cyan-300 transition"
                to="/aboutus"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-white/90 font-semibold mb-3">Stay in the loop</h4>
          <p className="text-white/70 text-sm mb-4">
            Follow me on social media...
          </p>
          <div className="flex gap-2 sm:gap-3 text-base sm:text-lg justify-center sm:justify-start flex-wrap">
            <a
              href="https://www.instagram.com/swasti.305/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="px-2 sm:px-3 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://x.com/swastisundr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="px-2 sm:px-3 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://letterboxd.com/swastisunder/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Letterboxd"
              className="px-2 sm:px-3 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              <i className="fa-brands fa-letterboxd"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/swastisunder/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="px-2 sm:px-3 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/swastisunder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="px-2 sm:px-3 py-2 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="w-[95%] sm:w-[90%] mx-auto border-t border-white/10 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/60">
        <p>© {currentYear} CineScope. All rights reserved.</p>
      </div>
    </footer>
  );
}
