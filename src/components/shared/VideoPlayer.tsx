import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Colors } from "./styles/variables";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const VideoPlayer: React.FC<VideoProps> = ({ uri, style, isPlaying, resizeMode, playBtnSize }) => {
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
            uri,
          }}
          resizeMode={resizeMode}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.playBtnContainer}>
          {isPaused && <FontAwesome name="play" size={playBtnSize ? playBtnSize : 40} color={Colors.white} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  playBtnContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});