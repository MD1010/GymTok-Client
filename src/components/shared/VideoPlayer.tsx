import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";
import shorthash from "shorthash";
import { loadVideo } from "../../utils/cache";
import { Colors } from "./styles/variables";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  playBtnSize?: number;
  videoInViewPort?: boolean;
  resizeMode: "cover" | "stretch" | "contain";
  controlsShown?: boolean;
  hidePlayButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isMuted?: boolean;
  onVideoTap?: () => any;
  onVideoLoad?: () => any;
  /**
   * if the video is rendered not in flat list as a seperated screen
   * default is false
   */
  renderedInList?: boolean;
}

export const Player: React.FC<VideoProps> = memo(
  ({
    uri,
    style,
    videoInViewPort,
    resizeMode,
    playBtnSize,
    controlsShown,
    hidePlayButton,
    containerStyle,
    isMuted,
    onVideoTap,
    onVideoLoad,
    renderedInList = false,
    children,
  }) => {
    const statusRef = useRef<any>();
    const dispatch = useDispatch();

    const [isPaused, setIsPaused] = useState<boolean>(false);
    const ref = useRef(null);
    const [videoURI, setVideoURI] = useState<string>();
    const navigation = useNavigation();
    const isBlurred = useRef<boolean>(false);
    const pauseVideoByTap = async () => {
      setIsPaused(true);
      await ref.current?.pauseAsync();
    };

    const resumeVideoByTap = async () => {
      setIsPaused(false);
      await ref.current?.playAsync();
    };

    // const loadURI = async () => {
    //   if (uri.startsWith("file")) {
    //     return setVideoURI(uri);
    //   }
    //   const path = `${Platform.OS === "ios" ? FileSystem.documentDirectory : FileSystem.cacheDirectory}${
    //     Platform.OS === "ios" ? uri.split("/")[3] : shorthash.unique(uri)
    //   }`;
    //   const image = await FileSystem.getInfoAsync(path);
    //   if (image.exists) {
    //     console.log("read image from cache");
    //     console.log("uri exists is  " + image.uri);
    //     setVideoURI(image.uri);
    //   } else {
    //     console.log("downloading image to cache");
    //     const newImage = await FileSystem.downloadAsync(uri, path);
    //     console.log("cache url = ", newImage.uri);
    //     setVideoURI(newImage.uri);
    //   }
    // };

    useEffect(() => {
      return () => navigation.removeListener("blur", null);
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        navigation.addListener("blur", async (e) => {
          await ref.current?.pauseAsync();
          isBlurred.current = true;
        });
      }, [])
    );

    useEffect(() => {
      (async function () {
        if (videoInViewPort) {
          isBlurred.current ? await ref.current?.playAsync() : await ref.current?.replayAsync();
          isBlurred.current = false;
          isPaused && setIsPaused(false);
        } else if (videoInViewPort !== undefined) {
          await ref.current?.pauseAsync();
        }
        return async () => {
          await ref.current?.pauseAsync();
        };
      })();
    }, [videoInViewPort]);

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          onVideoTap ? onVideoTap() : statusRef.current?.isPlaying ? pauseVideoByTap() : resumeVideoByTap()
        }
      >
        {
          <View style={[styles.container, containerStyle]}>
            {
              <Video
                usePoster
                posterSource={{
                  uri: "https://i.pinimg.com/originals/66/c2/6c/66c26c8d2e3745a9a6d131ec478d2319.jpg",
                  height: Dimensions.get("window").height,
                }}
                posterStyle={{ height: Dimensions.get("window").height }}
                onLoadStart={() => console.log("start loading", uri)}
                onReadyForDisplay={() => console.log("ready!")}
                onLoad={(status) => {
                  onVideoLoad && onVideoLoad();
                }}
                ref={ref}
                style={style || styles.defaultVideoStyle}
                useNativeControls={!!controlsShown}
                source={{
                  uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                resizeMode={resizeMode}
                shouldPlay={videoInViewPort === undefined ? true : videoInViewPort}
                isLooping
                isMuted={isMuted}
                onPlaybackStatusUpdate={(status) => (statusRef.current = status)}
              />
            }
            {!controlsShown && !hidePlayButton && (
              <View style={styles.playButtonContainer}>
                {isPaused && <FontAwesome name="play" size={playBtnSize ? playBtnSize : 40} color={Colors.white} />}
              </View>
            )}
          </View>
        }
      </TouchableWithoutFeedback>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
