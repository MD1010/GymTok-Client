import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

interface VideoScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,

    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",

    margin: 20,
  },
  button: {
    // flex: 0.1,
    marginTop: 35,
    alignSelf: "flex-end",

    alignItems: "center",
  },
  text: {
    fontSize: 18,

    color: "white",
  },
});

export const VideoContainer: React.FC<VideoScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [recroding, setRecording] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await ImagePicker.getMediaLibraryPermissionsAsync(true);
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickVideo = async () => {
    const selectedVideo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!selectedVideo.cancelled) {
      console.log(selectedVideo.uri);
      navigation.navigate("Publish", { videoUri: selectedVideo.uri });
    }
  };

  const record = async () => {
    if (cameraRef && cameraRef.current) {
      setRecording(true);
      let video = await cameraRef.current.recordAsync();
      console.log(video.uri);
      navigation.navigate("Publish", { videoUri: video.uri });
    }
  };

  const stopRecord = () => {
    if (cameraRef && cameraRef.current) {
      setRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera ref={cameraRef} style={styles.camera} type={type} flashMode={flash}>
          {!recroding ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.on
                      ? Camera.Constants.FlashMode.off
                      : Camera.Constants.FlashMode.on
                  );
                }}
              >
                <Text style={styles.text}> Flash </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  record();
                }}
              >
                <Text style={styles.text}> record </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  pickVideo();
                }}
              >
                <Text style={styles.text}> Gallery </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.on
                      ? Camera.Constants.FlashMode.off
                      : Camera.Constants.FlashMode.on
                  );
                }}
              >
                <Text style={styles.text}> Flash </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopRecord();
                }}
              >
                <Text style={styles.text}> stop record </Text>
              </TouchableOpacity>
            </View>
          )}
        </Camera>
      )}
    </View>
  );
};
