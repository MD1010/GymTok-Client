import React, { useState, useEffect, useRef, useLayoutEffect, FC, useCallback } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, Platform } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Fontisto, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { PinchGestureHandler, TouchableOpacity } from "react-native-gesture-handler";
import { StopWatchContainer } from "./StopWatch";
import * as Permissions from "expo-permissions";
import { Colors } from "../shared/styles/variables";
import { StackNavigationOptions } from "@react-navigation/stack";

export const CameraScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [recording, setRecording] = useState<boolean>(false);
  const [isRecordingDone, setIsRecordingDone] = useState<boolean>(false);
  const [zoom, setZoom] = useState<any>(0);
  const cameraRef = useRef(null);
  const [stopwatchStart, setStopwatchStart] = useState<boolean>(false);
  const [stopwatchReset, setStopwatchReset] = useState<boolean>(false);

  const toggleStopwatch = () => {
    setStopwatchStart(!stopwatchStart);
    setStopwatchReset(false);
  };

  const resetStopwatch = () => {
    setStopwatchStart(false);
    setStopwatchReset(true);
  };

  const headerRight = () => (
    <MaterialIcons
      name={flash === Camera.Constants.FlashMode.on ? "flash-on" : "flash-off"}
      size={25}
      color={Colors.white}
      style={{ padding: 10 }}
      onPress={() => {
        setFlash(
          flash === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on
        );
      }}
    />
  );

  const centerHeader = () => <StopWatchContainer stopwatchReset={stopwatchReset} stopwatchStart={stopwatchStart} />;

  useEffect(() => {
    navigation.setOptions({
      headerRight,
      headerTitle: centerHeader,
    } as StackNavigationOptions);
  }, [headerRight]);

  useEffect(() => {
    (async () => {
      const audioRecording =
        Platform.OS === "ios"
          ? await Camera.requestPermissionsAsync()
          : (await Permissions.askAsync(Permissions.AUDIO_RECORDING)) &&
            (await Permissions.askAsync(Permissions.CAMERA));
      await ImagePicker.getMediaLibraryPermissionsAsync(true);
      setHasPermission(audioRecording.granted);
    })();
  }, []);

  const pickVideo = async () => {
    const selectedVideo: any = await ImagePicker.launchImageLibraryAsync({
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
      console.log("red!!@#!@#!@#!@");
      let video = await cameraRef.current.recordAsync();
      console.log(video.uri);
      // navigation.navigate("Publish", { videoUri: video.uri });
      navigation.navigate("ApproveVideo", { videoURL: video.uri });
    }
  };

  const stopRecord = () => {
    if (cameraRef && cameraRef.current) {
      setRecording(false);
      setIsRecordingDone(true);
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

  // const StopButton = (
  //   <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
  //     <TouchableOpacity
  //       onPress={() => {
  //         stopRecord();
  //         toggleStopwatch();
  //       }}
  //     >
  //       <Feather name={"stop-circle"} color={"red"} size={60} />
  //     </TouchableOpacity>
  //   </View>
  // );

  const PauseButton = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            stopRecord();
            toggleStopwatch();
          }}
        >
          <Feather name={"stop-circle"} color={"red"} size={60} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
      <View style={styles.container}>
        <Camera ref={cameraRef} style={styles.camera} type={type} flashMode={flash} zoom={zoom} ratio={"16:9"}>
          <View style={{ flex: 1, padding: 25 }}>
            {!recording && !isRecordingDone ? (
              <View style={styles.menuButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                    );
                  }}
                >
                  <MaterialIcons
                    name={Platform.OS === "android" ? "flip-camera-android" : "flip-camera-ios"}
                    color={"white"}
                    size={35}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    record();
                    toggleStopwatch();
                  }}
                >
                  <Fontisto name={"record"} color={"red"} size={60} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    pickVideo();
                  }}
                >
                  <Ionicons name={"md-image-outline"} color={"white"} size={35} />
                </TouchableOpacity>
              </View>
            ) : (
              !isRecordingDone && <PauseButton />
            )}
          </View>
        </Camera>
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
  menuButtons: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
});
