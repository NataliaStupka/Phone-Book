//isAnyOf - для кожного з ...
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./operations";
import { logout } from "../auth/operations";

import { Contact } from "../type"; //type
interface ContactState {
  items: Contact[];
  isLoading: boolean;
  isError: boolean | null;
}

//початковий стан контакти
const initialState: ContactState = {
  items: [],
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},

  //відбувається за межами
  extraReducers: (builder) => {
    builder
      //--запит
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.items = action.payload; // [{id, name,number}]
        }
      )
      //////при logout очищую сторінку з контактами
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      //--видалення контакта
      .addCase(
        deleteContact.fulfilled,
        (state, { payload }: PayloadAction<Contact>) => {
          //console.log("PAY", payload); //{id, name, number}
          state.items = state.items.filter((item) => item.id !== payload.id); //локально видаляємо на стороні клієнта
        }
      )
      //--додавання контакту
      .addCase(
        addContact.fulfilled,
        (state, { payload }: PayloadAction<Contact>) => {
          state.items.push(payload); ////{id, name, number}
          //state.items = [...state.items, payload]//  ?????
        }
      )

      //-- addMatcher --//
      //== стан в очікуванні - pending
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      //== стан успіх - fulfilled
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      //== стан помилка - regected
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

//selector --> selector.js

//експортуємо slice (reducer) в store
export const contactReducer = slice.reducer;
