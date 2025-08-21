import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About, Contact, Movies, NotFound, Genres } from "./pages";
import MovieInfo from "./components/MovieInfo";
import Layout from "./components/Layout";
import Directors from "./pages/Directors";
import Actors from "./pages/Actors";
import Production from "./pages/Production";
import PosterTest from "./components/PosterTest";
import SimplePosterTest from "./components/SimplePosterTest";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
