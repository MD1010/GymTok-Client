import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../shared/styles/variables";

interface NotLoggedInProps {
  text: string | null;
  icon: () => JSX.Element;
  description: string;
  redirectScreen?: string;
}

export const NotLoggedInScreen: React.FC<NotLoggedInProps> = ({
  text,
  icon: Icon,
  description,
  redirectScreen = "Home",
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.darkBlueOpaque,
            padding: 15,
            borderBottomWidth: 0.3,
            borderColor: Colors.lightGrey2,
          }}
        >
          <Text style={styles.pageTitle}>{text}</Text>
        </View>

        <View style={styles.body}>
          <Icon />
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate("NotLoggedIn", { redirectScreen });
            }}
          >
            <Text style={styles.buttonTextStyle}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
  },
  pageTitle: {
    alignSelf: "center",
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
    // marginTop: 25,
  },
  container: {
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",

    fontSize: 25,
    color: Colors.white,
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    color: Colors.lightGrey2,
    alignSelf: "center",
  },

  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 16,
    padding: 15,
    alignSelf: "center",
  },

  buttonStyle: {
    borderWidth: 0,
    color: "#FFFFFF",
    marginTop: 20,
    width: 200,
    alignSelf: "center",
    backgroundColor: Colors.lightPurpule,
  },
});
