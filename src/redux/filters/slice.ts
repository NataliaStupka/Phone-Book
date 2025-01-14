import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchContact: string;
}

//початковий стан
const initialState: FilterState = {
  searchContact: "", // що шукаємо
};

//створюємо слайс
const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    //actions
    changeFilter: (state, action: PayloadAction<string>) => {
      state.searchContact = action.payload;
    },
  },
});

//action
export const { changeFilter } = slice.actions;

//selector --> selector.js

//експортуємо slice (reducer)
export const filterReducer = slice.reducer; //використовуємо в //обгортка persist
