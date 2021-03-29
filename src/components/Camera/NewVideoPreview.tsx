import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Loader } from "../shared/Loader";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";

type StackParamsList = {
  params: { nextScreenToNavigate: { name: string; params: {} }; videoUri: string };
};

export const NewVideoPreview: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const navigateToScreen = route.params.nextScreenToNavigate.name;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useEffect(() => {
    console.log("in publish", route.params.videoUri);
  }, []);

  const onVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  //   useEffect(()=> {

  //   }, [isVideoLoaded])

  return (
    <>
      <View style={styles.container}>
        {/* {!isVideoLoaded && <Loader />} */}
        <View style={{ flex: 1 }}>
          {/* <Text>asdasdasd</Text> */}
          <Player uri={route.params.videoUri} isPlaying={true} resizeMode={"cover"} onVideoLoad={onVideoLoad} />
        </View>
        <View style={styles.nextBottomBarContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigateToScreen, { videoUri: route.params.nextScreenToNavigate.params })
            }
          >
            <Ionicons name="arrow-forward-circle-sharp" color={Colors.lightGrey} size={36} />
          </TouchableOpacity>
        </View>
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

  nextBottomBarContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    left: 0,
    bottom: 0,
    padding: 18,
    width: Dimensions.get("screen").width,
  },
});
