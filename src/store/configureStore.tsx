import AsyncStorage from "@react-native-community/async-storage";
import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { loadLoggedUser } from "./auth/actions";
import { authActions } from "./auth/authSlice";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {});
// store.dispatch(loadLoggedUser());

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
