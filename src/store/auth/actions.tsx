import { BASE_API_ENPOINT } from "../../consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { authActions } from "./authSlice";

export const register = (username: string, fullName: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const registerEnpoint = `${BASE_API_ENPOINT}/users/register`;
    const body = { username, fullName, password };
    const { res, error } = await fetchAPI(RequestMethod.POST, registerEnpoint, body);
    res ? dispatch(authActions.login(res.data)) : error && dispatch(authActions.authFailed({ error }));
  };
};
export const login = (username: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const registerEnpoint = `${BASE_API_ENPOINT}/users/login`;
    const body = { username, password };
    const { res, error } = await fetchAPI(RequestMethod.POST, registerEnpoint, body);
    res ? dispatch(authActions.login(res.data)) : error && dispatch(authActions.authFailed({ error }));
  };
};

export const logout = (dispatch: AppDispatch) => {
  dispatch(authActions.logout());
};
