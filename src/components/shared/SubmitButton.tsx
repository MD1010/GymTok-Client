import React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "./styles/variables";

interface SubmitButtonProps {
  backgroundColor?: Colors;
  containerStyle?: StyleProp<ViewStyle>;
  buttonText: string;
  type: "clear" | "solid" | "outline";
  buttonStyle?: StyleProp<ViewStyle>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  backgroundColor,
  buttonText,
  type,
  buttonStyle,
  containerStyle,
}) => {
  return (
    <Button
      title={buttonText}
      type={type}
      style={buttonStyle}
      buttonStyle={{ backgroundColor }}
      containerStyle={[styles.defaultContainerStyle, containerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
  },
});