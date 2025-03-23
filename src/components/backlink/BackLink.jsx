import style from "./BackLink.module.css";
import { NavLink } from "react-router-dom";

const BackLink = ({ to, children }) => {
  return <NavLink to={to}>{children}</NavLink>;
};

export default BackLink;
