import { CardStyleInterpolators, StackNavigationOptions } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { Colors } from "../shared/styles/variables";

export const config: StackNavigationOptions = {
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: Colors.darkBlue,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 18,
    borderWidth: 0,
  },
  headerStyle: {
    backgroundColor: Colors.darkBlueOpaque,
    // borderBottomWidth: 0.3,
    // elevation: 0,
  },
  gestureEnabled: true,
  gestureDirection: "horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureResponseDistance: { vertical: Dimensions.get("screen").width },
};
