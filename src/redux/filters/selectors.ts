//selectors (useSelector) - використання на компоненті
//state - загальний(store), contact - назва слайсу, items/filter- занчення в initialState

import { RootState } from "../store"; //-// імпортуємо тип стану
import { createSelector } from "@reduxjs/toolkit";

import { Contact } from "../type";

export const selectContacts = (state: RootState) => state.contacts.items; //контакти
//filterSlice
export const selectSearchFilter = (state: RootState) =>
  state.filter.searchContact; //пошук

//складений селектор, пошук/фільтрація контактів
export const selectFilteredContactsMemo = createSelector(
  [selectContacts, selectSearchFilter],
  (contacts: Contact[], filter: string): Contact[] => {
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter) //пошук за номером
    );
  }
);
//(contacts: Contact[], filter: string): Contact[] => //функція приймає Contact[], filter: string і повертає Contact[]

//selectFilteredContacts - передамо в ContactList для рендера контактів
//замість selectContacts
