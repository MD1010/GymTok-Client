import { Action, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })],
});

store.subscribe(() => {});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<any, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
