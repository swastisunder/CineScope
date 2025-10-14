import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MovieInfo from "./components/MovieInfo";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const Directors = lazy(() => import("./pages/Directors"));
const Actors = lazy(() => import("./pages/Actors"));
const Production = lazy(() => import("./pages/Production"));
const Genres = lazy(() => import("./pages/Genres"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PosterTest = lazy(() => import("./components/PosterTest"));
const SimplePosterTest = lazy(() => import("./components/SimplePosterTest"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="w-full text-center py-20">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:id" element={<MovieInfo />} />

            <Route path="directors" element={<Directors />} />
            <Route path="actors" element={<Actors />} />
            <Route path="production" element={<Production />} />

            <Route path="genres" element={<Genres />} />
            <Route path="aboutus" element={<About />} />
            <Route path="poster-test" element={<PosterTest />} />
            <Route path="simple-test" element={<SimplePosterTest />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
