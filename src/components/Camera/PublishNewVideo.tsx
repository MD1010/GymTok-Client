import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { useNavigation } from "../hooks/useNavigation";
import { Colors, UIConsts } from "../shared/styles/variables";
import { FriendsModal } from "./FreindsModal";
import { VideoScreen } from "./publishVideo";
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from "react-navigation";

export const PublishNewVideoScreen: React.FC = () => {
  const route = useRoute();
  const [text, setText] = useState<string>("");
  const [showTaggedFriends, setShowTaggedFriends] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<any[]>([]);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const navigation = useNavigation();

  const publishChallenge = async () => {
    setIsSpinner(true);
    let formData = new FormData();

    formData.append("description", text);
    formData.append("userId", "6004a03343b8e925a48d270b");
    formData.append("video", {
      name: "dov-test.mp4",
      uri: route.params.videoUri,
      type: "video/mp4",
    });
    formData.append("selectedFriends", JSON.stringify(selectedFriends));
    console.log(`${process.env.BASE_API_ENPOINT}/challenges/upload`);
    const { res, error } = await fetchAPI(
      RequestMethod.POST,
      `${process.env.BASE_API_ENPOINT}/challenges/upload`,
      formData
    );
    console.log("res=", res);
    console.log("res=", error);
    if (res) alert("upload succefully!!");
    else alert(error);
    setIsSpinner(false);
  };

  return (
    <>
      <Spinner
        visible={isSpinner}
        textContent={"Uploading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAwareScrollView> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 4 }}>
                <VideoScreen uri={route.params!.videoUri} />
              </View>

              <View style={{ flex: 0.56 }}>
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
              <View style={styles.btnOptions}>
                <TouchableOpacity
                  style={styles.tagBtn}
                  onPress={() => {
                    setShowTaggedFriends(!showTaggedFriends);
                  }}
                >
                  <View style={styles.tagIcon}>
                    <EvilIcons name="tag" size={35} color={"white"} />
                  </View>

                  <Text style={styles.btnText}>Tag Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.publishBtn}
                  onPress={() => {
                    publishChallenge();
                  }}
                >
                  <View style={styles.publishIcon}>
                    <AntDesign name="upload" size={28} color={"white"} />
                  </View>

                  <Text style={styles.btnText}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {/* </KeyboardAwareScrollView> */}

        {showTaggedFriends && (
          <Animatable.View
            animation="fadeInUpBig"
            duration={500}
            style={styles.tagFriends}
          >
            <FriendsModal
              selectedFriends={selectedFriends}
              close={() => setShowTaggedFriends(false)}
              isVisible={showTaggedFriends}
              setSelectedFriends={setSelectedFriends}
            />
          </Animatable.View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height,
  },
  description: {
    height: UIConsts.bottomNavbarHeight - 15,

    paddingLeft: 10,
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
    flex: 0.56,
    display: "flex",
    flexDirection: "row",
    // display: "flex",
    justifyContent: "space-between",
    // height: Dimensions.get("screen").height / 10,

    // alignContent: "center",
    // width: Dimensions.get("screen").width,
    // // height: Platform.OS === "android" ? 51 : 75,
    // height: Dimensions.get("screen").height / 10,
    // // marginTop:
    // //   Platform.OS === "android"
    // //     ? Dimensions.get("screen").height - 189
    // //     : Dimensions.get("screen").height - 160,
    // marginTop: Dimensions.get("screen").height / 1.3,
    // position: "absolute",
    // flexDirection: "row",
    // alignItems: "center",
    // backgroundColor: Colors.darkBlue,
  },
  tagBtn: {
    marginLeft: 15,
  },
  tagIcon: {
    marginLeft: 10,
  },
  publishBtn: {
    marginRight: 15,
  },
  publishIcon: {
    marginLeft: 3.5,
  },
  btnText: {
    color: "white",
    fontSize: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
