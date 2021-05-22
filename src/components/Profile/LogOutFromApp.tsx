import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { Colors } from "../shared";
import { ConfirmPopup } from "../shared/ConfirmPopup";

export const LogOutFromApp: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { loggedUser } = useSelector(authSelector);

  const logoutFromApp = useCallback(() => {
    console.log(123123);

    dispatch(logout());
    setModalVisible(false);
  }, []);
  const openAreYouSureModal = useCallback(() => {
    setModalVisible(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Icon
        onPress={openAreYouSureModal}
        name={"log-out-outline"}
        size={30}
        color={Colors.white}
        style={{ position: "absolute", right: 15, top: 50, zIndex: 1000 }}
      />

      <ConfirmPopup
        headerText={`Log out from ${loggedUser?.fullName}?`}
        onConfirm={logoutFromApp}
        confirmText={"Log Out"}
        isVisible={isModalVisible}
        onCancel={onCloseModal}
      />
    </>
  );
};
