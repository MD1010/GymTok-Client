import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { IPost, IUser } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { GenericComponent } from "./genericComponent";
import { LogOutFromApp } from "./logOutFromApp";

const itemsToFetch = 12;
interface IProfileDetails {
  numOfChallenges: number;
  numOfReplies: number;
}
function ProfileTabs(user: IUser) {
  const Tabs = createMaterialTopTabNavigator();

  const [challenges, setChallenges] = useState([]);
  const [replies, setReplies] = useState([]);
  const [hasMoreChallenges, setHasMoreChallenges] = useState(true);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);

  const getMoreChallenges = async () => {
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
      size: itemsToFetch,
      page: Math.floor(challenges.length / itemsToFetch),
      uid: user._id,
      isReply: false,
    });
    if (res.length < itemsToFetch) {
      setHasMoreChallenges(false);
    }
    setChallenges([...challenges, ...res]);
  };
  const getMoreReplies = async () => {
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
      size: itemsToFetch,
      page: Math.floor(replies.length / itemsToFetch),
      uid: user._id,
      isReply: true,
    });
    if (res.length < itemsToFetch) {
      setHasMoreReplies(false);
    }
    setReplies([...replies, ...res]);
  };

  return (
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: Colors.darkBlueOpaque }}
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
        style: { backgroundColor: Colors.darkBlueOpaque },
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
            items={challenges}
            loadMoreCallback={getMoreChallenges}
            hasMoreToFetch={hasMoreChallenges}
          />
        )}
      />
      <Tabs.Screen
        name="Replies"
        children={() => (
          <GenericComponent items={replies} loadMoreCallback={getMoreReplies} hasMoreToFetch={hasMoreReplies} />
        )}
      />
    </Tabs.Navigator>
  );
}
interface IProfileHeaderProps {
  details: IProfileDetails;
  user: IUser;
  isLoading: boolean;
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ user, isLoading, details }) => {
  const [numOfChallenges, setNumOfChallenges] = useState<string | number>("-");
  const [numOfReplies, setNumOfReplies] = useState<string | number>("-");
  useEffect(() => {
    if (!isLoading) {
      setNumOfChallenges(details.numOfChallenges);
      setNumOfReplies(details.numOfReplies);
    }
  }, [isLoading]);

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

      <View style={{ paddingVertical: 40, backgroundColor: Colors.darkBlueOpaque }}>
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

export const ProfileScreen: React.FC<IUser> = (user?: IUser) => {
  const route = useRoute<any>();
  let currentUser = route.params ? route.params.user : user;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>();

  useEffect(() => {
    setIsLoading(true);
    async function getProfileDetails() {
      const profileDetailsEndpoint = `${process.env.BASE_API_ENPOINT}/users/profileDetails?userId=${currentUser._id}`;

      const { res, error } = await fetchAPI(RequestMethod.GET, profileDetailsEndpoint);

      res && setProfileDetails(res);
      res && setIsLoading(false);
    }
    getProfileDetails();
  }, []);

  return (
    <>
      <LogOutFromApp />
      <ProfileHeader details={profileDetails} user={currentUser} isLoading={isLoading} />
      <Divider style={{ backgroundColor: Colors.weakGrey }} />
      <ProfileTabs {...currentUser} />
    </>
  );
};
