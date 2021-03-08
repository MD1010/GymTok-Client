import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import React, { memo, useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Colors } from "./styles/variables";
import * as FileSystem from "expo-file-system";
import shorthash from "shorthash";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
}

export const VideoPlayer: React.FC<VideoProps> = memo(({ uri, style, isPlaying, resizeMode, playBtnSize }) => {
  // const [status, setStatus] = useState<any>();
  const statusRef = useRef<any>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const ref = useRef(null);
  const [videoURI, setVideoURI] = useState<string>();
  console.log("render video");

  const pauseVideoByTap = () => {
    setIsPaused(true);
    ref.current.pauseAsync();
  };

  const resumeVideoByTap = () => {
    setIsPaused(false);
    ref.current.playAsync();
  };

  const loadURI = async () => {
    const name = shorthash.unique(uri);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("read image from cache");
      setVideoURI(image.uri);
    } else {
      console.log("downloading image to cache");
      const newImage = await FileSystem.downloadAsync(uri, path);
      setVideoURI(newImage.uri);
    }
  };

  useEffect(() => {
    console.log("uri", videoURI);
  }, [videoURI]);

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

  useEffect(() => {
    loadURI();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => (statusRef.current.isPlaying ? pauseVideoByTap() : resumeVideoByTap())}>
      <View style={styles.container}>
        {
          <Video
            ref={ref}
            style={[style]}
            source={{
              uri: "http://193.106.55.109:8000/136e5b14-ded6-4527-b40d-90697e8d6475.mp4",
              // uri: videoURI,
            }}
            resizeMode={resizeMode}
            isLooping
            onPlaybackStatusUpdate={(status) => (statusRef.current = status)}
          />
        }
        <View>
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
