import React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { UIConsts } from "../shared/styles/variables";
import VideoPlayer from "expo-video-player";

interface PublishScreenProps {
  uri: string;
}

export const VideoScreen: React.FC<PublishScreenProps> = ({ uri }) => {
  const video = React.useRef(null);

  return (
    <VideoPlayer
      height={Platform.OS === "android" ? Dimensions.get("screen").height - 249 : Dimensions.get("screen").height - 220}
      showFullscreenButton={false}
      videoProps={{
        shouldPlay: false,
        resizeMode: ResizeMode.COVER,
        source: {
          uri: uri,
        },
      }}
      inFullscreen={false}
    />
    // <View style={styles.container}>
    //   <VideoPlayer
    //     videoProps={{
    //       shouldPlay: true,
    //       resizeMode: Video.RESIZE_MODE_CONTAIN,
    //       source: {
    //         uri: uri,
    //       },
    //     }}
    //     //inFullscreen={true}
    //   />

    //   {/* <Video
    //     ref={video}
    //     style={styles.video}
    //     source={{
    //       uri: uri,
    //       //overrideFileExtensionAndroid: "H.264",
    //     }}
    //     useNativeControls
    //     resizeMode="contain"
    //     isLooping={true}
    //   /> */}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: Dimensions.get("window").height - 220,
    // height: Dimensions.get("window").height - 220,
  },
});
