import React, { useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, StyleSheet, View } from "react-native";
import { IChallenge } from "../../interfaces/Challenge";
import { VideoPlayer } from "../shared/VideoPlayer";

interface ChallengesProps {
  challenges: IChallenge[];
}

export const HomeScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  const videoRefs = useRef([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const scrollEnded = useRef<boolean>(false);

  const renderChallengeVideo = (challenge: IChallenge, videoIndex: number) => {
    const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;

    return (
      <View style={styles.container}>
        <VideoPlayer
          style={styles.video}
          uri={videoURL}
          isPlaying={videoIndex === currentlyPlaying}
          resizeMode="cover"
        />
      </View>
    );
  };

  // track view changes in order to control when video is starting to play
  const onViewRef = React.useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={({ item, index }) => renderChallengeVideo(item, index)}
        keyExtractor={(challenge) => challenge._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewRef.current}
        onScrollEndDrag={() => (scrollEnded.current = true)}
        onScrollBeginDrag={() => (scrollEnded.current = false)}
      ></FlatList>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
