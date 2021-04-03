import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import shorthash from "shorthash";
import { Colors } from "./styles/variables";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  isPlaying: boolean;
  resizeMode: "cover" | "stretch" | "contain";
  controlsShown?: boolean;
  hidePlayButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isMuted?: boolean;
  onVideoTap?: () => any;
  onVideoLoad?: () => any;
}

export const Player: React.FC<VideoProps> = memo(
  ({
    uri,
    style,
    isPlaying,
    resizeMode,
    playBtnSize,
    controlsShown,
    hidePlayButton,
    containerStyle,
    isMuted,
    onVideoTap,
    onVideoLoad,
  }) => {
    const statusRef = useRef<any>();
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const ref = useRef(null);
    const [videoURI, setVideoURI] = useState<string>();
    const navigation = useNavigation();

    const pauseVideoByTap = () => {
      setIsPaused(true);
      ref.current.pauseAsync();
    };

    const resumeVideoByTap = () => {
      setIsPaused(false);
      ref.current.playAsync();
    };

    const loadURI = async () => {
      if (uri.startsWith("file")) {
        return setVideoURI(uri);
      }
      const path = `${
        Platform.OS === "ios"
          ? FileSystem.documentDirectory
          : FileSystem.cacheDirectory
      }${Platform.OS === "ios" ? uri.split("/")[3] : shorthash.unique(uri)}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        console.log("read image from cache");
        console.log("uri exists is  " + image.uri);

        setVideoURI(image.uri);
      } else {
        console.log("downloading image to cache");
        console.log("blaaaaaaaa", " ", uri);
        const newImage = await FileSystem.downloadAsync(uri, path);
        console.log("cache url = ", newImage.uri);
        setVideoURI(newImage.uri);
      }
    };

    useEffect(() => {
      Platform.OS === "web" ? setVideoURI(uri) : loadURI();
      // if (full) {
      //   ref.current.presentFullscreenPlayer();
      // }
    }, []);

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
      <TouchableWithoutFeedback
        onPress={() =>
          onVideoTap
            ? onVideoTap()
            : statusRef.current?.isPlaying
            ? pauseVideoByTap()
            : resumeVideoByTap()
        }
      >
        <View style={[styles.container, containerStyle]}>
          <Video
            onLoad={onVideoLoad}
            ref={ref}
            style={style || styles.defaultVideoStyle}
            useNativeControls={!!controlsShown}
            source={{
              uri: videoURI /*uri*/,
              // uri: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
              // uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            resizeMode={resizeMode}
            shouldPlay={isPlaying}
            isLooping
            isMuted={isMuted}
            onPlaybackStatusUpdate={(status) => (statusRef.current = status)}
          />
          {!controlsShown && !hidePlayButton && (
            <View style={styles.playButtonContainer}>
              {isPaused && (
                <FontAwesome
                  name="play"
                  size={playBtnSize ? playBtnSize : 40}
                  color={Colors.white}
                />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playButtonContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultVideoStyle: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    flex: 1,
  },
});
