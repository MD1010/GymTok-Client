import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../shared/styles/variables";

interface NotLoggedInProps {
  text: string | null;
  icon: string | null;
}

export const NotLoggedInScreen: React.FC<NotLoggedInProps> = ({ text: componnentName, icon: componnentLogo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.tal}>
        <Text style={{ alignSelf: "center", fontSize: 25, color: Colors.gold }}>{componnentName}</Text>
        <Text style={{ alignSelf: "center", fontSize: 25, color: Colors.gold }}>Sign up for GymTok</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 15, color: Colors.gold }}>Register with username</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 15, color: Colors.red }}>Already have an accuont? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagFriends: {
    position: "absolute",
    backgroundColor: "#F0F0F0",
    marginTop: 120,
    zIndex: 1,
    height: Dimensions.get("window").height - 75,
    width: Dimensions.get("screen").width,
  },
  closeBtn: {
    height: 20,
  },
  Btns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "android" ? 20 : 10,
  },
  checkboxContainer: {
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height,
  },
  tal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    height: 240,
  },
});
