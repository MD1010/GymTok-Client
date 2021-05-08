import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { AppState, Platform } from "react-native";
import { AppDispatch } from "../../store/configureStore";
import { getNotificationRecieved, getUserNotifications } from "../../store/notifications/actions";

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export const registerNotificationListener = (dispatch: AppDispatch, userId: string) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: AppState.currentState != "active" ? true : false,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
    const notificationId = notification.request.content.data?.notificationId as string;
    dispatch(getNotificationRecieved(notificationId, userId));
  });
};
