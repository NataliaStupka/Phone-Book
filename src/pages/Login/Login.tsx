import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div>
      <NavLink
        to="/"
        style={{
          fontSize: "20px",
          margin: "15px",
          lineHeight: "1.5",
        }}
      >
        Home page
      </NavLink>
      <LoginForm />
    </div>
  );
};

export default Login;
