import style from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { fetchFilmCast } from "../../fetchFilms";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const movieParamsData = useParams();

  const [castData, setCastData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getFilmCast = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const castData = await fetchFilmCast(
          movieParamsData.movieId.substring(1)
        );
        console.log(castData);
        setCastData(castData);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilmCast();
  }, [movieParamsData.movieId]);

  return castData && castData.cast ? (
    <ul>
      {castData.cast.map((element) => (
        <li key={element.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${element.profile_path}`}
            alt="film-poster"
          />

          <p>{element.name}</p>
          <p>Character: {element.character}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No cast data available.</p>
  );
};

export default MovieCast;
