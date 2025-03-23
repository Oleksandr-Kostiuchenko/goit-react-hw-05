import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const clsxConstructor = ({ isActive }) => {
  return clsx(style.navLink, isActive && style.activeLink);
};

const Navigation = () => {
  return (
    <nav className={style.navWrapper}>
      <ul className={style.navList}>
        <li>
          <NavLink to="/" className={clsxConstructor}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={clsxConstructor}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
