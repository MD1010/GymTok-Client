import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../shared";
import { authSelector } from "../../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";
import { colors } from "react-native-elements";
import { Divider } from "react-native-paper";

const LogOutFromApp: React.FC = () => {
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Log out of {loggedUser.fullName}?
              </Text>
              <Divider
                style={{ backgroundColor: Colors.weakGrey, height: 5 }}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={logoutFromApp}
              >
                <Text style={styles.logOutTextStyle}>Log Out</Text>
              </Pressable>
              <Divider
                style={{ backgroundColor: Colors.weakGrey, height: 5 }}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Icon
          onPress={openAreYouSureModal}
          name={"log-out-outline"}
          size={30}
          color={Colors.white}
          style={{ backgroundColor: "red" }}
          // color={focused ? Colors.white : Colors.darkGrey}
        />
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  logOutTextStyle: {
    color: "red",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LogOutFromApp;
