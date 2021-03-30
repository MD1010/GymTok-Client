import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { Keyboard } from "react-native";
import { DismissKeyboard } from "../shared/DismissKeyboard";
import { Button } from "react-native-elements";

type StackParamsList = {
  params: { videoUri: string };
};

export const PublishNewVideoScreen: React.FC = () => {
  const Header = () => {
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Player
            uri={route.params.videoUri}
            onVideoTap={() => null}
            isPlaying={false}
            resizeMode={"cover"}
            hidePlayButton
            containerStyle={{
              borderRadius: 15,
              height: 150,
              overflow: "hidden",
            }}
          />
          <View style={{ flex: 3 }}>
            <TextInput
              // autoFocus
              multiline
              style={{
                color: Colors.white,
                marginLeft: 15,
                height: 150,
                padding: 10,
                textAlignVertical: "top",
              }}
              placeholder={"Add a caption..."}
              placeholderTextColor={Colors.weakGrey}
            />
          </View>
        </View>
        <Text style={{ color: Colors.lightGrey2, alignItems: "center", alignSelf: "center", marginTop: 10 }}>
          Your friends will be notified when you the challenge will be uplaoded.
        </Text>
      </View>
    );
  };

  const Options = () => (
    <View style={{ flex: 4 }}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 16, color: Colors.white, flex: 4 }}>Tag People</Text>
        <Ionicons name="chevron-forward-outline" color={Colors.lightGrey2} size={22} />
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 16, color: Colors.white, flex: 4 }}>Add Hashtags</Text>
        <Ionicons name="chevron-forward-outline" color={Colors.lightGrey2} size={22} />
      </TouchableOpacity>
    </View>
  );

  const Footer = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title={"Post"}
        type="solid"
        style={{ overflow: "hidden" }}
        buttonStyle={{ backgroundColor: Colors.blue }}
        containerStyle={{
          marginBottom: 10,
          borderRadius: 10,
          overflow: "hidden",
          width: "90%",
        }}
      />
    </View>
  );

  const route = useRoute<RouteProp<StackParamsList, "params">>();

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Header />
        <Divider />
        <Options />
        <Divider />
        <Footer />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height - StatusBar.currentHeight,
    width: Dimensions.get("screen").width,
  },
});
