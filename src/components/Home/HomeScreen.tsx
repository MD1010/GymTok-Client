import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IChallenge } from "../../interfaces/Challenge";
import { ChallengePost } from "../ChallengePost/ChallengePost";

interface ChallengesProps {
  challenges: IChallenge[];
}

export const HomeScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const scrollEnded = useRef<boolean>(false);
  const navigation = useNavigation();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setNavigatedOutOfScreen(true);
    });
    return () => {
      navigation.removeListener("blur", null);
    };
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setNavigatedOutOfScreen(false);
    });
    return () => {
      navigation.removeListener("focus", null);
    };
  }, [navigation]);

  // track view changes in order to control when video is starting to play
  const onViewRef = useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={({ item, index }) => (
          <ChallengePost challenge={item} isVideoPlaying={index === currentlyPlaying && !navigatedOutOfScreen} />
        )}
        keyExtractor={(challenge) => challenge._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewRef.current}
        onScrollEndDrag={() => (scrollEnded.current = true)}
        onScrollBeginDrag={() => (scrollEnded.current = false)}
      ></FlatList>
    </SafeAreaView>
  );
};
