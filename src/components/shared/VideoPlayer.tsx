import { Video } from "expo-av";
import React from "react";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";

interface VideoProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const VideoPlayer: React.FC<VideoProps> = React.forwardRef((props, ref) => {
  const [status, setStatus] = React.useState<any>();
  const { uri, id, style } = props;
  console.log(ref);
  return (
    <TouchableWithoutFeedback onPress={() => (status.isPlaying ? ref.current.pauseAsync() : ref.current.playAsync())}>
      <Video
        ref={ref}
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
});
