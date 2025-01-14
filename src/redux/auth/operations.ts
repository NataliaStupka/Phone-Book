import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

//-// typeScript
//дані користувача
interface User {
  name: string;
  email: string;
}
interface UserData {
  user: User;
  token: string;
}
//дані для реїстрації та логіну
interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

//працюємо через окремо створенний axios (уникаємо 'конфлікту'). томущо axios один на весь проект
export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

//створюємо функцію (збереження токену) приймає token
//в місця де логінемось/реєструємся/оновл.сторінка
const setAuthHeader = (token: string) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
//при logout; очищаємо сторінку
const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = ``;
};

// === РЕГІСТРАЦІЯ (/users/signup - Create a new user)===
//credential - дані входу
export const register = createAsyncThunk<
  UserData, //отримаємо при успішному запиті
  AuthCredentials, //приймає функція
  { rejectValue: string } //додаткові параметри
>("auth/register", async (credential, thunkAPI) => {
  try {
    //console.log("credential", credential); //name, email, password
    ///users/signup - маршрут
    const response = await goitApi.post<UserData>("/users/signup", credential);

    setAuthHeader(response.data.token); //запам'ятовуємо token
    //console.log("response.register", response); //token, name, email, password
    return response.data;
  } catch (error: unknown) {
    //-//якщо помилка є екземпляром Error, то повертаємо error.message
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    //-//якщо помилка не відома
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

// === ЛОГІНІЗАЦИЯ ===
export const login = createAsyncThunk<
  UserData, //плануємо отримати
  AuthCredentials, //{name, email,pasword}те що передається у асинх.функцію
  { rejectValue: string }
>("auth/login", async (credential, thunkAPI) => {
  try {
    const response = await goitApi.post<UserData>("/users/login", credential);
    //console.log("response.login", response.data); //{token, user: email, name
    setAuthHeader(response.data.token); //запам'ятовуємо token (для виходу і т.д)
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

// === LOGOUT ===
export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>("auth/logout", async (_, thunkAPI) => {
  try {
    await goitApi.post("/users/logout");
    clearAuthHeader(); //очищаємо header при виході
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

// === REFRESH === оновлення сторінки
//збереж.дані, при перезагрузці не потрібно знову логінізуватися
export const refreshUser = createAsyncThunk<
  User,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("auth/refresh", async (_, thunkAPI) => {
  //thunkAPI.getState() - поверне весь store(auth(isLoggedIn, token), user, ...)
  const savedToken = thunkAPI.getState().auth.token; //отримуємо рядок token

  if (!savedToken) {
    return thunkAPI.rejectWithValue("Token is not exist!");
  }

  try {
    setAuthHeader(savedToken); // token
    const { data } = await goitApi.get<User>("/users/current"); //запит за токеном
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});
