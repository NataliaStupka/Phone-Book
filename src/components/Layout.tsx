import { Outlet } from "react-router-dom"; //куди рендереться children
import AppBar from "./AppBar/AppBar";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Layout;
