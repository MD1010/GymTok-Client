import AsyncStorage from '@react-native-community/async-storage';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types';

const initialState = {
  token: AsyncStorage.getItem('token'),
  username: null,
  fullname: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      AsyncStorage.setItem('token', payload.accessToken);
      return {
        ...state,
        ...payload,
        username: payload.username ? payload.username : null,
        fullname: payload.fullname ? payload.fullname : null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      AsyncStorage.removeItem('token');
      return initialState;
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}
