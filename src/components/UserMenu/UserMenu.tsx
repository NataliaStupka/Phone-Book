import s from "./UserMenu.module.css";

import { useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

//typeScript
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks"; //useSelector

const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch();

  const user = useAppSelector(selectUser);

  return (
    <>
      {/* вітання  user*/}
      <p className="s.welkomTekst">
        Welcom, <span className={s.user}>{user.email}</span>
      </p>

      {/* кнопка Виходу */}
      <button onClick={() => dispatch(logout())} className={s.button}>
        Logout
      </button>
    </>
  );
};

export default UserMenu;
