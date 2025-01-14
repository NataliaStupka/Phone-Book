import { RootState } from "../store"; //-// імпортуємо тип стану

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

//refresh
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

//-//
//// уточнення типів, що повертаються
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // інші поля
// }
// // якщо user — це об'єкт або null
// export const selectUser = (state: RootState): User | null => state.auth.user;

// // якщо isLoggedIn — це boolean
// export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

// // якщо isRefreshing — це boolean
// export const selectIsRefreshing = (state: RootState): boolean => state.auth.isRefreshing;
