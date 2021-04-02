import { CardStyleInterpolators } from "@react-navigation/stack";
import { ScreenNavigationMap } from "../Navigation/ScreenNavigationMap";
import { PublishScreen } from "./Publish";
import { SearchUsersScreen } from "./SearchUsers";
import { TagPeopleScreen } from "./TagPeople";

export const postChallengeScreens: ScreenNavigationMap[] = [
  { name: "Publish", screen: PublishScreen, options: { title: "Post" } },
  {
    name: "TagPeople",
    screen: TagPeopleScreen,
    options: {
      title: "Tagged People",
    },
  },
  {
    name: "SearchUser",
    screen: SearchUsersScreen,
    options: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  { name: "AddHashtags", screen: () => null },
];
