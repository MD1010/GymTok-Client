import React from "react";
import { Dimensions, View } from "react-native";
import { colors } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Circle, Rect } from "react-native-svg";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";

export const UserSkeletons = () => (
  <FlatList
    keyExtractor={(_, i) => i.toString()}
    data={new Array(Math.round(Dimensions.get("window").height / 60))}
    renderItem={() => (
      <View style={{ height: 50, marginBottom: 15 }}>
        <SvgAnimatedLinearGradient primaryColor={colors.grey1} secondaryColor={colors.grey2}>
          <Rect x="60" y="8" rx="3" ry="3" width="88" height="10" />
          <Rect x="60" y="28" rx="3" ry="3" width="52" height="10" />
          <Circle cx="25" cy="25" r="25" />
        </SvgAnimatedLinearGradient>
      </View>
    )}
  ></FlatList>
);
