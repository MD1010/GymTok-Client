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
import { Feather, Fontisto , MaterialIcons,Ionicons,FontAwesome ,FontAwesome5} from '@expo/vector-icons';
import { getMorePosts, getMostRecommended, getUserPosts } from "./store/posts/actions";
import { authSelector } from "./store/auth/authSlice";

function cacheImages(images) {
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

  const getPosts = async () => {
    let loggedUser = store.getState().auth.loggedUser//= useSelector(authSelector);
    console.log(loggedUser);
    if (loggedUser) {
      await store.dispatch(getMostRecommended()) ;
    } else {
      // loggedUser is null -> didnt log in yet
      await store.dispatch(getMorePosts());
    }
  };
  // useEffect(() => {
  //   // check if user was loaded - undefinded means the store has not been updated yet.
  //   if (loggedUser !== undefined) {
  //     getPosts();
  //   }
  // }, [loggedUser]);


  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={prepare}
        onFinish={() => { setAppIsReady(true)}}
        onError={console.warn}
      />
    ); }


async function prepare(){
  await store.dispatch(loadLoggedUser())
  console.log('Assest');
  const imageAssets = cacheImages([
    require('../assets/avatar/01.jpg'),
    require('../assets/avatar/02.jpg'),
    require('../assets/avatar/user.png'),
    require('../assets/icons/profile.png'),
    require('../assets/icons/comment.png'),
    require('../assets/icons/like.png'),
    require('../assets/icons/facebook.png'),
    require('../assets/icons/google.png'),
    require('../assets/loader.gif')
  ]);
  const FontAwesomefontAssets = cacheFonts([FontAwesome.font]);
  const FontAwesome5fontAssets = cacheFonts([FontAwesome.font]);
  const IoniconsfontAssets = cacheFonts([Ionicons.font]);
  const FeatherfontAssets = cacheFonts([Feather.font]);
  const FontistofontAssets = cacheFonts([Fontisto.font]);
  const MaterialIconsfontAssets = cacheFonts([MaterialIcons.font]);
  // Feather, Fontisto , MaterialIcons
  await Promise.all([...imageAssets,...FontAwesomefontAssets,...FontAwesome5fontAssets ,...IoniconsfontAssets,...FeatherfontAssets,...MaterialIconsfontAssets,...FontistofontAssets,getPosts()]);
  console.log('finished all render');
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

