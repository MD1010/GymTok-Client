import { CardStyleInterpolators } from "@react-navigation/stack";
import { ScreenNavigationMap } from "../Navigation/ScreenNavigationMap";
import { NewVideoPreview } from "./NewVideoPreview";
import { PublishNewVideoScreen } from "./PublishNewVideo";
import { SearchUsersScreen } from "./SearchUsers";
import { TagPeopleScreen } from "./TagPeople";

export const postChallengeScreens: ScreenNavigationMap[] = [
  { name: "Publish", screen: PublishNewVideoScreen, options: { title: "Post" } },
  {
    name: "TagPeople",
    screen: TagPeopleScreen,
    options: {
      title: "Tag People",
    },
    // options: getModalConfig(60),
  },
  {
    name: "SearchUser",
    screen: SearchUsersScreen,
    options: {
      headerShown: false,
      animationEnabled: false,
      // gestureDirection: "horizontal",
    },
  },
  { name: "AddHashtags", screen: () => null },
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
