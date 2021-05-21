import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
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
  }) => {
    const statusRef = useRef<any>();
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

    useEffect(() => {
      return () => navigation.removeListener("blur", null);
    }, []);

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
                onLoadStart={() => console.log("start loading", uri)}
                onReadyForDisplay={() => console.log("ready!")}
                onLoad={(status) => {
                  onVideoLoad && onVideoLoad();
                }}
                ref={ref}
                style={style || styles.defaultVideoStyle}
                useNativeControls={!!controlsShown}
                source={{
                  uri,
                }}
                resizeMode={resizeMode}
                shouldPlay={videoInViewPort}
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
