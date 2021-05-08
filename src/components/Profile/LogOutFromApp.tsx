import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../shared";
import { authSelector } from "../../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";
import { colors } from "react-native-elements";
import { Divider } from "react-native-paper";
import Modal from "react-native-modal";

export const LogOutFromApp: React.FC = () => {
  const { authError, loggedUser } = useSelector(authSelector);

  const dispatch = useDispatch();
  const logoutFromApp = () => {
    dispatch(logout());
    setModalVisible(!modalVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const openAreYouSureModal = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    console.log("here");
  }, []);
  return (
    <>
      <Icon
        onPress={openAreYouSureModal}
        name={"log-out-outline"}
        size={30}
        color={Colors.white}
        style={{ position: "absolute", right: 15, top: 20, zIndex: 1000 }}
        // color={focused ? Colors.white : Colors.darkGrey}
      />

      <Modal isVisible={modalVisible}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.modalView}>
            <Text style={styles.modalHederText}>Log out from {loggedUser.fullName}?</Text>
            <Divider style={{ backgroundColor: Colors.white }} />
            <Pressable style={[styles.button]} onPress={logoutFromApp}>
              <Text style={styles.logOutTextStyle}>Log Out</Text>
            </Pressable>
            <Divider style={{ backgroundColor: Colors.white }} />
            <Pressable style={[styles.button]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    backgroundColor: Colors.darkBlueOpaque,
    borderRadius: 20,
    padding: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 15,
  },
  button: {
    padding: 10,
  },

  textStyle: {
    color: Colors.lightGrey2,
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  logOutTextStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalHederText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.white,
  },
});

export default LogOutFromApp;
