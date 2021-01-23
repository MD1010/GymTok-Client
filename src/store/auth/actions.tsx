import api from "../../api/api";
import { AppDispatch, AppThunk } from "../configureStore";
import { authActions } from "./authSlice";

export const register = (username: string, fullName: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    // todo - make generic request with erro handling and remove try catch from here.
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ username, fullName, password });

    try {
      const res = await api.post("/Users/register", body, config);
      dispatch(authActions.login(res.data));
    } catch (err) {
      dispatch(authActions.authFail(err));
    }
  };
};
export const login = (username: string, password: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    // todo - make generic request with erro handling and remove try catch from here.
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ username, password });
    try {
      const res = await api.post("/Users/login", body, config);
      dispatch(authActions.login(res.data));
      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   payload: res.data,
      // });

      // return "";
    } catch (err) {
      dispatch(authActions.authFail(err));
      // dispatch({
      //   type: LOGIN_FAIL,
      // });

      // return err;
    }
  };
};

export const logout = (dispatch: AppDispatch) => {
  dispatch(authActions.logout());
};
