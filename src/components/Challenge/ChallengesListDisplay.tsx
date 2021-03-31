import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View, Text } from "react-native";
import { IChallenge } from "../../interfaces";
import { UIConsts } from "../shared/styles/variables";
import { Challenge } from "./Challenge";

interface ChallengesListDisplayProps {
  challenges: IChallenge[];
  getChallenges: () => any;
  currentIndexVideo?: number;
}

export const ChallengesListDisplay: React.FC<ChallengesListDisplayProps> = ({
  challenges,
  getChallenges,
  currentIndexVideo,
}) => {
  const navigation = useNavigation();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
  const scrollEnded = useRef<boolean>(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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

  useEffect(() => {
    if (challenges.length > 0) {
      goIndex(currentIndexVideo);
    }
  }, [challenges, currentIndexVideo]);

  // track view changes in order to control when video is starting to play
  const onViewRef = useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging

    // scrollEnded.current && console.log(viewableItems);
    console.log("playing", viewableItems[0]?.index);
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const goIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };

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
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        onScrollToIndexFailed={() => alert("no such index")}
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
