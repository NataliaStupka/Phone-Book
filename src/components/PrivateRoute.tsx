//приватний маршрут, приймає children - <Contacts />
//redirectTo - перенаправити на

import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks"; //useSelector

import React, { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement; // тип для компонентів, які повертаються JSX. Забезпечує, що children завжди є компонентом
  redirectTo?: string;
}

//React.FC<PrivateRouteProps>  - типізація функціонального компонента
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  console.log("children", children);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;

//якщо children масив компонентів або одним компонентом
//   ReactElement | ReactElement[]:
