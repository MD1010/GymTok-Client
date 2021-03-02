import React from "react";
import { Button, Dimensions, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import * as Animatable from "react-native-animatable";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
import { Colors } from "./styles/variables";
import { useNavigation } from "@react-navigation/native";

interface props {
    close: () => void;
}
export const AuthModal: React.FC<props> = ({close }) => {

  const navigation = useNavigation();

  return (
  
    <Animatable.View animation="fadeInUpBig" duration={500} style={styles.tagFriends}>
        <View style={styles.checkboxContainer}>
        
      <View style={styles.Btns}>
        <Button
          title="Cancel"
          color={Colors.red}
          onPress={() => {
            close();
          }}
        />
      </View>
      
      <View style={styles.tal}> 
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
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
    tagFriends: {
        position: "absolute",
        backgroundColor: "#F0F0F0",
        marginTop: 120,
        zIndex: 1,
        height:  Dimensions.get("window").height - 75,
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
        height:Dimensions.get("window").height 
      },
      tal: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        height: 250
      }
});
