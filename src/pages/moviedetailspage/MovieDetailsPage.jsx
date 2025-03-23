import style from "./MovieDetailsPage.module.css";
import { fetchFilmById } from "../../fetchFilms";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BackLink from "../../components/backlink/BackLink";

import { FaInfoCircle } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Loader from "../../components/loader/Loader";

const MovieDetailsPage = () => {
  const movieParamsData = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");

  const [movieData, setMovieData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [favoritesFilms, setFavoritesFilms] = useState(() => {
    const favoritesFromLS = localStorage.getItem("favorites");
    return favoritesFromLS ? JSON.parse(favoritesFromLS) : [];
  });

  const [isInFav, setIsInFav] = useState(() => {
    const favoritesFromLS = localStorage.getItem("favorites");
    const favorites = favoritesFromLS ? JSON.parse(favoritesFromLS) : [];
    return favorites.some((film) => film.id === movieData?.id);
  });

  const handleLike = () => {
    setFavoritesFilms((prevFilms) => {
      if (Array.isArray(prevFilms)) {
        const isFilmInFavorites = prevFilms.some(
          (film) => film.id === movieData.id
        );
        if (isFilmInFavorites) {
          setIsInFav(false);
          return prevFilms.filter((film) => film.id !== movieData.id);
        } else {
          setIsInFav(true);
          return [...prevFilms, movieData];
        }
      } else {
        setIsInFav(true);
        return [movieData];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesFilms));
  }, [favoritesFilms]);

  useEffect(() => {
    const getFilmData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const response = await fetchFilmById(
          movieParamsData.movieId.substring(1)
        );
        console.log(response);

        setMovieData(response);
        setIsInFav(favoritesFilms.some((film) => film.id === response.id));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilmData();
  }, [movieParamsData.movieId, favoritesFilms]);

  return (
    movieData && (
      <>
        {isLoading && <Loader />}
        <BackLink to={backLinkHref.current}>Back</BackLink>
        <div className={style.filmWrapper}>
          <img
            className={style.imgWrapper}
            src={`https://image.tmdb.org/t/p/w200/${movieData.poster_path}`}
            alt="film-poster"
          />
          <div>
            <h2>
              <a href={movieData.homepage} target="_blank">
                {movieData.title}
              </a>
            </h2>
            <div className={style.statsWrapper}>
              <p>User score: {Math.floor(movieData.vote_average * 10)}%</p>
              <div className={style.barWrapper}>
                <div
                  style={{
                    width: `${Math.floor(movieData.vote_average * 10)}%`,
                  }}
                  className={style.bar}
                ></div>
              </div>
            </div>

            <div className={style.overViewWrapper}>
              <h3>Overview</h3>
              <p className={style.desc}>{movieData.overview}</p>
            </div>

            <h3>Genres</h3>
            <ul>
              {movieData.genres.map((element) => (
                <li key={element.id}>
                  <p className={style.desc}>{element.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!isInFav ? (
          <button className={style.likeButton} onClick={handleLike}>
            <FaHeart className={style.likeIcon} />
            Like
          </button>
        ) : (
          <button className={style.likeButton} onClick={handleLike}>
            <FaHeart className={style.likeIcon} />
            Unlike
          </button>
        )}

        <div>
          <h3 className={style.additionalTitle}>
            <FaInfoCircle />
            Additional info:
          </h3>
          <nav className={style.navWrapper}>
            <ul>
              <li>
                <NavLink to="cast" className={style.additionalLink}>
                  <FaLocationArrow />
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={style.additionalLink}>
                  <FaLocationArrow />
                  Reviews
                </NavLink>
              </li>
            </ul>
          </nav>

          <Outlet />
        </div>
      </>
    )
  );
};

export default MovieDetailsPage;
