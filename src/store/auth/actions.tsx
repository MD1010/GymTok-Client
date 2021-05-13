import AsyncStorage from "@react-native-community/async-storage";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { authActions } from "./authSlice";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { notificationsActions } from "../notifications/notificationsSlice";
import { getUserNotifications, setPushToken } from "../notifications/actions";

export const register = (username: string, fullName: string, password: string, email: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const registerEnpoint = `${process.env.BASE_API_ENPOINT}/users/register`;
    const body = { username, fullName, password, email };
    dispatch(authActions.resetAuthError());
    const { res, error } = await fetchAPI(RequestMethod.POST, registerEnpoint, body);
    if (res) {
      dispatch(authActions.login(res));
    } else {
      dispatch(authActions.authFailed({ error }));
    }
  };
};
export const login = (username: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    console.log("mother ... ", process.env.BASE_API_ENPOINT);
    const registerEnpoint = `${process.env.BASE_API_ENPOINT}/users/login`;

    const body = { username, password };
    dispatch(authActions.resetAuthError());
    const { res, error } = await fetchAPI(RequestMethod.POST, registerEnpoint, body);
    if (res) {
      dispatch(authActions.login(res));
      dispatch(getUserNotifications(res.user._id));
      // await setPushToken(res.user._id);
    } else {
      dispatch(authActions.authFailed({ error }));
    }
  };
};

export const logout = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch(authActions.logout());
  };
};

export const loadLoggedUser = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const user = JSON.parse(await AsyncStorage.getItem("loggedUser"));
    dispatch(authActions.loadLoggedUser(user));
  };
};

export const registerIfNeed = (
  username: string,
  password: string,
  fullName: string,
  email: string,
  photoUrl: string
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const registerIfNeedEnpoint = `${process.env.BASE_API_ENPOINT}/users/registerIfNeed`;

    const body = { email, username, password, fullName, photoUrl };

    dispatch(authActions.resetAuthError());
    const { res, error } = await fetchAPI(RequestMethod.POST, registerIfNeedEnpoint, body);

    if (res) {
      dispatch(
        authActions.signWith({
          user: res.user,
          accessToken: res.accessToken,
          photoUrl,
        })
      );
    } else {
      dispatch(authActions.authFailed({ error }));
    }
  };
};
