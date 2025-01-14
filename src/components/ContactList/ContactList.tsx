import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";

import { useDispatch } from "react-redux";

//selectors
import { selectFilteredContactsMemo } from "../../redux/filters/selectors";
import { selectIsError, selectIsLoading } from "../../redux/contacts/selectors";

import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations"; //запит на бекенд
import Loader from "../Loader/Loader";

//typeScript
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks"; //useSelector

const ContactList = () => {
  //-------------------
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  //===================

  const isError = useAppSelector(selectIsError);
  const isLoading = useAppSelector(selectIsLoading);

  const contacts = useAppSelector(selectFilteredContactsMemo); //з фільтрацією
  //--==-- логіка фільтрації в selectors.js (selectFilteredContacts)

  return (
    <>
      {isLoading && <Loader />}
      <ul className={s.list}>
        {isError && (
          <h2 style={{ margin: "25px" }}>
            An error occurred, please restart or try again later.
          </h2>
        )}

        {contacts.length === 0 && !isError && !isLoading && (
          <h2 className={s.textEmpty}>Nothing found</h2>
        )}
        {contacts.map((contact) => (
          <li key={contact.id} className={s.item}>
            <Contact data={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
