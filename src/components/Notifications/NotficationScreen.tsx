import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, AppState } from "react-native";
// import { Linking } from 'react-native';

// Notifications.addNotificationResponseReceivedListener(console.log);

export const NotificationScreen = () => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState<Notifications.Notification>();
  // const notificationListener = useRef<any>();
  // const responseListener = useRef<any>();
  // const navigation = useNavigation();

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    // console.log("IN notifications screen mount!!");

    // This listener is fired whenever a notification is received while the app is foregrounded

    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log(response);
    // });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)

    return () => {
      //   Notifications.removeNotificationSubscription(notificationListener.current);
      //   Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View></View>
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "space-around",
    //   }}
    // >
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: "center", justifyContent: "center" }}>
    //     <Text>Title: {notification && notification.request.content.title} </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    //   </View>
    //   {/* <Button
    //     title="Press to Send Notification"
    //     onPress={async () => {
    //       await sendPushNotification(expoPushToken);
    //     }}
    //   /> */}
    // </View>
  );
};

// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }
