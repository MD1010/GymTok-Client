import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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

export const VideoContainer: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recroding, setRecording] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef && cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
    }
  };

  const record = async () => {
    if (cameraRef && cameraRef.current) {
      setRecording(true);
      let video = await cameraRef.current.recordAsync();
      console.log(video.uri);
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
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            cameraRef.current.pausePreview();
          }}
        >
          <Text style={styles.text}> X </Text>
        </TouchableOpacity>
        {!recroding ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                snap();
              }}
            >
              <Text style={styles.text}> Snap </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                record();
              }}
            >
              <Text style={styles.text}> record </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
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
    </View>
  );
};
