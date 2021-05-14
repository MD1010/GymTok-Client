import { Fontisto } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, Divider } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { addReplyToPost } from "../../store/posts/actions";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors, Loader, Player, SubmitButton, TouchableHighlightButton } from "../shared";

type StackParamsList = {
  params: {
    videoUri: string;
    taggedPeople: IUser[];
    isReply: boolean;
    hashtags: string[];
    postId: string;
  };
};

export const PublishScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    const [caption, setCaption] = useState(captionInput.current);
    return (
      <View style={{ padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Player
            uri={route.params.videoUri}
            isMuted
            resizeMode={"cover"}
            hidePlayButton
            style={{ width: 200, height: 200 }}
            containerStyle={styles.videoPlayerContainer}
          />
          {/* <View style={{ backgroundColor: "red", width: 200 }}></View> */}

          <View style={{ flex: 2 }}>
            <TextInput
              multiline
              blurOnSubmit
              style={styles.addCaptionInput}
              placeholder={"Add a caption..."}
              placeholderTextColor={Colors.weakGrey}
              value={caption}
              onChangeText={handleSetCaption}
            />
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
    formData.append("createdBy", loggedUser._id);
    formData.append("video", {
      name: "upload",
      uri: route.params.videoUri,
      type: "video/mp4",
    } as any);
    formData.append("taggedUsers", JSON.stringify(taggedPeople?.map((user) => user._id)));
    formData.append("hashtags", JSON.stringify(hashtags));

    setIsLoading(true);
    const { res, error } = await fetchAPI(RequestMethod.POST, `${process.env.BASE_API_ENPOINT}/posts/upload`, formData);

    if (res) {
      setIsLoading(false);
      navigation.navigate("Home");
    } else if (error) {
      setIsLoading(false);
      alert(JSON.stringify(error));
    }
  };

  const replyChallenge = async () => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("description", captionInput.current);
    formData.append("createdBy", loggedUser._id);
    formData.append("video", {
      name: "upload",
      uri: route.params?.videoUri,
      type: "video/mp4",
    } as any);

    const { res, error } = await fetchAPI(
      RequestMethod.POST,
      `${process.env.BASE_API_ENPOINT}/posts/${route.params?.postId}/reply/upload`,
      formData
    );

    if (res) {
      setIsLoading(false);
      navigation.navigate("Home", { screen: "PostReplies", params: { newReply: res } });
      dispatch(addReplyToPost(route.params?.postId, res));
    } else if (error) {
      setIsLoading(false);
      alert(JSON.stringify(error));
    }
  };

  const onSubmit = () => {
    if (isReply) {
      replyChallenge();
    } else {
      // challenge
      if (!loggedUser) {
        return navigation.navigate("NotLoggedIn", {
          redirectScreen: "Publish",
        });
      }
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
            ? navigation.navigate("TagPeople", {
                selectedUsers: route.params?.taggedPeople,
              })
            : navigation.navigate("SearchUser", {
                excludedUsersToSearch: route.params?.taggedPeople,
              })
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
    <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}>
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("screen").width,
    flex: 1,
  },
  videoPlayerContainer: {
    borderRadius: 15,
    height: 200,
    width: 200,
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
