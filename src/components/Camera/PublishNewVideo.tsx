import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { Loader } from "../shared/Loader";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { StackScreenProps } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { generateThumbnail } from "../../utils/generateThumbnail";
import { Divider } from "react-native-elements";

type StackParamsList = {
  params: { videoUri: string };
};

export const PublishNewVideoScreen: React.FC = () => {
  // const [imageUri, setImageUri] = useState<string>();
  // useEffect(() => {
  //   (async () => {
  //     const image = await generateThumbnail(route.params.videoUri);
  //     setImageUri(image);
  //   })();
  // }, []);
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
          <View style={{ flex: 3, padding: 10 }}>
            <TextInput
              autoFocus
              multiline
              style={{
                color: Colors.white,
                marginLeft: 15,
                height: 150,
                textAlignVertical: "top",
              }}
              placeholder={"Add a caption..."}
              placeholderTextColor={Colors.weakGrey}
            />
          </View>
        </View>
        <Text style={{ color: Colors.lightGrey2, alignItems: "center", alignSelf: "center" }}>
          Your friends will be notified when you the challenge will be uplaoded.
        </Text>
      </View>
    );
  };

  const Options = () => <View style={{ flexDirection: "row", flex: 1 }}></View>;

  const Footer = () => <View style={{ flexDirection: "row", flex: 1 }}></View>;

  const route = useRoute<RouteProp<StackParamsList, "params">>();

  return (
    <>
      <View style={styles.container}>
        <Header />
        <Divider />
        <Options />
        <Divider />
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    height: Dimensions.get("window").height,
    width: Dimensions.get("screen").width,
  },
  // container: {
  //   flexDirection: "column",
  //   flex: 1,
  //   backgroundColor: Colors.darkBlue,
  //   height: Dimensions.get("window").height,
  // },
  // description: {
  //   height: UIConsts.bottomNavbarHeight - 15,

  //   paddingLeft: 10,
  //   opacity: 0.6,
  //   color: Colors.black,
  //   backgroundColor: Colors.lightGrey,
  //   borderColor: Colors.gold,
  //   borderWidth: 1,
  // },
  // tagFriends: {
  //   position: "absolute",
  //   backgroundColor: "#F0F0F0",
  //   marginTop: 120,
  //   zIndex: 1,
  //   height: 830,
  //   width: Dimensions.get("screen").width,
  // },
  // btnOptions: {
  //   flex: 0.5,
  //   display: "flex",
  //   flexDirection: "row-reverse",
  //   // display: "flex",
  //   justifyContent: "space-between",
  //   // height: Dimensions.get("screen").height / 10,

  //   // alignContent: "center",
  //   // width: Dimensions.get("screen").width,
  //   // // height: Platform.OS === "android" ? 51 : 75,
  //   // height: Dimensions.get("screen").height / 10,
  //   // // marginTop:
  //   // //   Platform.OS === "android"
  //   // //     ? Dimensions.get("screen").height - 189
  //   // //     : Dimensions.get("screen").height - 160,
  //   // marginTop: Dimensions.get("screen").height / 1.3,
  //   // position: "absolute",
  //   // flexDirection: "row",
  //   // alignItems: "center",
  //   // backgroundColor: Colors.darkBlue,
  // },
  // tagBtn: {
  //   marginLeft: 15,
  // },
  // tagIcon: {
  //   marginLeft: 10,
  // },
  // publishBtn: {
  //   marginRight: 15,
  // },
  // publishIcon: {
  //   marginLeft: 3.5,
  // },
  // btnText: {
  //   color: "white",
  //   fontSize: 10,
  // },
  // spinnerTextStyle: {
  //   color: "#FFF",
  // },
});
