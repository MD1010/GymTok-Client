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
    ref.current.pauseAsync();
    setIsPaused(true);
  };

  const resumeVideo = () => {
    ref.current.playAsync();
    setIsPaused(false);
  };
  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? pauseVideo() : resumeVideo())}>
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
        {isPaused && (
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
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
