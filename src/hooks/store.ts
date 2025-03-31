import type { AppDispatch, RootState } from "@/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; 

//Esto solo es necesario cuando se usa typescript
// ya que typescript no puede inferir el tipo de dato de store
