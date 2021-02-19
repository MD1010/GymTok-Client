import React from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

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
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
