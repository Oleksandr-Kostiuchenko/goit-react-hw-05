import style from "./MovieReviews.module.css";
import { fetchFilmReviews } from "../../fetchFilms";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieReviews = () => {
  const movieParamsData = useParams();

  const [reviewsData, setReviewsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getFilmReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const reviewsData = await fetchFilmReviews(
          movieParamsData.movieId.substring(1)
        );
        console.log(reviewsData);
        setReviewsData(reviewsData);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getFilmReviews();
  }, [movieParamsData.movieId]);

  return reviewsData &&
    reviewsData.results &&
    reviewsData.results.length > 0 ? (
    <ul className={style.movieList}>
      {reviewsData.results.map((element) => (
        <li className={style.movieWrapper} key={element.id}>
          <h3>{element.author}</h3>

          <p>{element.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews available.</p>
  );
};

export default MovieReviews;
