import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, View } from "react-native";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Challenge } from "../Challenge/Challenge";
import { UIConsts } from "../shared/styles/variables";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";

export const HomeScreen: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const isMounted = useRef(true);
  const scrollEnded = useRef<boolean>(false);
  const navigation = useNavigation();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const { loggedUser } = useSelector(authSelector);
  const itemsToLoad = 10;
  const [error, setError] = useState<string | null>();
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;

  const getChallenges = async () => {
    if (!loggedUser) {
      getExistChallenges();
    } else {
      getRecommendedChallenges();
    }
  };

  const getRecommendedChallenges = async () => {
    const { res, error } = await fetchAPI(
      RequestMethod.GET,
      `${process.env.BASE_API_ENPOINT}/users/${loggedUser?.username}/recommendedChallenges`,
      null,
      {
        size: itemsToLoad,
        page: challenges.length / itemsToLoad,
      }
    );
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  const getExistChallenges = async () => {
    console.log("fetching more.....", challengesEndpoint);
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
    });
    console.log(error);
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  useEffect(() => {
    error && alert(error);
  }, [error]);

  useEffect(() => {
    getChallenges();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setNavigatedOutOfScreen(true);
    });
    navigation.addListener("focus", () => {
      setNavigatedOutOfScreen(false);
    });
    return () => {
      navigation.removeListener("blur", null);
      navigation.removeListener("focus", null);
    };
  }, [navigation]);

  // track view changes in order to control when video is starting to play
  const onViewRef = useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging

    // scrollEnded.current && console.log(viewableItems);
    console.log("playing", viewableItems[0]?.index);
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const renderItem = ({ item, index }) => (
    <Challenge challenge={item} isVideoPlaying={index === currentlyPlaying && !navigatedOutOfScreen} />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(challenge, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height - UIConsts.bottomNavbarHeight}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewRef.current}
        onScrollEndDrag={() => (scrollEnded.current = true)}
        onScrollBeginDrag={() => (scrollEnded.current = false)}
        onEndReached={getChallenges}
        onEndReachedThreshold={3}
        ListFooterComponent={() => (challenges.length ? <Text>Loading more..</Text> : null)}
      ></FlatList>
    </View>
  );
};
