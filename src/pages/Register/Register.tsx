import { NavLink } from "react-router-dom";
import RegisterationForm from "../../components/RegisterationForm/RegisterationForm";

const Register = () => {
  return (
    <div>
      <NavLink
        to="/"
        style={{ fontSize: "20px", margin: "15px", lineHeight: 1.5 }}
      >
        Home page
      </NavLink>
      <RegisterationForm />
    </div>
  );
};

export default Register;
