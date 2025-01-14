//запит GET, POST, DELETE

import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../auth/operations";

import { Contact } from "../type"; //type
type NewContact = Contact;

//createAsyncThunk приймає рядок(що за операція), і асинхронну функцію запит;
//fetchContacts - викликаємо в contactList через dispatch та useEffect;
//thunkAPI - для error
export const fetchContacts = createAsyncThunk<
  Contact[], //отримаємо при успішному запиті
  void, // аргументів немає (_, thunkAPI)
  {
    rejectValue: string;
  }
>("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await goitApi.get<Contact[]>("/contacts");
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

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  {
    rejectValue: string;
  }
>("contacts/deleteContact", async (id: string, thunkAPI) => {
  try {
    const response = await goitApi.delete<Contact>(`/contacts/${id}`);
    return response.data; //{id, nume, number}
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

//додавання контакту
export const addContact = createAsyncThunk<
  Contact,
  NewContact,
  {
    rejectValue: string;
  }
>("contacts/addContact", async (body: NewContact, thunkAPI) => {
  try {
    const response = await goitApi.post<Contact>(`/contacts`, body);
    return response.data; //{id, nume, number}
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});
