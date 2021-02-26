import React from "react";
import { Ionicons, Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors, UIConsts } from "../shared/styles/variables";
import ActionButton from "react-native-action-button";

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
    <>
      {/* Rest of the app comes ABOVE the action button component !*/}
      <ActionButton
        backdrop
        bgOpacity={0.75}
        bgColor={"#101010"}
        hideShadow={true}
        position={"center"}
        offsetY={18}
        useNativeFeedback={false}
        renderIcon={() => <FontAwesome5 name="plus" size={20} color={Colors.white} />}
        backgroundTappable={false}
        buttonColor={Colors.lightPurpule}
      >
        <ActionButton.Item useNativeFeedback={false} buttonColor={Colors.lightPurpule} size={40} onPress={takeVideo}>
          <FontAwesome5 name="video" size={15} color={Colors.white} />
        </ActionButton.Item>
        <ActionButton.Item
          useNativeFeedback={false}
          buttonColor={Colors.lightPurpule}
          size={40}
          onPress={takeVideoFromGallery}
        >
          <FontAwesome name="picture-o" size={15} color={Colors.white} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
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
