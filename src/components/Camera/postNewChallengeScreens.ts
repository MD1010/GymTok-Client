import { FC } from "react";
import { NewVideoPreview } from "./NewVideoPreview";
import { PublishNewVideoScreen } from "./PublishNewVideo";
import { SearchPersonScreen } from "./SearchPerson";
import { TagPeopleScreen } from "./TagPeople";
import { StackNavigationOptions } from "@react-navigation/stack";
import { ScreenNavigationMap } from "../Navigation/ScreenNavigationMap";

export const postChallengeScreens: ScreenNavigationMap[] = [
  { name: "Publish", screen: PublishNewVideoScreen, options: { title: "Post" } },
  { name: "TagPeople", screen: TagPeopleScreen },
  { name: "SearchPerson", screen: SearchPersonScreen },
  {
    name: "NewChallengePreview",
    screen: NewVideoPreview,
    options: {
      headerTransparent: true,
      headerTitle: null,
    },
  },
];
