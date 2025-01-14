//Header

import s from "./AppBar.module.css";
import React from "react"; //для React.FC - типізуємо функції

import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

//typeScript
import { useAppSelector } from "../../redux/hooks"; //useSelector

const AppBar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <header className={s.header}>
      {/* HomePage, ContactsPage */}
      <Navigation />
      {/* welkomTekst, Logout_button */} {/* Login, Register */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
