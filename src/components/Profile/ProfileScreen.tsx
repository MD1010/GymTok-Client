// import { Icon } from "expo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { IPost, IUser } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { GenericComponent } from "./genericComponent";
const itemsToFetch = 12;
interface IProfileDetails {
  numOfChallenges: number;
  numOfReplies: number;
  numOfLikes: number;
}
function ProfileTabs(user: IUser) {
  const Tabs = createMaterialTopTabNavigator();

  const [challenges, setChallenges] = useState([]);
  const [replies, setReplies] = useState([]);
  const [hasMoreChallenges, setHasMoreChallenges] = useState(true);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);

  // const { loggedUser } = useSelector(authSelector);

  const getMoreChallenges = async () => {
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(challenges.length / itemsToFetch),
        uid: user._id,
        isReply: false,
      }
    );
    if (res.length < itemsToFetch) {
      setHasMoreChallenges(false);
    }
    setChallenges([...challenges, ...res]);
  };
  const getMoreReplies = async () => {
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(replies.length / itemsToFetch),
        uid: user._id,
        isReply: true,
      }
    );
    if (res.length < itemsToFetch) {
      setHasMoreReplies(false);
    }
    setReplies([...replies, ...res]);
  };

  return (
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.black }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Challanges") {
            iconName = "ios-apps";
          } else if (route.name === "Replies") {
            iconName = "person-circle";
          }
          return (
            <Icon
              name={iconName}
              size={25}
              color={focused ? Colors.white : Colors.darkGrey}
            />
          );
        },
      })}
      tabBarOptions={{
        style: { backgroundColor: Colors.black },
        showIcon: true,
        showLabel: true,
        activeTintColor: Colors.white,
        labelStyle: { fontSize: 8 },
        indicatorStyle: { backgroundColor: "transparent" },
      }}
    >
      <Tabs.Screen
        name="Challanges"
        children={() => (
          <GenericComponent
            items={challenges}
            loadMoreCallback={getMoreChallenges}
            hasMoreToFetch={hasMoreChallenges}
          />
        )}
      />
      <Tabs.Screen
        name="Replies"
        children={() => (
          <GenericComponent
            items={replies}
            loadMoreCallback={getMoreReplies}
            hasMoreToFetch={hasMoreReplies}
          />
        )}
      />
    </Tabs.Navigator>
  );
}
interface IProfileHeaderProps {
  details: IProfileDetails;
  user: IUser;
}

const ProfileHeader: React.FC<IProfileHeaderProps> = (
  props: IProfileHeaderProps
) => {
  const { numOfChallenges, numOfReplies, numOfLikes } = props.details;
  const user = props.user;
  const { authError, loggedUser } = useSelector(authSelector);
  return (
    <View style={{ paddingTop: 40, paddingLeft: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            // source={user.image ? {uri: user.image} : require('../../../assets/avatar/user.png')}
            source={require("../../../assets/avatar/user.png")}
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
          />
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {numOfChallenges}
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Challenges
              </Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 45 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {numOfReplies}
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Replies
              </Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 45 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {numOfLikes}
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Likes
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ margin: 10, marginTop: 15 }}>
        <Text style={{ fontWeight: "bold", color: Colors.white }}>
          {loggedUser.fullName}
        </Text>
        <Text style={{ color: Colors.white }}>
          Basketball player | Runner | Swimmer{" "}
        </Text>
        <Text style={{ color: Colors.white }}>www.mysite.com</Text>
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC<IUser> = (user: IUser) => {
  // const { loggedUser } = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>();

  useEffect(() => {
    setIsLoading(true);
    async function getProfileDetails() {
      const profileDetailsEndpoint = `${process.env.BASE_API_ENPOINT}/users/profileDetails?userId=${user._id}`;

      const { res, error } = await fetchAPI(
        RequestMethod.GET,
        profileDetailsEndpoint
      );

      res && setProfileDetails(res);
      res && setIsLoading(false);
    }
    getProfileDetails();
  }, []);

  return isLoading ? (
    <Text>loading...</Text>
  ) : (
    <>
      <ProfileHeader details={profileDetails} user={user} />
      <ProfileTabs {...user} />
    </>
  );
};
