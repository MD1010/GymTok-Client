import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { UIConsts } from "../shared/styles/variables";

interface PublishScreenProps {
  uri: string;
}

export const VideoScreen: React.FC<PublishScreenProps> = ({ uri }) => {
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={true}
      />
    </View>
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
