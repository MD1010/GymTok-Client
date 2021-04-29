// import { Icon } from "expo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { GenericComponent } from "./genericComponent";

function ProfileTabs() {
  const Tabs = createMaterialTopTabNavigator();
  const [challenges, setChallenges] = useState([]);
  const [replies, setReplies] = useState([]);
  const { loggedUser } = useSelector(authSelector);

  const getEnteties = async (postType: String) => {
    const entetieEndpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser._id}/${postType}`;
    console.log(entetieEndpoint);

    const { res, error } = await fetchAPI(RequestMethod.GET, entetieEndpoint);

    const setEntetie = postType == "challenges" ? setChallenges : setReplies;
    res &&
      setEntetie(
        res.map((entetie, index) => {
          return {
            _id: index,
            url: entetie.video,
            gif: entetie.gif,
          };
        })
      );
  };
  useEffect(() => {
    getEnteties("challenges");
    getEnteties("replies");
  }, []);
  return (
    <NavigationContainer independent={true}>
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

            // You can return any component that you like here!
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
          // component={Home}
          children={() => <GenericComponent items={challenges} />}
        />
        <Tabs.Screen
          name="Replies"
          children={() => <GenericComponent items={replies} />}
          // component={Settings}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
// interface ProfileProps {
//   items: Item[];
// }
interface IprofileDetails {
  numOfchallenges: number;
  numOflikes: number;
  numOfreplies: number;
}
const ProfileHeader: React.FC<IprofileDetails> = ({
  numOfchallenges,
  numOfreplies,
  numOflikes,
}) => {
  return (
    <View style={{ paddingTop: 40, paddingLeft: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../../../assets/avatar/01.jpg")}
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
                {numOfchallenges}
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
                {numOfreplies}
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
                {numOflikes}
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
          Moris Angus
        </Text>
        <Text style={{ color: Colors.white }}>
          Basketball player | Runner | Swimmer{" "}
        </Text>
        <Text style={{ color: Colors.white }}>www.mysite.com</Text>
      </View>
    </View>
  );
};
interface IprofileProps {
  userId: string;
}

export const ProfileScreen: React.FC<IprofileProps> = ({ userId }) => {
  // return <GenericComponent items={items} />;
  const [profileDetails, setProfileDetails] = useState<IprofileDetails>();
  useEffect(() => {
    async function getProfileDetails() {
      const profileDetailsEndpoint = `${process.env.BASE_API_ENPOINT}/users/profileDetails?userId=${userId}`;
      console.log(profileDetailsEndpoint);

      const { res, error } = await fetchAPI(
        RequestMethod.GET,
        profileDetailsEndpoint
      );
      res && setProfileDetails(res);
    }
    getProfileDetails();
  }, []);

  return (
    <>
      <ProfileHeader {...profileDetails} />
      <ProfileTabs />
    </>
  );
};
