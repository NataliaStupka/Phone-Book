import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

// стилізація активного лінка
const buildLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <nav>
      <ul className={s.nav_list}>
        <li>
          <NavLink to="/" className={buildLinkClass}>
            HomePage
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts" className={buildLinkClass}>
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
