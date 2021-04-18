import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { Colors } from "react-native-paper";

export const getModalConfig = (
  heightInPercent: number
): StackNavigationOptions => {
  return {
    headerTransparent: true,
    title: "Tag People",
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    cardStyle: {
      top: `${100 - heightInPercent}%`,
      maxHeight: `${heightInPercent}%`, // todo fix this hotfix
      backgroundColor: Colors.black,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    gestureDirection: "vertical",
    gestureResponseDistance: { vertical: Dimensions.get("screen").height },
    animationEnabled: true,
    gestureEnabled: true,
  };
};
