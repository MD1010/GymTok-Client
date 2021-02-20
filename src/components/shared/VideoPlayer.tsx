import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useRef } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const VideoPlayer: React.FC<VideoProps> = ({ uri, style, isPlaying, resizeMode, playBtnSize }) => {
  const [status, setStatus] = React.useState<any>();
  const ref = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? ref.current.pauseAsync() : ref.current.playAsync())}>
      <View style={styles.container}>
        <Video
          ref={ref}
          style={style}
          source={{
            uri,
          }}
          resizeMode={resizeMode}
          shouldPlay={isPlaying}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        {!status?.isPlaying && (
          <View style={styles.playBtn}>
            <FontAwesome name={"play"} color={"white"} size={playBtnSize ? playBtnSize : 40} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  playBtn: {
    zIndex: 2,
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
