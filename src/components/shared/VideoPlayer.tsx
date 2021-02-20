import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const VideoPlayer: React.FC<VideoProps> = ({ uri, style, isPlaying, resizeMode, playBtnSize }) => {
  const [status, setStatus] = useState<any>();
  const ref = useRef(null);
  const [isPaused, setIsPaused] = useState<Boolean>(false);

  const pauseVideo = () => {
    console.log(123);
    ref.current.pauseAsync();
    setIsPaused(true);
  };

  const resumeVideo = () => {
    ref.current.playAsync();
    setIsPaused(false);
  };
  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? pauseVideo() : resumeVideo())}>
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
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  playBtn: {
    zIndex: 2,
    position: "absolute",
  },
  container: {
    height: "100%",
    width: "100%",
  },
});
