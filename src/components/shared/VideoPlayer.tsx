import { FontAwesome } from "@expo/vector-icons";
// import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import React, { memo, useEffect, useRef, useState } from "react";
import { Platform, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Colors } from "./styles/variables";
import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";
import { ResizeMode, Video } from "expo-av";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const Player: React.FC<VideoProps> = memo(({ uri, style, isPlaying, resizeMode, playBtnSize }) => {
  const statusRef = useRef<any>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const ref = useRef(null);
  const [videoURI, setVideoURI] = useState<string>();

  const pauseVideoByTap = () => {
    setIsPaused(true);
    ref.current.pauseAsync();
  };

  const resumeVideoByTap = () => {
    setIsPaused(false);
    ref.current.playAsync();
  };

  const loadURI = async () => {
    const path = `${Platform.OS === "ios" ? FileSystem.documentDirectory : FileSystem.cacheDirectory}${
      Platform.OS === "ios" ? uri.split("/")[3] : shorthash.unique(uri)
    }`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("read image from cache");
      console.log("uri exists is  " + image.uri);

      setVideoURI(image.uri);
    } else {
      console.log("downloading image to cache");
      const newImage = await FileSystem.downloadAsync(uri, path);
      console.log("cache url = ", newImage.uri);
      setVideoURI(newImage.uri);
    }
  };

  useEffect(() => {
    console.log("dovovov " + uri);
  }, [uri]);

  // useEffect(() => {
  //   Platform.OS === "web" ? setVideoURI(uri) : loadURI();
  // }, []);

  useEffect(() => {
    if (isPlaying) {
      ref.current.replayAsync();
      setIsPaused(false);
    } else {
      ref.current.pauseAsync();
    }
    return () => {
      ref.current.pauseAsync();
    };
  }, [isPlaying]);

  return (
    <TouchableWithoutFeedback onPress={() => (statusRef.current?.isPlaying ? pauseVideoByTap() : resumeVideoByTap())}>
      <View style={styles.container}>
        <Video
          ref={ref}
          style={[style]}
          source={{
            uri: /*videoURI*/ uri,
            // uri: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
            // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          resizeMode={resizeMode}
          shouldPlay={isPlaying}
          isLooping
          onPlaybackStatusUpdate={(status) => (statusRef.current = status)}
        />
        <View style={{ position: "absolute" }}>
          {isPaused && <FontAwesome name="play" size={playBtnSize ? playBtnSize : 40} color={Colors.white} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
