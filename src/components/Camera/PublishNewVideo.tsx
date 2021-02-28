import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  //TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { VideoScreen } from "./publishVideo";
import { FriendsModal } from "./FreindsModal";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { Colors, UIConsts } from "../shared/styles/variables";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const PublishNewVideoScreen: React.FC = () => {
  const route = useRoute();
  const [text, setText] = useState<string>("");
  const [showTaggedFriends, setShowTaggedFriends] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<any[]>([]);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  const publishChallenge = async () => {
    setIsSpinner(true);
    let formData = new FormData();

    formData.append("description", text);
    formData.append("video", {
      name: "dov-test.mp4",
      uri: route.params!.videoUri,
      type: "video/mp4",
    });
    formData.append("selectedFriends", JSON.stringify(selectedFriends));
    const uploaded = await axios.post(`${process.env.BASE_API_ENPOINT}/challenges/upload`, formData);
    if (uploaded) alert("upload succefully!!");
    setIsSpinner(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isSpinner} textContent={"Uploading..."} textStyle={styles.spinnerTextStyle} />
      <KeyboardAwareScrollView>
        <VideoScreen uri={route.params!.videoUri} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ height: UIConsts.bottomNavbarHeight }}>
            <TextInput
              style={styles.description}
              onChangeText={(text) => setText(text)}
              value={text}
              placeholder={"write description"}
              placeholderTextColor={Colors.black}
              autoCorrect={true}
              autoCapitalize={"words"}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

      {showTaggedFriends && (
        <Animatable.View animation="fadeInUpBig" duration={500} style={styles.tagFriends}>
          <FriendsModal
            selectedFriends={selectedFriends}
            close={() => setShowTaggedFriends(false)}
            isVisible={showTaggedFriends}
            setSelectedFriends={setSelectedFriends}
          />
        </Animatable.View>
      )}

      <View style={styles.btnOptions}>
        <TouchableOpacity
          style={styles.tagBtn}
          onPress={() => {
            setShowTaggedFriends(!showTaggedFriends);
          }}
        >
          <EvilIcons name="tag" size={35} color={"white"} />
          <Text style={styles.btnText}>Tag Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            publishChallenge();
          }}
        >
          <AntDesign name="upload" size={28} color={"white"} />
          <Text style={styles.btnText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.darkBlue,
  },
  description: {
    height: UIConsts.bottomNavbarHeight - 20,
    borderRadius: 25,
    opacity: 0.6,
    color: Colors.black,
    backgroundColor: Colors.lightGrey,
    borderColor: Colors.gold,
    borderWidth: 1,
  },
  tagFriends: {
    position: "absolute",
    backgroundColor: "#F0F0F0",
    marginTop: 120,
    zIndex: 1,
    height: 830,
    width: Dimensions.get("screen").width,
  },
  btnOptions: {
    width: Dimensions.get("screen").width,
    height: Platform.OS === "android" ? 51 : 75,
    marginTop:
      Platform.OS === "android" ? Dimensions.get("screen").height - 189 : Dimensions.get("screen").height - 160,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkBlue,
  },
  tagBtn: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 270,
  },
  publishBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
