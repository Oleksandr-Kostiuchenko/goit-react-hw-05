import style from "./HomePage.module.css";
import { motion } from "framer-motion";

//* Router
import { useEffect, useState } from "react";
import { fetchTrendingFilms } from "../../fetchFilms";

//* Components
import MovieList from "../../components/movielist/MovieList";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errormessage/ErrorMessage";

const HomePage = () => {
  const [trendingFilmsData, setTrendingFilmsData] = useState("");
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchTrendingFilms();
        console.log(data);

        setTrendingFilmsData(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilms();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {trendingFilmsData.length > 0 && (
        <motion.div
          className={style.headerWrapper}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MovieList data={trendingFilmsData} />
        </motion.div>
      )}
      {error && <ErrorMessage />}
    </>
  );
};

export default HomePage;
