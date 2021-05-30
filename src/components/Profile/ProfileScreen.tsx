import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IUser } from "../../interfaces";
import { postsSelector } from "../../store/posts/postsSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { GenericComponent } from "./genericComponent";
import { LogOutFromApp } from "./LogOutFromApp";
import * as config from "../../config.json"

const itemsToFetch = 12;

interface IProfileTabs {
  user: IUser;
  getProfileDetails: () => void;
}

interface IProfileDetails {
  numOfChallenges: number;
  numOfReplies: number;
}

const ProfileTabs: React.FC<IProfileTabs> = ({ user, getProfileDetails }) => {
  const navigation = useNavigation();
  const Tabs = createMaterialTopTabNavigator();
  const { userUploadedChallenges, userUploadedReplies } = useSelector(postsSelector)
  const [challenges, setChallenges] = useState<IPost[]>([]);
  const [replies, setReplies] = useState<IPost[]>([]);
  const [hasMoreChallenges, setHasMoreChallenges] = useState(true);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);

  const getMoreChallenges = async () => {
    const endpoint = `${config.BASE_API_ENPOINT}/posts`;
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
    const endpoint = `${config.BASE_API_ENPOINT}/posts`;
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

  useEffect(() => {
    if (!hasMoreReplies) {
      const updatedReplies = addUserRepliesToReplies();
    }
  }, [hasMoreReplies]);

  useEffect(() => {
    if (!hasMoreChallenges) {
      const updatedChallenges = addUserChallengesToChallenges();
    }
  }, [hasMoreChallenges]);

  useEffect(() => {
    getProfileDetails();
  }, [userUploadedChallenges, userUploadedReplies])

  const addUserRepliesToReplies = () => {
    const updatedReplies = [...replies];
    for (const userUploadedReply of userUploadedReplies) {
      const existReply = updatedReplies.find(reply => reply._id === userUploadedReply._id);
      if (!existReply) {
        updatedReplies.push(userUploadedReply);
      }
    }

    console.log("replies.length !== updatedReplies.length", replies.length !== updatedReplies.length)
    replies.length !== updatedReplies.length && setReplies(updatedReplies);

    return updatedReplies;
  }

  const addUserChallengesToChallenges = () => {
    const updatedChallenges = [...challenges];
    for (const userUploadedChallenge of userUploadedChallenges) {
      const existChallenge = updatedChallenges.find(challenge => challenge._id === userUploadedChallenge._id);
      if (!existChallenge) {
        updatedChallenges.push(userUploadedChallenge);
      }
    }

    console.log("challenges.length !== updatedReplies.length", replies.length !== updatedChallenges.length)
    challenges.length !== updatedChallenges.length && setChallenges(updatedChallenges);

    return updatedChallenges;
  }

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
            items={challenges}
            loadMoreCallback={getMoreChallenges}
            hasMoreToFetch={hasMoreChallenges}
            setItems={setChallenges}
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
            setItems={setReplies}
          />
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
  let currentUser = route.params ? route.params.user : user;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileDetails, setProfileDetails] = useState<IProfileDetails>();

  async function getProfileDetails() {
    setIsLoading(true);
    const profileDetailsEndpoint = `${config.BASE_API_ENPOINT}/users/profileDetails?userId=${currentUser._id}`;

    const { res } = await fetchAPI(RequestMethod.GET, profileDetailsEndpoint);

    res && setProfileDetails(res);
    res && setIsLoading(false);
  }

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {inProfileTab && <LogOutFromApp />}
      <ProfileHeader details={profileDetails} user={currentUser} isLoading={isLoading} />
      <Divider style={{ backgroundColor: Colors.weakGrey }} />
      <ProfileTabs user={currentUser} getProfileDetails={getProfileDetails} />
    </SafeAreaView>
  );
};
