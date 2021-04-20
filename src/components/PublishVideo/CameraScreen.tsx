import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { PinchGestureHandler, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";
import { StopWatchContainer } from "./StopWatch";

type StackParamsList = {
  params: { videoURL: string; challengeId?: string; isReply?: boolean };
};

export const CameraScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [recording, setRecording] = useState<boolean>(false);
  const [isRecordingDone, setIsRecordingDone] = useState<boolean>(false);
  const [zoom, setZoom] = useState<any>(0);
  const cameraRef = useRef(null);
  const [stopwatchStart, setStopwatchStart] = useState<boolean>(false);
  const [stopwatchReset, setStopwatchReset] = useState<boolean>(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isPermissionGranted, setPermissionGranted] = useState(false);

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
  const headerLeft = () => (
    <MaterialIcons
      name="close"
      color={Colors.white}
      size={29}
      style={{ padding: 10 }}
      onPress={() => navigation.goBack()}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight,
      headerLeft,
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
      setPermissionGranted(audioRecording.granted);
    })();
    return () => navigation.removeListener("state", null);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener("state", (e) => {
        if (e.data.state.index === 2) {
          // in approve screen -> not done in blur as it screws the animation
          setIsCameraEnabled(false);
          setIsRecordingDone(false);
          setIsRecordingDone(false);
          toggleStopwatch();
        }
      });
      resetStopwatch();
      setTimeout(() => setIsCameraEnabled(true), 300);
    }, [])
  );

  const pickVideo = async () => {
    const selectedVideo: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!selectedVideo.cancelled) {
      const navigationParams = { videoUri: selectedVideo.uri };
      if (route.params && route.params.isReply) {
        navigationParams["isReply"] = route.params.isReply;
        navigationParams["challengeId"] = route.params.challengeId;
      }
      navigation.navigate("Publish", navigationParams);
    }
  };

  const record = async () => {
    if (cameraRef && cameraRef.current) {
      setRecording(true);
      console.log("red!!@#!@#!@#!@");
      try {
        let video = await cameraRef.current.recordAsync();
        const navigationParams = { videoURL: video.uri };
        if (route.params && route.params.isReply) {
          navigationParams["isReply"] = route.params.isReply;
          navigationParams["challengeId"] = route.params.challengeId;
        }
        navigation.navigate("ApproveVideo", navigationParams);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getNavigateParams = (video: any) => {
    const navigationParams = { videoUri: video.uri };
    if (route.params.isReply) {
      navigationParams["isReply"] = route.params.isReply;
      navigationParams["challengeId"] = route.params.challengeId;
    }

    return navigationParams;
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

  // const PauseButton = () => {
  //   return (
  //     <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
  //       <TouchableOpacity
  //         onPress={() => {
  //           stopRecord();
  //           toggleStopwatch();
  //         }}
  //       >
  //         <Feather name={"stop-circle"} color={"red"} size={60} />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
      <View style={styles.container}>
        {isCameraEnabled ? (
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
                !isRecordingDone && (
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
                )
              )}
            </View>
          </Camera>
        ) : (
          <View style={{ flex: 1, backgroundColor: "black" }}></View>
        )}
      </View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  menuButtons: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
});
