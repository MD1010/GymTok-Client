import { Ionicons, Fontisto } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, Divider } from "react-native-elements";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { IUser } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Player, DismissKeyboard, SubmitButton, Colors, TouchableHighlightButton, Loader } from "../shared";

type StackParamsList = {
  params: { videoUri: string; taggedPeople: IUser[]; isReply: boolean; hashtags: string[]; challengeId: string };
};

export const PublishScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const navigation = useNavigation();
  const isReply = route.params.isReply;
  const taggedPeople = route?.params?.taggedPeople;
  const hashtags = route?.params?.hashtags;
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser } = useSelector(authSelector);
  const captionInput = useRef<string>();

  const Header = () => {
    const handleSetCaption = (text: string) => {
      setCaption(text);
      captionInput.current = text;
    };
    const [caption, setCaption] = useState(null);
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Player
            uri={route.params?.videoUri}
            isMuted
            resizeMode={"cover"}
            hidePlayButton
            containerStyle={styles.videoPlayerContainer}
          />
          <View style={{ flex: 2 }}>
            <DismissKeyboard>
              <TextInput
                multiline
                style={styles.addCaptionInput}
                placeholder={"Add a caption..."}
                placeholderTextColor={Colors.weakGrey}
                value={caption}
                onChangeText={(text) => {
                  handleSetCaption(text);
                }}
              />
            </DismissKeyboard>
          </View>
        </View>
        {!isReply && <Text style={styles.info}>Your friends will be notified when your challenge is uploaded.</Text>}
      </View>
    );
  };

  const displaySelectedTaggedFriends = () => {
    if (!taggedPeople?.length) return null;
    if (taggedPeople?.length === 1) {
      return taggedPeople[0].fullName;
    }
    return `${taggedPeople.length} selected`;
  };

  const displaySelectedHashtags = () => {
    if (!hashtags?.length) return null;
    if (hashtags?.length === 1) {
      return hashtags[0];
    }
    return `${hashtags.length} selected`;
  };

  const publishChallenge = async () => {
    let formData = new FormData();

    formData.append("description", captionInput.current);
    formData.append("userId", loggedUser._id);
    formData.append("video", {
      name: "dov-test.mp4",
      uri: route.params.videoUri,
      type: "video/mp4",
    } as any);
    formData.append("selectedFriends", JSON.stringify(taggedPeople));
    formData.append("hashtags", JSON.stringify(hashtags));

    setIsLoading(true);
    const { res, error } = await fetchAPI(
      RequestMethod.POST,
      `${process.env.BASE_API_ENPOINT}/challenges/upload`,
      formData
    );

    if (res) {
      console.log("res = !", res);
      navigation.navigate("Home");
    } else alert(error);
    setIsLoading(false);
  };

  const replyChallenge = async () => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("description", captionInput.current);
    formData.append("replierId", loggedUser._id);
    formData.append("challengeId", route.params.challengeId);
    formData.append("video", {
      name: "dov-test.mp4",
      uri: route.params.videoUri,
      type: "video/mp4",
    } as any);

    const { res, error } = await fetchAPI(
      RequestMethod.POST,
      `${process.env.BASE_API_ENPOINT}/replies/upload`,
      formData
    );

    if (res) {
      navigation.navigate("Home");
    } else alert(error);
    setIsLoading(false);
  };

  const onSubmit = () => {
    if (isReply) {
      replyChallenge();
    } else {
      // challenge
      publishChallenge();
    }
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
        optionInfoText={displaySelectedHashtags()}
        optionText={"Add Hashtags"}
        onSelect={() =>
          navigation.navigate("AddHashtag", {
            selectedHashtags: route.params?.hashtags?.length ? route.params?.hashtags : [],
          })
        }
        icon={<Fontisto name="hashtag" color={Colors.lightGrey2} size={14} />}
      />
    </View>
  );

  const Footer = () => (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <SubmitButton buttonText={"Post"} type="solid" backgroundColor={Colors.blue} onSubmit={onSubmit} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {!isReply && (
        <>
          <Divider />
          <Options />
        </>
      )}
      {!isLoading ? (
        <>
          <Divider />
          {/* <SubmitButton buttonText={"CHECK"} onSubmit={() => console.log(123123)} type={"solid"} /> */}
          <Footer />
        </>
      ) : (
        <Loader style={{ marginBottom: 50 }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - StatusBar.currentHeight,
    width: Dimensions.get("screen").width,
    flex: 1,
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
