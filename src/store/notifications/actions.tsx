import AsyncStorage from "@react-native-community/async-storage";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { INotification } from "../../interfaces/AppNotification";

export const sendNotification = (notificationPayload: INotification): AppThunk => {
  return async (dispatch: AppDispatch) => {};
};
export const setPushToken = (userId: string, token: string): AppThunk => {
  return async (dispatch: AppDispatch) => {};
};

export const deleteUserNotifications = (userId: string): AppThunk => {
  return (dispatch: AppDispatch) => {};
};

export const deleteNotification = (notificationId: string, userId: string): AppThunk => {
  return async (dispatch: AppDispatch) => {};
};

export const markNotificationAsRead = (notificationId: string, userId: string): AppThunk => {
  return async (dispatch: AppDispatch) => {};
};
