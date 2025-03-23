import style from "./MovieItem.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { IoMdStar } from "react-icons/io";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieItem = ({ data }) => {
  const location = useLocation();

  const review = Math.floor(data.vote_average);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <IoMdStar key={i} className={i < review / 2 && style.filledStar} />
      );
    }

    return stars;
  };

  return (
    <div className={style.filwWrapper}>
      <NavLink to={`/movies/:${data.id}`} state={location}>
        <img
          className={style.filmImage}
          alt="film-poster"
          src={
            data.poster_path !== null
              ? `https://image.tmdb.org/t/p/w200/${data.poster_path}`
              : defaultImg
          }
        />
        <p className={style.filmTitle}>{data.title.substring(0, 15)}</p>
        <p className={style.filmDescription}>{data.release_date}</p>
        <div>{renderStars()}</div>
      </NavLink>
    </div>
  );
};

export default MovieItem;
