import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const ref = useRef(null);

  const pauseVideo = () => {
    console.log(123);

    ref.current.pauseAsync();
  };

  const resumeVideo = () => {
    ref.current.playAsync();
  };
  return (
    <>
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

      <TouchableWithoutFeedback onPress={() => (status.isPlaying ? pauseVideo() : resumeVideo())}>
        <View style={styles.playBtnContainer}>
          {!isPlaying && <FontAwesome name="play" size={40} color={Colors.white} />}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  playBtnContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    alignContent: "center",
  },
});
