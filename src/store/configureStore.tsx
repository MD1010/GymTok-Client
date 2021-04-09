import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { loadLoggedUser } from "./auth/actions";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<any, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
