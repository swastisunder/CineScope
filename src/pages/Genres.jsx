import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import MovieCard from "../components/MoviesCard";
import MovieData from "../assets/JSON/movies.json";

// Collect top-rated quotes
const quotes = [];
for (const movie of MovieData) {
  if (movie.tagline && movie.title && movie.rating >= 9) {
    quotes.push(`"${movie.tagline}" - ${movie.title}`);
  }
}

export default function Genres() {
  const location = useLocation();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [quote, setQuote] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10;

  // Generate unique genres
  const allGenres = MovieData.flatMap((movie) =>
    movie.genres.split(",").map((g) => g.trim())
  );
  const uniqueGenres = [...new Set(allGenres)].filter((g) => g !== "");

  function getRandomSelection(data, count) {
    const temp = [...data];
    const result = [];
    while (result.length < count && temp.length > 0) {
      const index = Math.floor(Math.random() * temp.length);
      result.push(temp.splice(index, 1)[0]);
    }
    return result;
  }

  // Read selected genre from URL query string (e.g., ?selected=Action)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = params.get("selected");
    if (selected) {
      setSelectedGenre(selected);
    }
  }, [location.search]);

  // Filter movies based on selected genre or show top-rated
  useEffect(() => {
    const filtered = selectedGenre
      ? MovieData.filter((movie) =>
          movie.genres
            .split(",")
            .map((g) => g.trim())
            .includes(selectedGenre)
        )
      : getRandomSelection(
          MovieData.filter((movie) => movie.rating >= 7),
          10
        );

    setMoviesToShow(filtered);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setCurrentPage(0); // Reset to first page on genre change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedGenre]);

  // Pagination logic
  const totalMovies = moviesToShow.length;
  const numOfPages = Math.ceil(totalMovies / moviesPerPage);
  const start = currentPage * moviesPerPage;
  const end = start + moviesPerPage;

  const handlePageChange = (n) => setCurrentPage(n);
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < numOfPages - 1) setCurrentPage((prev) => prev + 1);
  };

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

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="w-[90%] mx-auto py-8 text-white">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Discover by <span className="text-cyan-300">Genre</span>
        </h1>
        <p className="text-white/70 mt-2 italic">{quote}</p>
        <p className="text-white/70 mt-2">
          {selectedGenre
            ? `Showing ${totalMovies} "${selectedGenre}" Movies`
            : "Top-rated Movies Just for You"}
        </p>
      </section>

      {/* Mobile: Dropdown */}
<div className="md:hidden sticky top-24 z-20 mb-6 p-4 rounded-2xl backdrop-blur bg-gray-900">
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    className="w-full px-3 py-2 rounded-xl bg-[#181f2a] border border-white/10 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
  >
    <option value="">All Genres</option>
    {uniqueGenres.map((genre, index) => (
      <option key={index} value={genre}>
        {genre}
      </option>
    ))}
  </select>
</div>

{/* Desktop: Genre chips */}
<div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-3 sticky top-24 z-20 mb-8 p-4 rounded-2xl backdrop-blur bg-gray-900">
  {uniqueGenres.map((genre, index) => (
    <button
      key={index}
      onClick={() =>
        setSelectedGenre((prev) => (prev === genre ? "" : genre))
      }
      className={`px-3 py-2 rounded-xl text-sm border transition cursor-pointer ${
        selectedGenre === genre
          ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/40"
          : "bg-white/5 text-white border-white/10 hover:bg-white/10"
      }`}
    >
      {genre}
    </button>
  ))}
</div>


      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-center">
        {moviesToShow.length === 0 ? (
          <div className="col-span-full flex justify-center">
            <p className="text-white/80">No movies found.</p>
          </div>
        ) : (
          moviesToShow.slice(start, end).map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard id={movie.id} title={movie.title} year={movie.year} />
            </Link>
          ))
        )}
      </div>

      {totalMovies > moviesPerPage && (
        <div className="pagination-container flex flex-wrap w-full sm:w-[70%] md:w-[60%] mx-auto justify-center mt-8">
          <span
            className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white/10"
            }`}
            onClick={handlePrevPage}
          >
            Prev
          </span>

          {getPageNumbers()[0] > 0 && (
            <>
              <span
                onClick={() => handlePageChange(0)}
                className="border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 hover:bg-white/10"
              >
                1
              </span>
              <span className="px-2 py-2 m-1">...</span>
            </>
          )}

          {getPageNumbers().map((n) => (
            <span
              key={n}
              onClick={() => handlePageChange(n)}
              className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg ${
                currentPage === n
                  ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/40"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {n + 1}
            </span>
          ))}

          {getPageNumbers().slice(-1)[0] < numOfPages - 1 && (
            <>
              <span className="px-2 py-2 m-1">...</span>
              <span
                onClick={() => handlePageChange(numOfPages - 1)}
                className="border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 hover:bg-white/10"
              >
                {numOfPages}
              </span>
            </>
          )}

          <span
            className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 ${
              currentPage === numOfPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white/10"
            }`}
            onClick={handleNextPage}
          >
            Next
          </span>
        </div>
      )}
    </main>
  );
}
