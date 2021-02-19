import React from "react";
import { Dimensions, FlatList, StatusBar, StyleSheet, View } from "react-native";
import { IChallenge } from "../../interfaces/Challenge";
import { VideoPlayer } from "../shared/VideoPlayer";

interface ChallengesProps {
  challenges: IChallenge[];
}

export const HomeScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  // const videoRefs = useRef([]);

  // const onViewableItemsChanged = ({ viewableItems, changed }) => {
  //   changed.forEach((item) => {
  //     if (!item.isViewable) {
  //       videoRefs[item.id].pauseVideo();
  //     }
  //   });
  //   viewableItems.forEach((item) => {
  //     if (item.isViewable) {
  //       videoRefs[item.id].playVideo();
  //     }
  //   });
  // };

  const renderChallengeVideo = (challenge: IChallenge) => {
    const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
    return (
      <View style={styles.container}>
        <VideoPlayer style={styles.video} uri={videoURL} />
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={({ item, index }) => renderChallengeVideo(item)}
        keyExtractor={(challenge) => challenge._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
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
