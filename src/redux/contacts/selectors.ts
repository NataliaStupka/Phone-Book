import { RootState } from "../store"; //-// імпортуємо тип стану

//selectors (useSelector) - використання на компоненті (useAppSelector з typeScript)
//state - загальний(store), contact - назва слайсу, items/filter- занчення в initialState

//contactSlice
export const selectContacts = (state: RootState) => state.contacts.items; //контакти
export const selectIsError = (state: RootState) => state.contacts.isError;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
