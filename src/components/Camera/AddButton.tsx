import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { UIConsts } from "../shared/styles/variables";

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
    console.log(actionName);
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
    <FloatingAction
      buttonSize={UIConsts.addChallengePlusButton}
      actions={actions}
      showBackground={false}
      onPressItem={(name) => {
        handleSelectAction(name);
      }}
    />
    // <View style={styles.container}>
    //   <FloatingAction
    //     buttonSize={UIConsts.addChallengePlusButton}
    //     actions={actions}
    //     showBackground={false}
    //     onPressItem={(name) => {
    //       handleSelectAction(name);
    //     }}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 16,
    // top: 10,
    // position: "absolute",
    // top: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
    // margin: 50,
  },
});
