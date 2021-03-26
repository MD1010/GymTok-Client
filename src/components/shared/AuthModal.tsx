import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Colors } from "./styles/variables";

interface props {
  close: () => void;
}

export const AuthModal: React.FC<props> = ({ close }) => {
  const navigation = useNavigation();

  return (
    <Animatable.View animation="slideInUp" duration={100} style={styles.modalContainer}>
      <View style={styles.modalBody}>
        <TouchableWithoutFeedback onPress={() => close()}>
          <Ionicons name="close-outline" size={29} color={"white"} />
        </TouchableWithoutFeedback>

        <Text style={styles.title}>Sign up for GymTok</Text>
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
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    marginTop: Dimensions.get("screen").width / 2,
    zIndex: 1,
    width: Dimensions.get("screen").width,
  },
  modalBody: {
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height,
    padding: 20,
  },
  title: {
    marginTop: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    alignSelf: "center",
  },
  appDescription: {
    color: Colors.lightGrey2,
    fontSize: 15,
    textAlign: "center",
    marginTop: 25,
  },
  loginOptionContainer: {
    marginTop: 30,
    alignSelf: "center",
    width: "90%",
    // backgroundColor: "red",
    // width: 200,
  },
  loginOption: {
    flexDirection: "row",
    padding: 10,
    // justifyContent: "space-evenly",
    // backgroundColor: "blue",
    margin: 5,
  },
  signInOptionText: {
    marginLeft: 40,
    alignSelf: "center",
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
    marginTop: 50,
    color: Colors.white,
    justifyContent: "center",
  },
});
