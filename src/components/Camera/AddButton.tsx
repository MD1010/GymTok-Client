import React from "react";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { UIConsts } from "../shared/styles/variables";
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
      <ActionButton hideShadow={true} position={"center"} style={{ marginBottom: -10 }} buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor="#9b59b6" size={40} onPress={() => console.log("notes tapped!")}>
          <FontAwesome5 name="home" size={20} color={"white"} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#3498db" size={40} onPress={() => {}}>
          <FontAwesome5 name="home" size={20} color={"white"} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#1abc9c" size={40} onPress={() => {}}>
          <FontAwesome5 name="home" size={20} color={"white"} />
        </ActionButton.Item>
      </ActionButton>
    </>

    // <FloatingAction
    //   buttonSize={UIConsts.addChallengePlusButton}
    //   actions={actions}
    //   showBackground={false}
    //   onPressItem={(name) => {
    //     handleSelectAction(name);
    //   }}
    // />
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
