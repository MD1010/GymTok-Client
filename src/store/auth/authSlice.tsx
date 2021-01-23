import asyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  username: null;
  fullname: null;
  authError: null;
}
export const initialState: AuthState = {
  username: null,
  fullname: null,
  authError: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // todo change name
    login: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      asyncStorage.setItem("accessToken", payload.accessToken);
      asyncStorage.setItem("refreshToken", payload.refreshToken);
      state.fullname = payload.fullName;
      state.username = payload.username;
    },
    logout: (state) => {
      asyncStorage.clear();
      state.fullname = null;
      state.username = null;
    },
    authFail: (state, action: PayloadAction<any>) => {
      state.authError = action.payload.error;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
