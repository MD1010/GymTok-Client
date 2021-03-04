import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, View } from "react-native";
import { IChallenge } from "../../interfaces/Challenge";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Challenge } from "../Challenge/Challenge";
import { UIConsts } from "../shared/styles/variables";

interface ChallengesProps {
  challenges: IChallenge[];
}

export const HomeScreen: React.FC<ChallengesProps> = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const scrollEnded = useRef<boolean>(false);
  const navigation = useNavigation();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const itemsToLoad = 5;
  const [error, setError] = useState<string | null>();
  const challengesEndpoint = `http://192.168.0.107:8080/challenges`;

  const fetchChallenges = async () => {
    console.log("fetching more...");
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
    });
    console.log("now the challenges are ", res);
    res && setChallenges([...challenges, ...res]);
    error && setError(error);
  };
  useEffect(() => {
    error && alert(error);
  }, [error]);

  useEffect(() => {
    fetchChallenges();
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
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const renderItem = useCallback(
    ({ item, index }) => (
      <Challenge challenge={item} isVideoPlaying={index === currentlyPlaying && !navigatedOutOfScreen} />
    ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <FlatList
        data={challenges}
        renderItem={renderItem}
        keyExtractor={(challenge) => challenge._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height - UIConsts.bottomNavbarHeight}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewRef.current}
        onScrollEndDrag={() => (scrollEnded.current = true)}
        onScrollBeginDrag={() => (scrollEnded.current = false)}
        getItemLayout={(_data, index) => ({
          length: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
          offset: Dimensions.get("window").height - UIConsts.bottomNavbarHeight * index,
          index,
        })}
        onEndReached={fetchChallenges}
        onEndReachedThreshold={0.3}
      ></FlatList>
    </View>
  );
};
