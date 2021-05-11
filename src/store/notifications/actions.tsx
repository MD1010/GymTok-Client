import { registerForPushNotificationsAsync } from "../../components/Notifications/NotificationHandler";
import { INotification } from "../../interfaces/Notification";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { notificationsActions } from "./notificationsSlice";

export const setPushToken = async (userId: string) => {
  const pushTokenAPI = `${process.env.BASE_API_ENPOINT}/notifications/pushToken`;
  const token = await registerForPushNotificationsAsync();

  const { error } = await fetchAPI(RequestMethod.PUT, pushTokenAPI, {
    userId,
    token,
  });
  if (error) alert(error);
};

export const getUserNotifications = (userId: string): AppThunk => {
  const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications`;
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
  // const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications/${notificationId}/${userId}`;
  return async (dispatch: AppDispatch) => {
    // const { res, error } = await fetchAPI(RequestMethod.GET, notificationsAPI);
    // if (res) {
    dispatch(notificationsActions.getLatestNotificationSuccess(notification));
    // } else {
    // dispatch(notificationsActions.notificationActionFail(error));
    // }
  };
};

export const sendNotification = async (notificationPayload: INotification) => {
  const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications/send`;
  const { res, error } = await fetchAPI(RequestMethod.POST, notificationsAPI, notificationPayload);
  if (error) alert(error);
};

export const deleteUserNotifications = (userId: string): AppThunk => {
  const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications/${userId}`;
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
  const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications/${notification._id}/${userId}`;
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
  const notificationsAPI = `${process.env.BASE_API_ENPOINT}/notifications/${notification._id}/${userId}`;
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
