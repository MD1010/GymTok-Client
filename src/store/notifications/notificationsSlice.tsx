import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../interfaces/AppNotification";
import { IUser } from "../../interfaces/User";
import { RootState } from "../configureStore";

export interface NotificationsState {
  notifications: INotification[];
  isLoading: boolean;
  error: string;
}
export const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
  error: null,
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
      state.notifications = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    deleteUserNotificationSuccess: (state, action: PayloadAction<INotification>) => {
      state.notifications.filter((n) => n._id !== action.payload._id);
    },
    deleteAllNotificationsSuccess: (state, action: PayloadAction<INotification>) => {
      state.notifications = [];
    },
    markNotificationReadSuccess: (state, action: PayloadAction<INotification>) => {
      for (const notification of state.notifications) {
        if (notification._id === action.payload._id) {
          notification.isRead = true;
        }
      }
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export const notificaitonsSelector = (state: RootState) => state.notifications;

export default notificationsSlice.reducer;
