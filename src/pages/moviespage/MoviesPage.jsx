import { useState, useEffect } from "react";
import style from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import { fetchFilmByName } from "../../fetchFilms";
import MovieList from "../../components/movielist/MovieList";
import { useDebounce } from "use-debounce";

import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import ErrorMessage from "../../components/errormessage/ErrorMessage";

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
      <motion.div
        className={style.inputWrapper}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <input
          autoComplete="off"
          placeholder="Type to search..."
          className={style.filmInput}
          value={userQuery}
          onChange={(e) => updateParams(e.target.value)}
          type="text"
          name="userFilm"
        />
        <CiSearch className={style.searchIcon} />
      </motion.div>

      {filmData && filmData.length > 0 && (
        <motion.div
          className={style.headerWrapper}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MovieList data={filmData} />
        </motion.div>
      )}
      {error && <ErrorMessage />}
    </>
  );
};

export default MoviesPage;
