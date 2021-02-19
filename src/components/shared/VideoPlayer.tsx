import { Video } from "expo-av";
import React, { useRef } from "react";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const VideoPlayer = ({ uri, style }) => {
  const [status, setStatus] = React.useState<any>();
  const videoRef = useRef(null);
  // const { uri, style } = props;
  // console.log(" In video player ", ref);
  return (
    <TouchableWithoutFeedback
      onPress={() => (status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync())}
    >
      <Video
        ref={videoRef}
        style={style}
        source={{
          uri,
        }}
        resizeMode="cover"
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onReadyForDisplay={(e) => {
          e.naturalSize.orientation = "portrait";
        }}
      />
    </TouchableWithoutFeedback>
  );
};
