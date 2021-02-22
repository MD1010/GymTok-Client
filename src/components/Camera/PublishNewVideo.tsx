import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from "@react-navigation/native";
import { VideoScreen } from "./publishVideo";
import { TextInput } from "react-native";
import { FriendsModal } from "./FreindsModal";
import axios from "axios";

interface PublishNewVideoProps {}

export const PublishNewVideoScreen: React.FC<PublishNewVideoProps> = () => {
  const route = useRoute();
  const [text, setText] = useState<string>("");
  const [showFriendsModal, setShowFriendsModal] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<any[]>([]);

  const publishChallenge = () => {
    let formData = new FormData();

    formData.append("description", text);
    formData.append("video", {
      name: "dov-test.mp4",
      uri: route.params!.videoUri,
      type: "video/mp4",
    });
    formData.append("selectedFriends", JSON.stringify(selectedFriends));
    axios.post(`${process.env.BASE_API_ENPOINT}/challenges/upload`, formData);
  };

  return (
    <View style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder={"write description"}
          autoCorrect={true}
          autoCapitalize={"words"}
        />
      </TouchableWithoutFeedback>

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
        <Button title="tag friends" color="#841584" onPress={() => setShowFriendsModal(true)} />
        <Button title="publish" color="#841584" onPress={() => publishChallenge()} />
      </View>

      <FriendsModal
        modalVisible={showFriendsModal}
        setModalVisible={(isShow: boolean) => setShowFriendsModal(isShow)}
        setSelectedFriends={(selectedFriends: any[]) => setSelectedFriends(selectedFriends)}
      />
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
