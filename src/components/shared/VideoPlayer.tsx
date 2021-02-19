import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  isPlaying: boolean;
}

export const VideoPlayer: React.FC<VideoProps> = ({ uri, style, isPlaying }) => {
  const [status, setStatus] = React.useState<any>();
  const ref = useRef(null);

  // console.log("isPlaying", isPlaying);
  useEffect(() => {
    console.log("isPlaying?", isPlaying);
  }, [isPlaying]);

  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? ref.current.pauseAsync() : ref.current.playAsync())}>
      <Video
        ref={ref}
        style={style}
        source={{
          uri,
        }}
        resizeMode="cover"
        shouldPlay={isPlaying}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onReadyForDisplay={(e) => {
          e.naturalSize.orientation = "portrait";
        }}
      />
    </TouchableWithoutFeedback>
  );
};
