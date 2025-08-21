import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MovieCard from "../components/MoviesCard";
import MovieData from "../assets/JSON/movies.json";

export default function Production() {
  const location = useLocation();
  const [selectedProduction, setSelectedProduction] = useState("");
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = params.get("selected");
    if (selected) setSelectedProduction(selected);
  }, [location.search]);

  useEffect(() => {
    if (selectedProduction) {
      const filtered = MovieData.filter(
        (movie) =>
          movie.production &&
          movie.production.toLowerCase() === selectedProduction.toLowerCase()
      );
      setMoviesToShow(filtered);
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProduction]);

  const totalMovies = moviesToShow.length;
  const numOfPages = Math.ceil(totalMovies / moviesPerPage);
  const start = currentPage * moviesPerPage;
  const end = start + moviesPerPage;

  const handlePageChange = (n) => setCurrentPage(n);
  const handlePrevPage = () =>
    currentPage > 0 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < numOfPages - 1 && setCurrentPage(currentPage + 1);

  const getPageNumbers = () => {
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;
    if (start < 0) {
      start = 0;
      end = visiblePages - 1;
    }
    if (end >= numOfPages) {
      end = numOfPages - 1;
      start = numOfPages - visiblePages;
      if (start < 0) start = 0;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-black text-white">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6 animate-pulse">
        🏢 Production Company
      </h1>
      <h2 className="text-2xl font-semibold text-center mb-10">
        Showing {totalMovies} movie(s) by "{selectedProduction}"
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {moviesToShow.length === 0 ? (
          <p className="text-white text-xl">No movies found.</p>
        ) : (
          moviesToShow.slice(start, end).map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard id={movie.id} title={movie.title} year={movie.year} />
            </Link>
          ))
        )}
      </div>

      {totalMovies > moviesPerPage && (
        <div className="flex flex-wrap justify-center mt-10">
          <span
            className={`border px-4 py-2 m-1 cursor-pointer rounded ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
          >
            Prev
          </span>

          {getPageNumbers().map((n) => (
            <span
              key={n}
              onClick={() => handlePageChange(n)}
              className={`border px-4 py-2 m-1 cursor-pointer rounded ${
                currentPage === n
                  ? "bg-cyan-400 text-black font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              {n + 1}
            </span>
          ))}

          <span
            className={`border px-4 py-2 m-1 cursor-pointer rounded ${
              currentPage === numOfPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNextPage}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
}
