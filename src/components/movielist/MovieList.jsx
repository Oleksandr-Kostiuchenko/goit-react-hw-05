import style from "./MovieList.module.css";
import MovieItem from "../movieitem/MovieItem";

const MovieList = ({ data }) => {
  return (
    <>
      <ul className={style.movieList}>
        {data.map((element) => (
          <li className={style.movieItem} key={element.id}>
            <MovieItem data={element} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
