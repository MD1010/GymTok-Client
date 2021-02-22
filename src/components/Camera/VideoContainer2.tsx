import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Fontisto, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { PinchGestureHandler } from "react-native-gesture-handler";
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
    marginTop: 35,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    color: "white",
  },
});

export const VideoContainer: React.FC<VideoScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [recording, setRecording] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [zoom, setZoom] = useState<any>(0);
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const audioRecording =
        Platform.OS === "ios"
          ? await Camera.requestPermissionsAsync()
          : (await Permissions.askAsync(Permissions.AUDIO_RECORDING)) &&
            (await Permissions.askAsync(Permissions.CAMERA));
      setHasPermission(audioRecording.granted);
      // const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (!audioRecording.granted) {
        alert("No permissions granted!");
        navigation.navigate("/Home");
      } else {
        await ImagePicker.getMediaLibraryPermissionsAsync(true);
      }
      // setHasPermission(cameraPermission.granted && audioRecording.granted)
      // const { status } = await Camera.requestPermissionsAsync();
      // setHasPermission(status === "granted");
    })();
  }, []);

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
      try {
        let video = await cameraRef.current.recordAsync();
        console.log(video.uri);
        navigation.navigate("Publish", { videoUri: video.uri });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopRecord = () => {
    if (cameraRef && cameraRef.current) {
      setRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  const onPinchGestureEvent = (event: any) => {
    console.log("original zoom: " + event.nativeEvent.scale);
    const tempZoom = event.nativeEvent.scale < 1 ? event.nativeEvent.scale / 100 : event.nativeEvent.scale / 10;

    console.log("new temp zoom: " + tempZoom);

    if (tempZoom >= zoom) {
      let newZoom = zoom + (tempZoom - zoom);
      console.log("grow");
      console.log(newZoom);
      setZoom(newZoom);
    } else {
      let newZoom = zoom - (zoom - tempZoom);
      console.log("low");
      console.log(newZoom);
      setZoom(newZoom >= 0 ? newZoom : 0);
    }
  };

  return (
    <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
      <View style={styles.container}>
        {isFocused && (
          <Camera ref={cameraRef} style={styles.camera} type={type} flashMode={flash} zoom={zoom}>
            <>
              <View>
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
                  <Ionicons name={"ios-flash-outline"} color={"white"} size={35} />
                  <Text style={styles.text}> Flash </Text>
                </TouchableOpacity>

                {recording && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <MaterialIcons name={"flip-camera-android"} color={"white"} size={35} />
                    <Text style={styles.text}> Flip </Text>
                  </TouchableOpacity>
                )}
              </View>
              {!recording && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <MaterialIcons name={"flip-camera-android"} color={"white"} size={35} />
                    <Text style={styles.text}> Flip </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      record();
                    }}
                  >
                    {/* <Text style={styles.text}> record </Text> */}
                    <Fontisto name={"record"} color={"red"} size={60} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      pickVideo();
                    }}
                  >
                    <Ionicons name={"md-image-outline"} color={"white"} size={35} />
                    <Text style={styles.text}> Gallery </Text>
                  </TouchableOpacity>
                </View>
              )}

              {recording && (
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      stopRecord();
                    }}
                  >
                    <Feather name={"stop-circle"} color={"red"} size={50} />
                    {/* <Text style={styles.text}> stop record </Text> */}
                  </TouchableOpacity>
                </View>
              )}
            </>
          </Camera>
        )}
      </View>
    </PinchGestureHandler>
  );
};
