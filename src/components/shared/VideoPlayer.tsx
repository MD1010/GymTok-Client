import { FontAwesome } from "@expo/vector-icons";
// import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import React, { memo, useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
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

  // const loadURI = async () => {
  //   const name = shorthash.unique(uri);
  //   console.log(name);
  //   const path = `${FileSystem.cacheDirectory}${name}`;
  //   const image = await FileSystem.getInfoAsync(path);
  //   if (image.exists) {
  //     console.log("read image from cache");
  //     setVideoURI(image.uri);
  //   } else {
  //     console.log("downloading image to cache");
  //     const newImage = await FileSystem.downloadAsync(uri, path);
  //     console.log("cache url = ", newImage.uri);
  //     setVideoURI(newImage.uri);
  //   }
  // };

  // useEffect(() => {
  //   console.log("uri", videoURI);
  // }, [videoURI]);

  // useEffect(() => {
  //   if (isPlaying) {
  //     ref.current.replayAsync();
  //     setIsPaused(false);
  //   } else {
  //     ref.current.pauseAsync();
  //   }
  //   return () => {
  //     ref.current.pauseAsync();
  //   };
  // }, [isPlaying]);

  // const damog = async () => {
  //   const a = await FileSystem.downloadAsync(
  //     "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  //     `${FileSystem.cacheDirectory}bunny`
  //   );
  //   console.log("cache url = ", a.uri);
  // };
  // useEffect(() => {
  //   damog();
  // }, []);

  // useEffect(()=>{

  // },[])

  return (
    <TouchableWithoutFeedback onPress={() => (statusRef.current.isPlaying ? pauseVideoByTap() : resumeVideoByTap())}>
      <View style={styles.container}>
        {
          // <Text>asdasdasdasdasdasdasdasdasd</Text>
          <Video
            ref={ref}
            style={[style]}
            source={{
              uri: "http://193.106.55.109:8000/136e5b14-ded6-4527-b40d-90697e8d6475.mp4",
            }}
            resizeMode={resizeMode}
            isLooping
            onPlaybackStatusUpdate={(status) => (statusRef.current = status)}
          />

          // <VideoPlayer
          //   showFullscreenButton={false}
          //   videoProps={{
          //     isLooping: true,
          //     shouldPlay: false,
          //     resizeMode: ResizeMode.COVER,
          //     style,

          //     source: {
          //       uri: "http://193.106.55.109:8000/136e5b14-ded6-4527-b40d-90697e8d6475.mp4",
          //     },
          //   }}
          //   inFullscreen={false}
          // />
          // <VideoPlayer
          //   showFullscreenButton={false}
          //   debug
          //   videoProps={{
          //     isLooping: true,
          //     shouldPlay: false,
          //     resizeMode: ResizeMode.COVER,
          //     style,

          //     source: {
          //       uri:
          //         "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fclient-68b1c424-98dc-4128-a36b-e3cf46200a7c/n3XIG",
          //     },
          //   }}
          //   inFullscreen={false}
          // />
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
