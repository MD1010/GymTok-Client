import React from "react";
import { Dimensions, Image, ImageStyle, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface LoaderProps {
  style?: StyleProp<ImageStyle>;
  isFullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ style, isFullScreen }) => {
  return (
    <View style={[styles.container, isFullScreen && { marginBottom: StatusBar.currentHeight }]}>
      <Image source={require("../../../assets/loader.gif")} style={[styles.defaultLoaderStyles, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultLoaderStyles: {
    height: 150,
    width: 150,
  },
});
