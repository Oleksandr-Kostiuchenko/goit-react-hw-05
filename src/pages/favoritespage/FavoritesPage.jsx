import style from "./FavoritesPage.module.css";
import { useState } from "react";
import MovieList from "../../components/movielist/MovieList";

const FavoritesPage = () => {
  const [favoritesFilms, setFavoritesFilms] = useState(() => {
    const favoritesFromLS = localStorage.getItem("favorites");
    return favoritesFromLS ? JSON.parse(favoritesFromLS) : [];
  });

  return <MovieList data={favoritesFilms} />;
};

export default FavoritesPage;
