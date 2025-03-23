import { useState } from "react";
import { lazy, Suspense } from "react";
import "./App.css";

//* Router
import { NavLink, Route, Routes } from "react-router-dom";

//* Pages & components
import Navigation from "./components/navigation/Navigation";
const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const MoviesPage = lazy(() => import("./pages/moviespage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/moviedetailspage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/moviecast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/moviereviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./pages/notfoundpage/NotFoundPage"));

function App() {
  return (
    <>
      <Navigation />

      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
