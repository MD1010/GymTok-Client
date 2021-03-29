import { createContext } from "react";
import { ViewStyle } from "react-native";

interface IChallengesScreenContext {
  containerStyle: ViewStyle;
}

export const challengeContext = createContext<IChallengesScreenContext>({} as IChallengesScreenContext);
