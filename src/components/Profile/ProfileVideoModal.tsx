import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, Modal, Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Player } from "../shared/VideoPlayer";
import { Video } from "expo-av";
import { Challenge } from "../Challenge/Challenge";

interface ProfileVideoModal {
  videoUri: string;
  modalVisible: boolean;
  setModalVisible: (isModalVisible: boolean) => void;
}

export const ProfileVideoModal: React.FC<ProfileVideoModal> = ({ modalVisible, setModalVisible, videoUri }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* <View style={{ height: 90 }}> */}
      <View style={styles.Btns}>
        <Button
          title="Cancel"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>

      <View style={{ height: Dimensions.get("screen").height }}>
        <Challenge
          challenge={{
            _id: "1",
            creationTime: "",
            name: "string",
            createdBy: { _id: "", fullName: "dov", username: "dov" },
            description: "string",
            estimatedScore: "string",
            image: "string",
            video: videoUri?.split("/")[3],
            likes: ["100"],
            replies: ["very good"],
          }}
          isVideoPlaying={true}
        />
      </View>
      {/* </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  Btns: {
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 30,
    zIndex: 1000000,
  },
});
