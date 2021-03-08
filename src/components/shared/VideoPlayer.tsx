import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Colors } from "./styles/variables";

interface VideoProps {
  videoURL: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const VideoPlayer: React.FC<VideoProps> = ({ videoURL, style, isPlaying, resizeMode, playBtnSize }) => {
  const [status, setStatus] = useState<any>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const ref = useRef(null);

  const pauseVideoByTap = () => {
    setIsPaused(true);
    ref.current.pauseAsync();
  };

  const resumeVideoByTap = () => {
    setIsPaused(false);
    ref.current.playAsync();
  };

  useEffect(() => {
    if (isPlaying) {
      ref.current.replayAsync();
      setIsPaused(false);
    } else {
      ref.current.pauseAsync();
    }
  }, [isPlaying]);

  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? pauseVideoByTap() : resumeVideoByTap())}>
      <View style={styles.container}>
        <Video
          ref={ref}
          style={[style]}
          source={{
            uri: `${process.env.STREAMING_SERVER_ENPOINT}/${videoURL}`,
          }}
          resizeMode={resizeMode}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View>
          {isPaused && <FontAwesome name="play" size={playBtnSize ? playBtnSize : 40} color={Colors.white} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
