import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { VideoScreen } from "./publishVideo";
import { FriendsModal } from "./FreindsModal";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { Colors } from "../shared/styles/variables";

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
    <View style={styles.container}>
      <Spinner visible={isSpinner} textContent={"Uploading..."} textStyle={styles.spinnerTextStyle} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          style={styles.description}
          //multiline
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder={"write description"}
          autoCorrect={true}
          autoCapitalize={"words"}
        />
      </TouchableWithoutFeedback>

      <View style={styles.video}>
        <VideoScreen uri={route.params!.videoUri} />
      </View>

      {showTaggedFriends && (
        <Animatable.View animation="fadeInUp" style={styles.tagFriends}>
          <FriendsModal
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  description: {
    height: 140,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  video: {
    marginTop: 120,
  },
  tagFriends: {
    backgroundColor: "red",
    marginTop: 120,
    height: 330,
    marginLeft: 16,
    marginRight: 16,
  },
  btnOptions: {
    width: 430,
    height: 90,
    marginTop: 725,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: Colors.darkBlue,
  },
  tagBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 35,
    marginRight: 270,
  },
  publishBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 35,
  },
  btnText: {
    color: "white",
    fontSize: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
