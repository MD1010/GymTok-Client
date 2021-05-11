import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../interfaces/Notification";
import { IUser } from "../../interfaces/User";
import { RootState } from "../configureStore";

export interface NotificationsState {
  receivedNotifications: INotification[];
  isLoading: boolean;
  error: string;
  lastDeletedNotification: { index: number; notification: INotification };
}
export const initialState: NotificationsState = {
  receivedNotifications: [],
  isLoading: false,
  error: null,
  lastDeletedNotification: null,
};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationActionFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getNotificationsSuccess: (state, action: PayloadAction<INotification[]>) => {
      state.receivedNotifications = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    deleteUserNotification: (state, action: PayloadAction<INotification>) => {
      const notification = action.payload;
      const index = state.receivedNotifications.indexOf(notification);
      state.lastDeletedNotification = { index, notification };
      state.receivedNotifications.splice(state.receivedNotifications.indexOf(notification), 1);
    },
    deleteUserNotificationFailed: (state, action: PayloadAction<INotification>) => {
      const { index, notification } = state.lastDeletedNotification;
      state.receivedNotifications.splice(index, 0, notification);
    },
    deleteAllNotificationsSuccess: (state, action: PayloadAction<INotification>) => {
      state.receivedNotifications = [];
    },
    markNotificationReadSuccess: (state, action: PayloadAction<INotification>) => {
      for (const notification of state.receivedNotifications) {
        if (notification._id === action.payload._id) {
          notification.isRead = true;
        }
      }
    },
    getLatestNotificationSuccess: (state, action: PayloadAction<INotification>) => {
      state.receivedNotifications.push(action.payload);
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificaitonsSelector = (state: RootState) => state.notifications;
export const unreadNotificationsSelector = (state: RootState) =>
  state.notifications.receivedNotifications.filter((x) => !x.isRead);

export default notificationsSlice.reducer;
