import style from "./BackLink.module.css";
import { NavLink } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";

const BackLink = ({ to, children }) => {
  return (
    <NavLink className={style.btnLink} to={to}>
      <IoCaretBackOutline />
      {children}
    </NavLink>
  );
};

export default BackLink;
