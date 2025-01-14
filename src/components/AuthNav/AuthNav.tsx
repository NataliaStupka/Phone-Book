import s from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <ul className={s.nav}>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </ul>
  );
};

export default AuthNav;
