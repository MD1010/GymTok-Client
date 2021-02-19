import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

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

  const record = async () => {
    const selectedVideo = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
    if (!selectedVideo.cancelled) {
      console.log(selectedVideo.uri);
      navigation.navigate("Publish", { videoUri: selectedVideo.uri });
    }
  };

  const pickVideo = async () => {
    const selectedVideo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!selectedVideo.cancelled) {
      console.log(selectedVideo.uri);
      navigation.navigate("Publish", { videoUri: selectedVideo.uri });
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
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
              <Text style={styles.text}> choose from gallery </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};
