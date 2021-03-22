import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, Modal, Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Player } from "../shared/VideoPlayer";
import { Video } from "expo-av";
import { Challenge } from "../Challenge/Challenge";
import { Colors } from "../shared/styles/variables";

interface ProfileVideoModal {
  videoUri: string;
  modalVisible: boolean;
  setModalVisible: (isModalVisible: boolean) => void;
}

export const ProfileVideoModal: React.FC<ProfileVideoModal> = ({ modalVisible, setModalVisible, videoUri }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.Btns}>
          <Button
            title="Cancel"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>

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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: Dimensions.get("screen").height,
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,

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
