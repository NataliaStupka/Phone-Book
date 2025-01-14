import { configureStore } from "@reduxjs/toolkit";

import { contactReducer } from "./contacts/slice";
import { filterReducer } from "./filters/slice"; //reducer filter
import { authReducer } from "./auth/slice";

//-- persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"], //зберігаємо тільки токен, для оновлення сторінки
};
const persistedReducer = persistReducer(persistConfig, authReducer);
//--

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    auth: persistedReducer,
  },
  //--- persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //-----==
});

//--- persist
export const persistor = persistStore(store);

//-//type ???
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // MyComponent.tsx - const dispatch: AppDispatch = useDispatch()

//
//======== ????? типізація ?? =========
// Типизирован persistConfig, чтобы он соответствовал данным,
// которые возвращает authReducer.

// Добавлен тип AppDispatch для использования с useDispatch.

// Проверено, что RootState автоматически корректен,
//  так как он строится на основе store.

// import { configureStore } from "@reduxjs/toolkit";
// import { contactReducer } from "./contacts/slice";
// import { filterReducer } from "./filters/slice";
// import { authReducer } from "./auth/slice";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistConfig } from "redux-persist";

// // Конфигурация persist
// const persistConfig: PersistConfig<ReturnType<typeof authReducer>> = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ["token"], // Сохраняем только токен
// };

// // Обёрнутый редьюсер auth
// const persistedReducer = persistReducer(persistConfig, authReducer);

// // Создание store
// export const store = configureStore({
//   reducer: {
//     contacts: contactReducer,
//     filter: filterReducer,
//     auth: persistedReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // Persistor для синхронизации
// export const persistor = persistStore(store);

// // Типы для использования в проекте
// export type RootState = ReturnType<typeof store.getState>; // Тип состояния
// export type AppDispatch = typeof store.dispatch; // Тип dispatch
