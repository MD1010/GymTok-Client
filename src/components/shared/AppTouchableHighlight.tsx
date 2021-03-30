import { Ionicons, FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { colors, IconProps } from "react-native-elements";
import { Colors } from "./styles/variables";

interface AppTouchableHighlightProps {
  optionText: string;
  onSelect: () => any;
  icon?: any;
}

export const AppTouchableHighlight: React.FC<AppTouchableHighlightProps> = ({ optionText, onSelect, icon }) => {
  return (
    <TouchableHighlight underlayColor={Colors.blue} style={[styles.option]} onPress={onSelect}>
      <>
        <View>{icon ? icon : null}</View>
        <Text style={styles.optionText}>{optionText}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  optionText: {
    fontSize: 16,
    color: Colors.white,
    flex: 4,
    marginLeft: 30,
  },
});
