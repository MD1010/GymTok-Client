import React from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const DismissKeyboard: React.FC = ({ children }) => {
  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>;
};
