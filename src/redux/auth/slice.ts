// PayloadAction - тип який типізує action в средині reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

//initialState type
interface User {
  name: string | null;
  email: string | null;
}
interface UserData {
  user: User;
  token: string;
}
interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

//початковий стан користувача
const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false, //чи залогований
  isRefreshing: false, //стан оновлення сторінки(візуал)
};

//створюємо slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, //для типізації

  //pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<UserData>) => {
        //console.log("payload", action.payload); //{token: string; user: email:string, name: string}
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
        //console.log("payloadввв", action.payload); //{token: string; user: email:string, name: string}
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      //при logout повертаємо початковий стан
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      //refresh
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload; //{name, email}
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
