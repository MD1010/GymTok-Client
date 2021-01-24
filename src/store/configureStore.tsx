import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
