import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useDeferredValue,
  startTransition,
} from "react";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import MovieCard from "../components/MoviesCard";
import { Link, useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [moviesData, setMoviesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);
  const deferredSearch = useDeferredValue(debouncedSearch);
  const [selectedGenres, setSelectedGenres] = useState([]); // array of strings
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance"); // relevance | rating | year_desc | title_asc

  const moviesPerPage = 10;

  // Load data and initialize from URL
  useEffect(() => {
    let mounted = true;
    async function load() {
      const mod = await import("../assets/JSON/movies.json");
      if (!mounted) return;
      setMoviesData(mod.default || mod);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const genres = (searchParams.get("genres") || "")
      .split(",")
      .filter(Boolean);
    const rating = parseFloat(searchParams.get("minRating") || "0");
    const sort = searchParams.get("sort") || "relevance";
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10) - 1;

  setSearch(q);
    setSelectedGenres(genres);
    setMinRating(Number.isNaN(rating) ? 0 : rating);
    setSortBy(
      ["relevance", "rating", "year_desc", "title_asc"].includes(sort)
        ? sort
        : "relevance"
    );
    setCurrentPage(
      Number.isNaN(pageFromUrl) || pageFromUrl < 0 ? 0 : pageFromUrl
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL in sync
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    if (selectedGenres.length > 0)
      params.set("genres", selectedGenres.join(","));
    if (minRating > 0) params.set("minRating", String(minRating));
    if (sortBy !== "relevance") params.set("sort", sortBy);
    if (currentPage > 0) params.set("page", String(currentPage + 1));
    setSearchParams(params, { replace: true });
  }, [search, selectedGenres, minRating, sortBy, currentPage, setSearchParams]);

  // search is debounced via useDebounce above

  // Extract unique genres for filter chips
  const allGenres = useMemo(() => {
    const set = new Set();
    for (const m of moviesData) {
      if (m.genres) {
        for (const g of String(m.genres).split(",")) {
          const name = g.trim();
          if (name) set.add(name);
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [moviesData]);

  // Set up Fuse.js options for fuzzy search
  const fuseOptions = useMemo(
    () => ({
      keys: [
        "title",
        "tagline",
        "year",
        "overview",
        "genres",
        "keywords",
        "production_companies",
        "actors",
        "director",
      ],
      threshold: 0.4, // Lower is stricter, higher is fuzzier
      ignoreLocation: true,
      minMatchCharLength: 2,
      includeScore: false,
    }),
    []
  );

  // Create Fuse instance when moviesData changes
  const fuse = useMemo(() => {
    if (moviesData.length === 0) return null;
    return new Fuse(moviesData, fuseOptions);
  }, [moviesData, fuseOptions]);

  // Compute fuse results only when the search term changes
  const fuseResults = useMemo(() => {
    if (!fuse || !deferredSearch) return null;
    try {
      return fuse.search(deferredSearch).map((r) => r.item);
    } catch {
      return null;
    }
  }, [fuse, deferredSearch]);

  // Compute filtered, searched, and sorted list using Fuse.js
  const moviesToShow = useMemo(() => {
    // Start from search results if available, otherwise full list
    const base = fuseResults ?? moviesData;

    // Filter by rating and genres
    const selected = new Set(selectedGenres);
    let filtered = base.filter((m) => {
      const passesRating = (m.rating || 0) >= minRating;
      const passesGenres =
        selected.size === 0 ||
        (m.genres && Array.from(selected).every((g) => m.genres.includes(g)));
      return passesRating && passesGenres;
    });

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "year_desc") {
      filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === "title_asc") {
      filtered.sort((a, b) => String(a.title).localeCompare(String(b.title)));
    }

    return filtered;
  }, [moviesData, fuseResults, selectedGenres, minRating, sortBy]);

  const totalMovies = moviesToShow.length;
  const numOfPages = Math.ceil(totalMovies / moviesPerPage) || 1;
  const start = currentPage * moviesPerPage;
  const end = start + moviesPerPage;

  // throttle page changes to avoid excessive re-renders when clicking rapidly
  const _setPage = useCallback((n) => setCurrentPage(n), []);
  const handlePageChange = useThrottle((n) => _setPage(n), 200);

  const _prev = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);
  const handlePrevPage = useThrottle(_prev, 200);

  const _next = useCallback(() => {
    setCurrentPage((prev) => (prev < numOfPages - 1 ? prev + 1 : prev));
  }, [numOfPages]);
  const handleNextPage = useThrottle(_next, 200);

  const handleSearchChange = useCallback((e) => {
    const next = e.target.value;
    startTransition(() => {
      setSearch(next);
      setCurrentPage(0);
    });
  }, []);

  const toggleGenre = useCallback((genre) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(genre)) next.delete(genre);
      else next.add(genre);
      return Array.from(next);
    });
    setCurrentPage(0);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedGenres([]);
    setMinRating(0);
    setSortBy("relevance");
    setCurrentPage(0);
  }, []);

  const getPageNumbers = useCallback(() => {
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let s = currentPage - half;
    let e = currentPage + half;

    if (s < 0) {
      s = 0;
      e = visiblePages - 1;
    }

    if (e >= numOfPages) {
      e = numOfPages - 1;
      s = numOfPages - visiblePages;
      if (s < 0) s = 0;
    }

    const pages = [];
    for (let i = s; i <= e; i++) pages.push(i);
    return pages;
  }, [currentPage, numOfPages]);

  return (
    <main className="w-full max-w-7xl mx-auto py-8 px-2 md:px-6 text-white">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          <span className="text-cyan-300">CineScope</span> Movies
        </h1>
        <p className="text-white/60 text-lg">
          Discover, filter, and explore movies
        </p>
      </section>

      {/* Sticky Search & Filters Bar */}
      <div className="sticky top-26 z-20 mb-8 p-4 rounded-2xl backdrop-blur">
        <div className="bg-[#181f2a] bg-opacity-90 rounded-2xl shadow-xl border border-white/10 p-4 flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-auto md:mx-0">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg pointer-events-none">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              className="pl-10 pr-12 py-3 w-full rounded-xl bg-white/5 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="Search by title, year, director, actor, or genre"
              onChange={handleSearchChange}
              value={search}
              aria-label="Search movies"
            />
            {search && (
              <button
                aria-label="Clear search"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-end">
            {/* Min Rating */}
            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm">Min rating</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minRating}
                onChange={(e) => {
                  setMinRating(parseFloat(e.target.value));
                  setCurrentPage(0);
                }}
                className="w-32 accent-cyan-400"
              />
              <span className="text-cyan-300 text-sm font-semibold w-8 text-center">
                {minRating}
              </span>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(0);
                }}
                className="px-3 py-2 rounded-xl bg-[#181f2a] border border-white/10 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none shadow-sm hover:bg-[#232b3b]"
                style={{ boxShadow: "none" }}
              >
                <option value="relevance" className="bg-[#181f2a] text-white">
                  Relevance
                </option>
                <option value="rating" className="bg-[#181f2a] text-white">
                  Rating (high to low)
                </option>
                <option value="year_desc" className="bg-[#181f2a] text-white">
                  Year (newest)
                </option>
                <option value="title_asc" className="bg-[#181f2a] text-white">
                  Title (A–Z)
                </option>
              </select>
            </div>
            {/* Results count */}
            <div className="text-sm text-white/70 min-w-[80px] text-center">
              {totalMovies} result{totalMovies === 1 ? "" : "s"}
            </div>
          </div>
        </div>
        {/* Genres as chips */}
        {allGenres.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap justify-center md:justify-start">
            {allGenres.slice(0, 24).map((g) => {
              const active = selectedGenres.includes(g);
              return (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs border transition font-medium shadow-sm ${
                    active
                      ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/40"
                      : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                  }`}
                  aria-pressed={active}
                >
                  {g}
                </button>
              );
            })}
            {(selectedGenres.length > 0 ||
              minRating > 0 ||
              sortBy !== "relevance") && (
              <button
                onClick={clearFilters}
                className="ml-2 px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
        {moviesToShow.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-16">
            <span className="text-5xl mb-4">🎬</span>
            <p className="text-white/80 text-lg">
              No movies found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          moviesToShow.slice(start, end).map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="block">
              <MovieCard id={movie.id} title={movie.title} year={movie.year} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {moviesToShow.length > 0 && (
        <div className="pagination-container flex flex-wrap w-full sm:w-[70%] md:w-[60%] mx-auto justify-center mt-10 gap-2">
          {/* Prev Button */}
          <span
            className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 font-semibold text-white/80 transition ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-500/10 hover:text-cyan-300"
            }`}
            onClick={handlePrevPage}
            tabIndex={currentPage === 0 ? -1 : 0}
            aria-disabled={currentPage === 0}
          >
            Prev
          </span>
          {/* Left Ellipsis */}
          {getPageNumbers()[0] > 0 && (
            <>
              <span
                onClick={() => handlePageChange(0)}
                className="border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 font-semibold"
              >
                1
              </span>
              <span className="px-2 py-2 m-1">...</span>
            </>
          )}
          {/* Page Numbers */}
          {getPageNumbers().map((n) => (
            <span
              key={n}
              onClick={() => handlePageChange(n)}
              className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg font-semibold transition ${
                currentPage === n
                  ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/40"
                  : "bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300"
              }`}
              tabIndex={0}
              aria-current={currentPage === n ? "page" : undefined}
            >
              {n + 1}
            </span>
          ))}
          {/* Right Ellipsis */}
          {getPageNumbers().slice(-1)[0] < numOfPages - 1 && (
            <>
              <span className="px-2 py-2 m-1">...</span>
              <span
                onClick={() => handlePageChange(numOfPages - 1)}
                className="border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 font-semibold"
              >
                {numOfPages}
              </span>
            </>
          )}
          {/* Next Button */}
          <span
            className={`border border-white/10 px-4 py-2 m-1 cursor-pointer rounded-lg bg-white/5 font-semibold text-white/80 transition ${
              currentPage === numOfPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-500/10 hover:text-cyan-300"
            }`}
            onClick={handleNextPage}
            tabIndex={currentPage === numOfPages - 1 ? -1 : 0}
            aria-disabled={currentPage === numOfPages - 1}
          >
            Next
          </span>
        </div>
      )}
    </main>
  );
}

export default Movies;
