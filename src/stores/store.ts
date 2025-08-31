import { configureStore } from "@reduxjs/toolkit";
import testDataReducer from "./slices/app-slice";
import {
  useSelector as rawUseSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: { testData: testDataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export type AppDispatch = typeof store.dispatch;
