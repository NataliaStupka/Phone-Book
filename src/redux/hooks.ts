//useSelector; також можна useDispatch - useAppDispatch
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

//за замовчуванням, useSelector приймає тип RootState из store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//тепер в компонентах використовуємо useAppSelector замість useSelector
