import { Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Expo from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Image, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { MainNavigator } from "./components/Navigation/StackNavigator";
import { loadLoggedUser } from "./store/auth/actions";
import { store } from "./store/configureStore";
import * as Notifications from "expo-notifications";
import { registerNotificationListener, setPushToken } from "./components/Notifications/NotificationHandler";

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

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const loggedUser = store.getState().auth.loggedUser;
  // Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
  //   console.log("notification recieved", notification);

  //   // setNotification(notification);
  // });

  useEffect(() => {
    (async function () {
      try {
        registerNotificationListener();
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
    loggedUser?._id && setPushToken(loggedUser._id);
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
