import style from "./MovieDetailsPage.module.css";
import { fetchFilmById } from "../../fetchFilms";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BackLink from "../../components/backlink/BackLink";

const MovieDetailsPage = () => {
  const movieParamsData = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");

  const [movieData, setMovieData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilmData();
  }, []);

  return (
    movieData && (
      <>
        <BackLink to={backLinkHref.current}>Back</BackLink>
        <div className={style.filmWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movieData.poster_path}`}
            alt="film-poster"
          />
          <div>
            <h2>
              <a href={movieData.homepage} target="_blank">
                {movieData.title}
              </a>
            </h2>
            <p>User score: {Math.floor(movieData.vote_average * 10)}%</p>

            <h3>Overview</h3>
            <p>{movieData.overview}</p>

            <h3>Genres</h3>
            <ul>
              {movieData.genres.map((element) => (
                <li key={element.id}>
                  <p>{element.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3>Additional info:</h3>
          <nav>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
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
