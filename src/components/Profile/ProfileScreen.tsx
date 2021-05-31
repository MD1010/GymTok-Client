import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IUser } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { GenericComponent } from "./genericComponent";
import { LogOutFromApp } from "./LogOutFromApp";
import {
  challengesSelector,
  numOfChallengesSelector,
  numOfRepliesSelector,
  postsActions,
  postsSelector,
  repliesSelector,
} from "../../store/posts/postsSlice";
import { getUserChallenges, getUserReplies } from "../../store/posts/actions";
import * as config from "../../config.json";

const itemsToFetch = 12;

interface IProfileTabs {
  user: IUser;
  isCurrentUserLoggedUser: boolean;
}
function ProfileTabs(props: IProfileTabs) {
  const dispatch = useDispatch();

  let currentChallenges;
  let currentReplies;
  let getMoreReplies;
  let getMoreChallenges;
  let hasMoreChallengesToFetchFlag;
  let hasMoreRepliesToFetchFlag;
  let setChallengesCallback;
  let setRepliesCallback;

  const user = props.user;
  const isCurrentUserLoggedUser = props.isCurrentUserLoggedUser;

  if (isCurrentUserLoggedUser) {
    currentChallenges = useSelector(challengesSelector);
    currentReplies = useSelector(repliesSelector);
    const { hasMoreChallengesToFetch, hasMoreRepliesToFetch } = useSelector(postsSelector);
    hasMoreChallengesToFetchFlag = hasMoreChallengesToFetch;
    hasMoreRepliesToFetchFlag = hasMoreRepliesToFetch;
    getMoreReplies = () => dispatch(getUserReplies());
    getMoreChallenges = () => dispatch(getUserChallenges());
    setChallengesCallback = (items) => dispatch(postsActions.setUserChallenges(items));
    setRepliesCallback = (items) => dispatch(postsActions.setUserReplies(items));
  } else {
    const [challenges, setChallenges] = useState([]);
    const [replies, setReplies] = useState([]);
    const [hasMoreChallengesToFetch, sethasMoreChallengesToFetch] = useState(true);
    const [hasMoreRepliesToFetch, sethasMoreRepliesToFetch] = useState(true);
    currentChallenges = challenges;
    currentReplies = replies;
    hasMoreChallengesToFetchFlag = hasMoreChallengesToFetch;
    hasMoreRepliesToFetchFlag = hasMoreRepliesToFetch;
    setChallengesCallback = setChallenges;
    setRepliesCallback = setReplies;

    getMoreReplies = async () => {
      const endpoint = `${config.BASE_API_ENPOINT}/posts`;
      console.log("fetching more replies and puting in state");
      const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
        size: itemsToFetch,
        page: Math.floor(replies.length / itemsToFetch),
        uid: user._id,
        isReply: true,
      });
      if (res.length < itemsToFetch) {
        sethasMoreRepliesToFetch(false);
      }
      setReplies([...replies, ...res]);
    };
    getMoreChallenges = async () => {
      console.log("fetching more challenges and puting in state");
      const endpoint = `${config.BASE_API_ENPOINT}/posts`;
      const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
        size: itemsToFetch,
        page: Math.floor(challenges.length / itemsToFetch),
        uid: user._id,
        isReply: false,
      });
      if (res.length < itemsToFetch) {
        sethasMoreChallengesToFetch(false);
      }

      setChallenges([...challenges, ...res]);
    };
  }

  const Tabs = createMaterialTopTabNavigator();
  return (
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.black }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let IconComponent;

          if (route.name === "Challanges") {
            iconName = "ios-apps";
          } else if (route.name === "Replies") {
            iconName = "person-circle";
          }
          return <Icon name={iconName} size={25} color={focused ? Colors.white : Colors.darkGrey} />;
        },
      })}
      tabBarOptions={{
        style: { backgroundColor: Colors.black },
        showIcon: true,
        showLabel: true,
        activeTintColor: Colors.white,
        labelStyle: { fontSize: 8 },
        indicatorStyle: { width: 65, marginHorizontal: 65 },
      }}
    >
      <Tabs.Screen
        name="Challanges"
        children={() => (
          <GenericComponent
            items={currentChallenges}
            loadMoreCallback={getMoreChallenges}
            hasMoreToFetch={hasMoreChallengesToFetchFlag}
            setItems={setChallengesCallback}
          />
        )}
      />
      <Tabs.Screen
        name="Replies"
        children={() => (
          <GenericComponent
            items={currentReplies}
            loadMoreCallback={getMoreReplies}
            hasMoreToFetch={hasMoreRepliesToFetchFlag}
            setItems={setRepliesCallback}
          />
        )}
      />
    </Tabs.Navigator>
  );
}
interface IProfileHeaderProps {
  user: IUser;
  isLoading: boolean;
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ user, isLoading }) => {
  const numOfChallenges = useSelector(numOfChallengesSelector);
  const numOfReplies = useSelector(numOfRepliesSelector);
  const Counter = ({ count, text }) => (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {isLoading ? "-" : count}
      </Text>
      <Text style={{ fontSize: 13, color: Colors.lightGrey2 }}>{text}</Text>
    </View>
  );

  const AboutMe = ({ name, description = null }) => (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ color: Colors.white }}>{name}</Text>
      {description ? <Text>{description}</Text> : null}
    </View>
  );

  return (
    <>
      {/* <View> */}

      {/* </View> */}

      <View style={{ paddingVertical: 40, backgroundColor: Colors.black }}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../../assets/avatar/user.png")} style={{ width: 100, height: 100 }} />
          <Text
            style={{
              color: Colors.white,
              fontWeight: "bold",
              fontSize: 18,
              margin: 15,
              marginBottom: 10,
            }}
          >
            @{user.username}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 5,
            alignSelf: "center",
            width: "70%",
          }}
        >
          <Counter text={"Challenges"} count={numOfChallenges} />
          <Divider
            style={{
              height: "100%",
              width: 1,
              backgroundColor: Colors.lightGrey,
            }}
          />
          <Counter text={"Replies"} count={numOfReplies} />
        </View>

        <AboutMe name={user.fullName} />
      </View>
    </>
  );
};

interface ProfileScreenProps {
  user: IUser;
  inProfileTab: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, inProfileTab = false }) => {
  const route = useRoute<any>();
  let isCurrentUserLoggedUser = true;
  let currentUser;
  if (route.params) {
    currentUser = route.params.user;
    isCurrentUserLoggedUser = false;
  } else {
    currentUser = user;
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProfileDetails() {
      setIsLoading(true);
      const profileDetailsEndpoint = `${config.BASE_API_ENPOINT}/users/profileDetails?userId=${currentUser._id}`;

      const { res, error } = await fetchAPI(RequestMethod.GET, profileDetailsEndpoint);
      res &&
        dispatch(
          postsActions.setProfileDetails({
            numOfChallenges: res.numOfChallenges,
            numOfReplies: res.numOfReplies,
          })
        );

      res && setIsLoading(false);
    }
    getProfileDetails();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {inProfileTab && <LogOutFromApp />}
      <ProfileHeader user={currentUser} isLoading={isLoading} />
      <Divider style={{ backgroundColor: Colors.weakGrey }} />
      <ProfileTabs user={currentUser} isCurrentUserLoggedUser={isCurrentUserLoggedUser} />
    </SafeAreaView>
  );
};
