import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { VideoScreen } from "./publishVideo";

interface PublishNewVideoProps {}

export const PublishNewVideoScreen: React.FC<PublishNewVideoProps> = () => {
  const route = useRoute();

  return (
    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <View style={{ marginTop: "60%" }}>
        <VideoScreen uri={route.params!.videoUri} />
      </View>

      <View
        style={{
          marginTop: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Button title="tag friends" color="#841584" onPress={() => Alert.alert("Simple Button pressed")} />
        <Button title="publish" color="#841584" onPress={() => Alert.alert("Simple Button pressed")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
