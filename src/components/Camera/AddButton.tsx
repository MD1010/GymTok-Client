import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useNavigationBuilder } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import ActionButton from "react-native-action-button";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { Colors } from "../shared/styles/variables";

interface Props {
  setIsAddButtonClicked: (isClicked: boolean) => void;
}

export const AddButton: React.FC<Props> = ({ setIsAddButtonClicked }) => {
  const navigation = useNavigation();
  const { loggedUser } = useSelector(authSelector);
  const takeVideo = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    await ImagePicker.getMediaLibraryPermissionsAsync(true);
    if (status === "granted") {
      const selectedVideo = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Videos });
      if (!selectedVideo.cancelled) {
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
      navigation.navigate("Publish", { videoUri: selectedVideo.uri });
    }
  };

  return (
    <ActionButton
      onPress={() => setIsAddButtonClicked(true)}
      backdrop
      bgOpacity={0.75}
      bgColor={"#101010"}
      hideShadow={true}
      position={"center"}
      offsetY={20}
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
  );
};
