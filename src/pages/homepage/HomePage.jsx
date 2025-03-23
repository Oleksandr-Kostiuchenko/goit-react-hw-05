import style from "./HomePage.module.css";

//* Router
import { useEffect, useState } from "react";
import { fetchTrendingFilms } from "../../fetchFilms";

//* Components
import MovieList from "../../components/movielist/MovieList";

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
      <h1 className={style.pageTitle}>
        Discover What’s Trending in Cinema Today!
      </h1>
      {trendingFilmsData.length > 0 && <MovieList data={trendingFilmsData} />}
    </>
  );
};

export default HomePage;
