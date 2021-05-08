// import AsyncStorage from "@react-native-community/async-storage";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { INotification } from "../../interfaces/AppNotification";
// import { IUser } from "../../interfaces/User";
// import { RootState } from "../configureStore";

// export interface NotificationsState {
//   userNotifications: INotification[];
//   isLoading: boolean;
//   error: string;
// }
// export const initialState: NotificationsState = {
//   loggedUser: undefined,
//   authError: null,
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ user: IUser; accessToken: string; refreshToken: string }>) => {
//       const { payload } = action;
//       AsyncStorage.setItem("accessToken", payload.accessToken);
//       AsyncStorage.setItem("refreshToken", payload.refreshToken);
//       AsyncStorage.setItem("loggedUser", JSON.stringify(payload.user));
//       state.loggedUser = payload.user;
//       state.authError = null;
//     },
//     signWith: (state, action: PayloadAction<{ user: IUser; accessToken: string; photoUrl: string }>) => {
//       const { payload } = action;
//       AsyncStorage.setItem("accessToken", payload.accessToken);
//       AsyncStorage.setItem("photoUrl", payload.photoUrl);
//       AsyncStorage.setItem("loggedUser", JSON.stringify(payload.user));
//       state.loggedUser = payload.user;
//       state.authError = null;
//     },
//     logout: (state) => {
//       AsyncStorage.clear();
//       state.authError = null;
//       state.loggedUser = null;
//     },
//     authFailed: (state, action: PayloadAction<{ error: any }>) => {
//       state.authError = action.payload.error.message;
//     },
//     resetAuthError: (state) => {
//       state.authError = null;
//     },
//     loadLoggedUser: (state, action: PayloadAction<IUser>) => {
//       state.loggedUser = action.payload;
//     },
//   },
// });

// export const authActions = authSlice.actions;
// export const authSelector = (state: RootState) => state.auth;

// export default authSlice.reducer;
