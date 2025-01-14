import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"; //маршрут до ...
import s from "./LoginForm.module.css";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

//typeScript
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks"; //useSelector

interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (
    values: Pick<AuthCredentials, "email" | "password">,
    options: FormikHelpers<Pick<AuthCredentials, "email" | "password">>
  ) => {
    const fullValues = { ...values, name: "" }; //для типізації, бо login приймає три параметри, а формік обробляє тільки два
    dispatch(login(fullValues)); //приймає: name, email, password
    options.resetForm();
  };

  //Pick - вибрати необхідні властивості із існуючого типу, і створити новий тип на його основі
  const initialValues: Pick<AuthCredentials, "email" | "password"> = {
    email: "",
    password: "",
  };

  //якщо юзер залогований - направляємо його на список контактів
  // інший варіант dispatch().unwrap().then((res) => navigate('/tasks'))
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }

  return (
    <div className={s.wrapper}>
      <h2>Login</h2>
      <Formik<Pick<AuthCredentials, "email" | "password">>
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <Field name="email" placeholder="Enter email" />
          <Field name="password" type="password" placeholder="Enter pass" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
