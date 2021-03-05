import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, Modal, Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { VideoPlayer } from "../shared/VideoPlayer";
import { Video } from "expo-av";
import { Challenge } from "../Challenge/Challenge";

interface ProfileVideoModal {
  videoUri: string;
  modalVisible: boolean;
  setModalVisible: (isModalVisible: boolean) => void;
}

export const ProfileVideoModal: React.FC<ProfileVideoModal> = ({ modalVisible, setModalVisible, videoUri }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.Btns}>
              <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Challenge
                challenge={{
                  _id: "1",
                  creationTime: "",
                  name: "string",
                  createdBy: "string",
                  description: "string",
                  estimatedScore: "string",
                  image: "string",
                  video: videoUri,
                }}
                isVideoPlaying={true}
              />
            </View>

            {/* <VideoPlayer uri={videoUri} style={{ height: 400, width: 400 }} isPlaying resizeMode="cover" /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // flex: 1,
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
    alignSelf: "flex-end",
  },
});
