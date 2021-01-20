import axois from 'axios';
import setAuthToken from '../utils/setAuthToken';
import AsyncStorage from '@react-native-community/async-storage';
// import  NavigationService  from "../navigationService";


import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

export const loadUser = () => async (dispatch) => {
  if (AsyncStorage.token) {
    setAuthToken(AsyncStorage.token);
  }

  try {
    const res = await axois.get('http://453e69b4ff60.ngrok.io/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ( username, fullName, password ) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };


  const body = JSON.stringify({username, fullName, password});
  try {
    const res = await axois.post('https://453e69b4ff60.ngrok.io/Users/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    navigate('login');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach((e) => {
      //   dispatch(setAlert(e.msg, 'danger'));
      // });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const body = JSON.stringify({ username, password });
  try {
    const res = await axois.post('https://453e69b4ff60.ngrok.io/Users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });


  } catch (err) {

    if (err) {
      console.log(err);
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
