import * as Expo from "expo";
import React, { useCallback, useEffect, useState } from "react";
// import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StatusBar, Text,View,Image } from "react-native";
import { Provider, useDispatch,useSelector } from "react-redux";
import { MainNavigator } from "./components/Navigation/StackNavigator";
import { loadLoggedUser } from "./store/auth/actions";
import { store } from "./store/configureStore";
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import { preventAutoHide } from "expo-splash-screen";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { FontAwesome } from '@expo/vector-icons';
import { getMorePosts, getMostRecommended, getUserPosts } from "./store/posts/actions";
import { authSelector } from "./store/auth/authSlice";

// const { loggedUser } = useSelector(authSelector);

// function getPosts(){
//   if (loggedUser) {
//     store.dispatch(getMostRecommended());
//   } else {
//     // loggedUser is null -> didnt log in yet
//     store.dispatch(getMorePosts());
//   }
// }

function cacheImages(images) {
  console.log(images.length)
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}


function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={prepare}
        onFinish={() => { setAppIsReady(true)}}
        onError={console.warn}
      />
    ); }

  // useEffect(() => {
  //   async function prepare(){
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       await store.dispatch(loadLoggedUser());
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (error) {
  //       console.warn(error);
  //     } finally{
  //       setAppIsReady(true)
  //     }
  //   } 

  //   prepare()
  // }, []);

async function prepare(){
  console.log('dispatch logged user')
  await store.dispatch(loadLoggedUser())
  await store.dispatch(getMorePosts());
  const imageAssets = cacheImages([
    require('../assets/avatar/01.jpg'),
    require('../assets/avatar/02.jpg'),
    require('../assets/icons/checked.png'),
    require('../assets/icons/checked.png'),
    require('../assets/icons/checked.png'),
    require('../assets/icons/checked.png'),
    require('../assets/icons/checked.png'),
    require('../assets/icons/comment.png'),
    require('../assets/icons/like.png')
  ]);

  const fontAssets = cacheFonts([FontAwesome.font]);

  await Promise.all([...imageAssets, ...fontAssets]);
}

  return (
      <Provider store={store}>
        <StatusBar animated barStyle={"light-content"} />
        <MainNavigator />
      </Provider>
     
  );
}

export default Expo.registerRootComponent(App);

//CODE OF MASTER
// import * as Expo from "expo";
// import React, { useEffect } from "react";
// import { StatusBar } from "react-native";
// import { Provider, useDispatch } from "react-redux";
// import { MainNavigator } from "./components/Navigation/StackNavigator";
// import { loadLoggedUser } from "./store/auth/actions";
// import { store } from "./store/configureStore";

// function App() {
//   useEffect(() => {
//     store.dispatch(loadLoggedUser());
//   }, []);
//   return (
//     <Provider store={store}>
//       <StatusBar animated barStyle={"light-content"} />
//       <MainNavigator />
//     </Provider>
//   );
// }

// export default Expo.registerRootComponent(App);

