import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { Colors } from "../shared";

interface IConfirmPopupProps {
  onCancel: () => any;
  onConfirm: () => any;
  cancelText?: string;
  confirmText: string;
  isVisible: boolean;
  headerText: string;
  hasBackdrop?: boolean;
  backdropOpacity?: number;
}
export const ConfirmPopup: React.FC<IConfirmPopupProps> = ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  isVisible,
  headerText,
  hasBackdrop,
  backdropOpacity,
}) => {
  return (
    <Modal isVisible={isVisible} hasBackdrop={hasBackdrop || true} backdropOpacity={backdropOpacity}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.modalView}>
          <Text style={styles.modalHederText}>{headerText}</Text>
          <Divider style={{ backgroundColor: Colors.white }} />
          <Pressable style={[styles.button]} onPress={onConfirm}>
            <Text style={styles.logOutTextStyle}>{confirmText}</Text>
          </Pressable>
          <Divider style={{ backgroundColor: Colors.white }} />
          <Pressable style={[styles.button]} onPress={onCancel}>
            <Text style={styles.textStyle}>{cancelText || "Cancel"}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
