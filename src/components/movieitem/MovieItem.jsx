import style from "./MovieItem.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieItem = ({ data }) => {
  const location = useLocation();

  return (
    <div className={style.filwWrapper}>
      {/* {data.title} */}

      <NavLink to={`/movies/:${data.id}`} state={location}>
        <img
          alt="film-poster"
          src={
            data.poster_path !== null
              ? `https://image.tmdb.org/t/p/w200/${data.poster_path}`
              : defaultImg
          }
        />
        {data.poster_path === null && data.title}
      </NavLink>
    </div>
  );
};

export default MovieItem;
