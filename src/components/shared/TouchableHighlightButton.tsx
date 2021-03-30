import { Ionicons, FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { colors, IconProps } from "react-native-elements";
import { Colors } from "./styles/variables";

interface TouchableHighlightButtonProps {
  optionText: string;
  onSelect: () => any;
  icon?: any;
  actionWillNavigate?: boolean;
  textColor?: string;
  highlightOff?;
}

export const TouchableHighlightButton: React.FC<TouchableHighlightButtonProps> = ({
  optionText,
  onSelect,
  icon,
  actionWillNavigate,
  textColor,
}) => {
  return (
    <TouchableHighlight style={[styles.option]} onPress={onSelect}>
      <>
        <View>{icon ? icon : null}</View>
        <Text style={[styles.optionText, textColor && { color: textColor }]}>{optionText}</Text>
        <View>
          {actionWillNavigate ? <Ionicons name="chevron-forward" color={Colors.lightGrey2} size={20} /> : null}
        </View>
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
