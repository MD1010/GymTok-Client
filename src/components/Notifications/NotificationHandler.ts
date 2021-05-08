import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Text, View, Button, Platform, AppState } from "react-native";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";

async function registerForPushNotificationsAsync() {
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

export const setPushToken = async (userId: string) => {
  const pushTokenAPI = `${process.env.BASE_API_ENPOINT}/notifications/pushToken`;
  const token = await registerForPushNotificationsAsync();
  console.log("token", token);
  console.log("userId", userId);

  const { error } = await fetchAPI(RequestMethod.PUT, pushTokenAPI, {
    userId,
    token,
  });
  if (error) alert(error);
};

export const registerNotificationListener = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: AppState.currentState != "active" ? true : false,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
    console.log("notification recieved", notification);
  });
};
