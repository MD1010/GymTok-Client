import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { registerIfNeed } from "../../store/auth/actions";
import { Colors } from "../shared/styles/variables";

type StackParamsList = {
  params: { isFullScreen: boolean; redirectedFromHome: string };
};

async function loginWithFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: process.env.FACEBOOK_APP_ID,
    });
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    if (result.type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=name,email,picture.width(300).height(300)&access_token=${result.token}`
      );
      // console.log(await response.json(), ' ', result.token);

      const res = await response.json();
      Alert.alert("Logged in!", `Hi ${res.name}!`);
      return res;
    } else {
      // type === 'cancel'
      return null;
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    return null;
  }
}

async function loginWithGoogle() {
  try {
    const result = await Google.logInAsync({
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      console.log(result.user);
      return result;
    } else {
      return null;
    }
  } catch (e) {
    alert(`Google Login Error: ${e}`);
    return null;
  }
}

export const NotLoggedInModal: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFacebookPress = async () => {
    const response = await loginWithFacebook();

    if (response != null) {
      const email = response.email;
      const username = email.substring(0, email.indexOf("@"));
      const password = "123456";
      const fullName = response.name;
      const photoUrl = response.picture.data.url;

      dispatch(registerIfNeed(username, password, fullName, email, photoUrl));
    }
  };

  const handleGooglePress = async () => {
    const result = await loginWithGoogle();

    if (result != null) {
      const email = result.user.email;
      const username = email.substring(0, email.indexOf("@"));
      const password = "123456";
      const fullName = username;
      const photoUrl = result.user.photoUrl;

      dispatch(registerIfNeed(username, password, fullName, email, photoUrl));
    }
  };
  // const route = useRoute<RouteProp<StackParamsList, "params">>();
  // const isFullScreen = route.params?.isFullScreen;
  return (
    <View style={styles.modalContainer}>
      <View style={[styles.modalBody]}>
        <View style={{ position: "absolute", left: 15, top: 15 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" size={29} color={"white"} />
          </TouchableWithoutFeedback>
        </View>
        <Text style={[styles.title]}>Sign up for GymTok</Text>
        <Text style={styles.appDescription}>
          Create a profile, follow other challenges, create your own challenges and more.
        </Text>

        <View style={styles.loginOptionContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <View style={styles.loginOption}>
              <Ionicons name="md-person-outline" size={18} color={"white"} />

              <Text style={styles.signInOptionText}>Use username and password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("facebook login!!");
              handleFacebookPress();
            }}
          >
            <View style={styles.loginOption}>
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode={"contain"}
                source={require("../../../assets/icons/facebook.png")}
              ></Image>

              <Text style={styles.signInOptionText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("google login!!");
              handleGooglePress();
            }}
          >
            <View style={styles.loginOption}>
              <Image
                style={{ width: 20, height: 20 }}
                resizeMode={"contain"}
                source={require("../../../assets/icons/google.png")}
              ></Image>

              <Text style={styles.signInOptionText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.loginFooter}>
          <Text style={styles.loginFooterText}>Already have and account? </Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginFooterText, { marginLeft: 5, color: Colors.lightGreen }]}>Log in </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  modalBody: {
    backgroundColor: Colors.darkBlue,
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    alignSelf: "center",
    marginTop: 80,
  },
  appDescription: {
    color: Colors.lightGrey2,
    fontSize: 15,
    textAlign: "center",
    marginTop: 35,
  },
  loginOptionContainer: {
    marginTop: 40,
    marginLeft: 10,
  },
  loginOption: {
    flexDirection: "row",
    padding: 10,
    margin: 7,
  },
  signInOptionText: {
    marginLeft: 40,
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  loginFooterText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  loginFooter: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    color: Colors.white,
    justifyContent: "center",
  },
});
