import { useState } from "react";
import "./App.css";

//* Router
import { NavLink, Route, Routes } from "react-router-dom";

//* Pages & components
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/homepage/HomePage";
import MoviesPage from "./pages/moviespage/MoviesPage";
import MovieDetailsPage from "./pages/moviedetailspage/MovieDetailsPage";

import MovieCast from "./components/moviecast/MovieCast";
import MovieReviews from "./components/moviereviews/MovieReviews";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
