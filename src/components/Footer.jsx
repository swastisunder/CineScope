import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-white mb-4">🎬 CineScope</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/movies" className="hover:text-white transition">
            Movies
          </Link>
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CineVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
