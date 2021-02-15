import localStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/User";
import { RootState } from "../configureStore";

export interface AuthState {
  loggedUser: IUser | null;
  authError: string | null;
}
export const initialState: AuthState = {
  loggedUser: null,
  authError: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: IUser; accessToken: string; refreshToken: string }>) => {
      const { payload } = action;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      state.loggedUser = payload.user;
    },
    logout: (state) => {
      localStorage.clear();
      state.loggedUser = null;
    },
    authFailed: (state, action: PayloadAction<{ error: any }>) => {
      state.authError = action.payload.error.message;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
