import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Text, Platform } from "react-native";
import { FontAwesome5, Fontisto, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { NavigationScreenProp } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const actions = [
  {
    icon: <Feather name="camera" color={"white"} size={24} />,
    name: "bt_camera",
  },
  {
    icon: <Ionicons name={"md-image-outline"} color={"white"} size={24} />,
    name: "bt_gallery",
  },
];

export const AddButton: React.FC = () => {
  const navigation = useNavigation();
  const handleSelectAction = (actionName) => {
    if (actionName === "bt_camera") {
      takeVideo();
    } else {
      takeVideoFromGallery();
    }
  };

  const takeVideo = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    await ImagePicker.getMediaLibraryPermissionsAsync(true);

    if (status === "granted") {
      const selectedVideo = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
      if (!selectedVideo.cancelled) {
        console.log(selectedVideo.uri);
        navigation.navigate("Publish", { videoUri: selectedVideo.uri });
      }
    } else {
      alert("no access to camera");
    }
  };

  const takeVideoFromGallery = async () => {
    const selectedVideo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!selectedVideo.cancelled) {
      console.log(selectedVideo.uri);
      navigation.navigate("Publish", { videoUri: selectedVideo.uri });
    }
  };

  return (
    <View style={{ marginTop: 110, marginLeft: 110 }}>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          handleSelectAction(name);
        }}
      />
    </View>
  );
};
