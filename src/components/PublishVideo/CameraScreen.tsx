import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Fontisto, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { PinchGestureHandler } from "react-native-gesture-handler";

export const CameraScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [recording, setRecording] = useState<boolean>(false);
  const [zoom, setZoom] = useState<any>(0);
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
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons name={"arrow-back"} color={"white"} size={35} />
                  <Text style={styles.text}> Back </Text>
                </TouchableOpacity>

                <TouchableOpacity
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
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      stopRecord();
                    }}
                  >
                    <Feather name={"stop-circle"} color={"red"} size={50} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Camera>
        )}
      </View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    justifyContent: "space-between",
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 10,
    color: "white",
  },
});
