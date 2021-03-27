import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "../shared/styles/variables";
import { RouteProp } from "@react-navigation/native";

type StackParamsList = {
  params: { isFullScreen: boolean; redirectedFromHome: string };
};

export const NotLoggedInModal: React.FC = () => {
  const navigation = useNavigation();
  // const route = useRoute<RouteProp<StackParamsList, "params">>();
  // const isFullScreen = route.params?.isFullScreen;
  return (
    <View style={styles.modalContainer}>
      <View style={[styles.modalBody]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={29} color={"white"} />
        </TouchableWithoutFeedback>

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
    padding: 20,
    top: 10,
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
    marginTop: 25,
  },
  loginOptionContainer: {
    marginTop: 30,
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
    bottom: 60,
    alignSelf: "center",
    // marginTop: 60,
    color: Colors.white,
    justifyContent: "center",
  },
});
