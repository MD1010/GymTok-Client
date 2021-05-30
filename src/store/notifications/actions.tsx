import * as Notifications from "expo-notifications";
import { getTokenAfterPermissionGrant } from "../../components/Notifications/NotificationHandler";
import { INotification } from "../../interfaces/Notification";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { notificationsActions } from "./notificationsSlice";
import * as config from "../../config.json"

export const setPushToken = async (userId: string) => {
  const pushTokenAPI = `${config.BASE_API_ENPOINT}/notifications/pushToken`;
  const token = await getTokenAfterPermissionGrant();

  const { error } = await fetchAPI(RequestMethod.PUT, pushTokenAPI, {
    userId,
    token,
  });
  if (error) alert(error);
};

export const unregisterFromNotifications = async (userId: string) => {
  const pushTokenAPI = `${config.BASE_API_ENPOINT}/notifications/pushToken`;
  const token = await getTokenAfterPermissionGrant();

  const { error } = await fetchAPI(RequestMethod.DELETE, pushTokenAPI, {
    userId,
    token,
  });
  if (error) alert(error);
};

export const getUserNotifications = (userId: string): AppThunk => {
  const notificationsAPI = `${config.BASE_API_ENPOINT}/notifications`;
  return async (dispatch: AppDispatch) => {
    const { res, error } = await fetchAPI(RequestMethod.GET, notificationsAPI, null, {
      uid: userId,
    });
    if (res) {
      dispatch(notificationsActions.getNotificationsSuccess(res));
    } else {
      dispatch(notificationsActions.notificationActionFail(error));
    }
  };
};

export const getNotificationRecieved = (notification: INotification): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(notificationsActions.getLatestNotificationSuccess(notification));
  };
};

export const sendNotification = async (notificationPayload: INotification) => {
  const notificationsAPI = `${config.BASE_API_ENPOINT}/notifications/send`;
  const { res, error } = await fetchAPI(RequestMethod.POST, notificationsAPI, notificationPayload);
  if (error) alert(JSON.stringify(error));
};

export const deleteUserNotifications = (userId: string): AppThunk => {
  const notificationsAPI = `${config.BASE_API_ENPOINT}/notifications/${userId}`;
  return async (dispatch: AppDispatch) => {
    const { res, error } = await fetchAPI(RequestMethod.DELETE, notificationsAPI);
    if (res) {
      dispatch(notificationsActions.deleteAllNotificationsSuccess(res));
    } else {
      dispatch(notificationsActions.notificationActionFail(error));
    }
  };
};

export const deleteNotification = (notification: INotification, userId: string): AppThunk => {
  const notificationsAPI = `${config.BASE_API_ENPOINT}/notifications/${notification._id}/${userId}`;
  return async (dispatch: AppDispatch) => {
    dispatch(notificationsActions.deleteUserNotification(notification));
    const { res, error } = await fetchAPI(RequestMethod.DELETE, notificationsAPI);

    if (error) {
      dispatch(notificationsActions.deleteUserNotificationFailed(notification));
      dispatch(notificationsActions.notificationActionFail(error));
    }
  };
};

export const markNotificationAsRead = (notification: INotification, userId: string): AppThunk => {
  const notificationsAPI = `${config.BASE_API_ENPOINT}/notifications/${notification._id}/${userId}`;
  return async (dispatch: AppDispatch) => {
    if (notification.isRead) return;
    const { res, error } = await fetchAPI(RequestMethod.PUT, notificationsAPI);
    if (res) {
      dispatch(notificationsActions.markNotificationReadSuccess(res));
    } else {
      dispatch(notificationsActions.notificationActionFail(error));
    }
  };
};
