import { CardStyleInterpolators } from "@react-navigation/stack";
import { Dimensions, StatusBar } from "react-native";
import { colors } from "react-native-elements";
import { getModalConfig } from "../Navigation/halfScreenModalConfig";
import { ScreenNavigationMap } from "../Navigation/ScreenNavigationMap";
import { Colors } from "../shared";
import { NewVideoPreview } from "./NewVideoPreview";
import { PublishNewVideoScreen } from "./PublishNewVideo";
import { SearchPersonScreen } from "./SearchPerson";
import { TagPeopleScreen } from "./TagPeople";

export const postChallengeScreens: ScreenNavigationMap[] = [
  { name: "Publish", screen: PublishNewVideoScreen, options: { title: "Post" } },
  {
    name: "TagPeople",
    screen: TagPeopleScreen,
    options: getModalConfig(60),
  },
  { name: "SearchPerson", screen: SearchPersonScreen },
  { name: "AddHashtags", screen: TagPeopleScreen },
  {
    name: "NewChallengePreview",
    screen: NewVideoPreview,
    options: {
      cardOverlayEnabled: true,
      headerTransparent: true,
      headerTitle: null,
      cardStyle: { backgroundColor: "transparent" },
      cardShadowEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation, // todo temp fix for blanck screen - needs to be fixed
    },
  },
];
