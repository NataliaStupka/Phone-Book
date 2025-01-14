//приймає component - Register/Login
//redirectTo - перенаправити на '/contacts'

import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

//typeScript
import { useAppSelector } from "../redux/hooks"; //useSelector
import React, { ReactElement } from "react";

interface RestrictedRouteProps {
  component: ReactElement; // тип для компонентів, які повертаються JSX. Забезпечує, що children завжди є компонентом
  redirectTo: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;

//якщо children масив компонентів або одним компонентом
//   ReactElement | ReactElement[]:
