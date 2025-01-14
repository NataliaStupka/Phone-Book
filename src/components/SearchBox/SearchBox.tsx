import s from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

//typeScript
import { AppDispatch } from "../../redux/store";

const SearchBox = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={s.searchWrapper}>
      <p>Find contact by name</p>

      {/* e.target.value - передамо значення, що вводяться */}
      <input
        type="text"
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(changeFilter(e.target.value)) //автоматично типізується як string
        }
      />
    </div>
  );
};

export default SearchBox;

//У React onChange, автоматично передає об'єкт типу React.ChangeEvent<HTMLInputElement>
