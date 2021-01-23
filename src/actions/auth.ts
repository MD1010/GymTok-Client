import api from '../api/api';


import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';


// Register user
export const register = ( username, fullName, password ) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };


  const body = JSON.stringify({username, fullName, password});
  try {
    const res = await api.post('/Users/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    return '';

  } catch (err) {

    dispatch({
      type: REGISTER_FAIL,
    });

    return err;
  }
};

// Login user
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const body = JSON.stringify({ username, password });
  try {
    const res = await api.post('/Users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    return '';
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });

    return err;
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
