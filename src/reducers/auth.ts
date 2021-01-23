// import asyncStorage from "@react-native-community/async-storage";
// import {
//   AUTH_ERROR,
//   LOGIN_FAIL,
//   LOGIN_SUCCESS,
//   LOGOUT,
//   REGISTER_FAIL,
//   REGISTER_SUCCESS,
//   USER_LOADED,
// } from "../actions/types";

// const initialState = {
//   username: null,
//   fullname: null,
// };

// export default function (state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case LOGIN_SUCCESS:
//     case REGISTER_SUCCESS:
//       asyncStorage.setItem("accessToken", payload.accessToken);
//       asyncStorage.setItem("refreshToken", payload.refreshToken);
//       return {
//         ...state,
//         ...payload,
//         username: payload.username ? payload.username : null,
//         fullname: payload.fullname ? payload.fullname : null,
//       };
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case REGISTER_FAIL:
//     case LOGOUT:
//       asyncStorage.removeItem("token");
//       return initialState;
//     case USER_LOADED:
//       return {
//         ...state,
//         user: payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }
