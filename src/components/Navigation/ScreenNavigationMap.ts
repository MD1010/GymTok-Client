import { StackNavigationOptions } from "@react-navigation/stack";
import { FC } from "react";

export interface ScreenNavigationMap {
  name: string;
  screen: FC;
  options?: StackNavigationOptions;
}
