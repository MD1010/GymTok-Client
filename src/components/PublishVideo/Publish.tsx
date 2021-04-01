import { Ionicons, Fontisto } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, Divider } from "react-native-elements";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { IUser } from "../../interfaces";
import { Player, DismissKeyboard, SubmitButton, Colors, TouchableHighlightButton } from "../shared";

type StackParamsList = {
  params: { videoUri: string; taggedPeople: IUser[] };
};

export const PublishScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const navigation = useNavigation();

  console.log("render no tagged", route.params.taggedPeople?.length);
  const Header = () => {
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Player
            uri={route.params?.videoUri}
            isPlaying={true}
            isMuted
            resizeMode={"cover"}
            hidePlayButton
            containerStyle={styles.videoPlayerContainer}
          />
          <View style={{ flex: 2 }}>
            <TextInput
              multiline
              style={styles.addCaptionInput}
              placeholder={"Add a caption..."}
              placeholderTextColor={Colors.weakGrey}
            />
          </View>
        </View>
        <Text style={styles.info}>Your friends will be notified when your challenge is uploaded.</Text>
      </View>
    );
  };

  const displaySelectedTaggedFriends = () => {
    if (!route?.params?.taggedPeople?.length) return null;
    if (route?.params?.taggedPeople?.length === 1) {
      return route?.params?.taggedPeople[0].fullName;
    }
    return `${route.params.taggedPeople.length} selected`;
  };

  const Options = () => (
    <View style={{ flex: 4 }}>
      <TouchableHighlightButton
        actionWillNavigate
        optionInfoText={displaySelectedTaggedFriends()}
        optionText={"Tag People"}
        onSelect={() =>
          route.params?.taggedPeople?.length
            ? navigation.navigate("TagPeople", { selectedUsers: route.params?.taggedPeople })
            : navigation.navigate("SearchUser", { excludedUsersToSearch: route.params?.taggedPeople })
        }
        icon={<Fontisto name="at" color={Colors.lightGrey2} size={14} />}
      />
      <TouchableHighlightButton
        actionWillNavigate
        optionText={"Add Hashtags"}
        onSelect={() => navigation.navigate("AddHashtags")}
        icon={<Fontisto name="hashtag" color={Colors.lightGrey2} size={14} />}
      />
    </View>
  );

  const Footer = () => (
    <View style={{ flex: 1, alignItems: "center", top: 20 }}>
      <SubmitButton buttonText={"Post"} type="solid" backgroundColor={Colors.blue} />
    </View>
  );

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <Header />
        <Divider />
        <Options />
        <Divider />
        <Footer />
      </SafeAreaView>
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
    height: 200,
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
