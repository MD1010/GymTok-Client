import { Ionicons, Fontisto } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, Divider } from "react-native-elements";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Player, DismissKeyboard, SubmitButton, Colors, TouchableHighlightButton } from "../shared";

type StackParamsList = {
  params: { videoUri: string };
};

export const PublishNewVideoScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const navigation = useNavigation();

  const Header = () => {
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Player
            uri={route.params?.videoUri}
            onVideoTap={() => null}
            isPlaying={false}
            resizeMode={"cover"}
            hidePlayButton
            containerStyle={styles.videoPlayerContainer}
          />
          <View style={{ flex: 3 }}>
            <TextInput
              multiline
              style={styles.addCaptionInput}
              placeholder={"Add a caption..."}
              placeholderTextColor={Colors.weakGrey}
            />
          </View>
        </View>
        <Text style={styles.info}>Your friends will be notified when you the challenge will be uplaoded.</Text>
      </View>
    );
  };

  const Options = () => (
    <View style={{ flex: 4 }}>
      <TouchableHighlightButton
        actionWillNavigate
        optionText={"Tag People"}
        onSelect={() => navigation.navigate("TagPeople", { videoUri: route.params?.videoUri })}
        icon={<Fontisto name="hashtag" color={Colors.lightGrey2} size={14} />}
      />

      <TouchableHighlightButton
        actionWillNavigate
        optionText={"Add Hashtags"}
        onSelect={() => navigation.navigate("AddHashtags")}
        icon={<Fontisto name="at" color={Colors.lightGrey2} size={14} />}
      />
    </View>
  );

  const Footer = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SubmitButton
        buttonText={"Post"}
        type="solid"
        backgroundColor={Colors.blue}
        containerStyle={{ marginBottom: 15 }}
      />
    </View>
  );

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
    height: Dimensions.get("window").height - StatusBar.currentHeight,
    width: Dimensions.get("screen").width,
  },
  videoPlayerContainer: {
    borderRadius: 15,
    height: 150,
    overflow: "hidden",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colors.white,
    flex: 4,
  },
  info: {
    color: colors.grey3,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  addCaptionInput: {
    color: Colors.white,
    marginLeft: 15,
    height: 150,
    padding: 10,
    textAlignVertical: "top",
  },
});
