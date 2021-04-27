import * as Expo from "expo";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, Text,View,Image } from "react-native";
import { Provider, useDispatch,useSelector } from "react-redux";
import { MainNavigator } from "./components/Navigation/StackNavigator";
import { loadLoggedUser } from "./store/auth/actions";
import { store } from "./store/configureStore";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Feather, Fontisto , MaterialIcons,Ionicons,FontAwesome ,FontAwesome5} from '@expo/vector-icons';
import { getMorePosts, getMostRecommended, getUserPosts } from "./store/posts/actions";

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
  fonts.map(font => console.log(font));
  return fonts.map(font => Font.loadAsync(font));
}

function App() {
  const loggedUser = store.getState().auth.loggedUser;

  const [appIsReady, setAppIsReady] = useState(false);

  const getPosts = async () => {
    if (loggedUser) {
      await store.dispatch(getMostRecommended()) ;
    } else {
      // loggedUser is null -> didnt log in yet
      await store.dispatch(getMorePosts());
    }
  };

  useEffect(() => {
    // check if user was loaded - undefinded means the store has not been updated yet.
    if (loggedUser !== undefined) {
      getPosts();
    }
  }, [loggedUser]);


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
  const FontAwesome5fontAssets = cacheFonts([FontAwesome5.font]);
  const IoniconsfontAssets = cacheFonts([Ionicons.font]);
  const FeatherfontAssets = cacheFonts([Feather.font]);
  const FontistofontAssets = cacheFonts([Fontisto.font]);
  const MaterialIconsfontAssets = cacheFonts([MaterialIcons.font]);
  await Promise.all([...imageAssets,
                    ...FontAwesomefontAssets,
                    ...FontAwesome5fontAssets ,
                    ...IoniconsfontAssets,
                    ...FeatherfontAssets,
                    ...MaterialIconsfontAssets,
                    ...FontistofontAssets, 
                    getPosts()
                  ]);
}

  return (
      <Provider store={store}>
        <StatusBar animated barStyle={"light-content"} />
        <MainNavigator />
      </Provider>
     
  );
}

export default Expo.registerRootComponent(App);

