import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { FaFilm } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

import { motion } from "framer-motion";

const clsxConstructor = ({ isActive }) => {
  return clsx(style.navLink, isActive && style.activeLink);
};

const Navigation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className={style.headerWrapper}>
        <h1 className={style.pageTitle}>
          <FaFilm className={style.pageLogo} />
          FilmHunter
        </h1>

        <nav className={style.navWrapper}>
          <ul className={style.navList}>
            <li>
              <NavLink to="/" className={clsxConstructor}>
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={clsxConstructor}>
                <BiMoviePlay />
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={clsxConstructor}>
                <FaHeart />
                Favorites
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </motion.div>
  );
};

export default Navigation;
