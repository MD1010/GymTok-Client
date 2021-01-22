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
  username: null,
  fullname: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      AsyncStorage.setItem('accessToken', payload.accessToken);
      AsyncStorage.setItem('refreshToken', payload.refreshToken);
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
