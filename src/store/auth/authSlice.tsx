import localStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

export interface AuthState {
  loggedUser: User | null;
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
    login: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
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
export const authSelector = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
