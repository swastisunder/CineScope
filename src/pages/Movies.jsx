import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moviesData from "../assets/movies.json";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const moviesPerPage = 15; // Number of movies per page

  // Reset scroll when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // When search changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Remove duplicates from movie list (based on ID)
  const uniqueMovies = Array.from(
    new Map(moviesData.map((movie) => [movie.id, movie])).values()
  );

  // Filter movies by search term
  const filteredMovies = uniqueMovies.filter((movie) => {
    const query = searchTerm.toLowerCase().trim();
    if (query === "") return true; // Show all if search is empty

    // Check if search term exists in any field
    const text = `
      ${movie.title}
      ${movie.director}
      ${movie.actors}
      ${movie.year}
      ${movie.genre}
    `.toLowerCase();

    return text.includes(query);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Handle Prev button
  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle Next button
  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Show only 3 pages before and after current page
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, currentPage + 3);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,24,0.7), rgba(24,24,24,0.7)), url('/posters/hero.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-8">Browse Movies</h1>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search by title, director, actor, year or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 rounded-lg border border-gray-300 text-white bg-[#1e1e1e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 📭 No Results */}
      {filteredMovies.length === 0 ? (
        <p className="text-gray-300 text-lg">No movies found.</p>
      ) : (
        <>
          {/* 🎬 Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl">
            {currentMovies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id} className="group">
                <MovieCard {...movie} />
              </Link>
            ))}
          </div>

          {/* 🔢 Pagination Buttons */}
          <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
            {/* Prev Button */}
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed text-white"
                  : "bg-gray-700 hover:bg-indigo-500 text-white"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-indigo-500"
                } transition`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-500 cursor-not-allowed text-white"
                  : "bg-gray-700 hover:bg-indigo-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Movies;
