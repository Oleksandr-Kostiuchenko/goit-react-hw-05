import { useState, useEffect } from "react";
import style from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import { fetchFilmByName } from "../../fetchFilms";
import MovieList from "../../components/movielist/MovieList";
import { useDebounce } from "use-debounce";

const MoviesPage = () => {
  //* Params controlling
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = searchParams.get("query") || "";
  const [debouncedQuery] = useDebounce(userQuery, 300);

  const updateParams = (value) => {
    const updateSearchParams = new URLSearchParams(searchParams);

    if (value !== "") {
      updateSearchParams.set("query", value);
    } else {
      updateSearchParams.delete("query");
    }

    setSearchParams(updateSearchParams);
  };

  //* Fetching
  const [filmData, setFilmData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchFilmByName(debouncedQuery);
        console.log(data);
        setFilmData(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilms();
  }, [debouncedQuery]);

  return (
    <>
      <div>
        <input
          value={userQuery}
          onChange={(e) => updateParams(e.target.value)}
          type="text"
          name="userFilm"
        />
      </div>

      {filmData && filmData.length > 0 && <MovieList data={filmData} />}
    </>
  );
};

export default MoviesPage;
