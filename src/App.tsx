import { Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Expo from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { AppState, Image, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { MainNavigator } from "./components/Navigation/StackNavigator";
import { loadLoggedUser } from "./store/auth/actions";
import { store } from "./store/configureStore";
import * as Notifications from "expo-notifications";
import { getNotificationRecieved, getUserNotifications, setPushToken } from "./store/notifications/actions";
import { setNotificationHandler } from "./components/Notifications/NotificationHandler";
import { INotification } from "./interfaces/Notification";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

const downloadAssets = async () => {
  await store.dispatch(loadLoggedUser());
  const imageAssets = cacheImages([
    require("../assets/avatar/01.jpg"),
    require("../assets/avatar/02.jpg"),
    require("../assets/avatar/user.png"),
    require("../assets/icons/profile.png"),
    require("../assets/icons/comment.png"),
    require("../assets/icons/like.png"),
    require("../assets/icons/facebook.png"),
    require("../assets/icons/google.png"),
    require("../assets/loader.gif"),
  ]);

  const FontAwesomefontAssets = cacheFonts([FontAwesome.font]);
  const FontAwesome5fontAssets = cacheFonts([FontAwesome5.font]);
  const IoniconsfontAssets = cacheFonts([Ionicons.font]);
  const FeatherfontAssets = cacheFonts([Feather.font]);
  const FontistofontAssets = cacheFonts([Fontisto.font]);
  const MaterialIconsfontAssets = cacheFonts([MaterialIcons.font]);
  await Promise.all([
    ...imageAssets,
    ...FontAwesomefontAssets,
    ...FontAwesome5fontAssets,
    ...IoniconsfontAssets,
    ...FeatherfontAssets,
    ...MaterialIconsfontAssets,
    ...FontistofontAssets,
  ]);
};

const addNotificationsListener = () => {
  console.log("registering notification listener!!");

  Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
    const { data, body, title } = notification.request.content;
    const { _id, date, sender, ...props } = data as any;
    const notificationReceived: INotification = {
      _id,
      body,
      title,
      data: props,
      date,
      sender,
      isRead: false,
    };
    console.log("received", notificationReceived._id);

    // todo patch for ios - for some reason handler triggered twice
    const x = store.getState().notifications.receivedNotifications.find((x) => x._id === notificationReceived._id);
    if (!x) store.dispatch(getNotificationRecieved(notificationReceived));
  });
};

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const loggedUser = store.getState().auth.loggedUser;
  const notificationErrors = store.getState().notifications.error;

  useEffect(() => {
    notificationErrors && alert(notificationErrors);
  }, [notificationErrors]);

  useEffect(() => {
    (async function () {
      try {
        setNotificationHandler();
        await SplashScreen.preventAutoHideAsync();
        await downloadAssets();
        setIsAppReady(true);
        setTimeout(async () => await SplashScreen.hideAsync(), 800);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  useEffect(() => {
    const userId = loggedUser?._id;
    if (userId) {
      setPushToken(userId);

      addNotificationsListener();
      store.dispatch(getUserNotifications(userId));
    }
  }, [loggedUser]);

  return (
    isAppReady && (
      <Provider store={store}>
        <StatusBar animated barStyle={"light-content"} />
        <MainNavigator />
      </Provider>
    )
  );
}

export default Expo.registerRootComponent(App);
