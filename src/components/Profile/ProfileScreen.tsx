import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsMount } from "../../hooks/useIsMount";
import { generateThumbnail } from "../../utils/generateThumbnail";
import { Colors } from "../shared/styles/variables";
import { Item } from "./interfaces";

interface ProfileProps {
  items: Item[];
  numColumns?: number;
  upperStyle?: ViewStyle;
  bottomStyle?: ViewStyle;
  horizontalView?: boolean;
}

const ProfileHeader: React.FC = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/avatar/01.jpg")}
          style={{ width: 75, height: 75, borderRadius: 37.5 }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "black" }}>20</Text>
            <Text style={{ fontSize: 10, color: "grey" }}>Challenges</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "black" }}>35</Text>
            <Text style={{ fontSize: 10, color: "grey" }}>Replies</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "black" }}>217</Text>
            <Text style={{ fontSize: 10, color: "grey" }}>Likes</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC<ProfileProps> = ({
  items,
  numColumns,
  upperStyle,
  bottomStyle,
  horizontalView,
}) => {
  const [tempChallanges, setTempChallanges] = useState<any[]>([]);
  const isMounted = useIsMount();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const asyncRes = await Promise.all(
        items.map(async (item) => {
          const imageURI = await generateThumbnail(item.url);
          return Object.assign({ image: imageURI }, { ...item });
        })
      );
      isMounted.current && setTempChallanges(asyncRes);
    })();
  }, []);

  const showVideo = (videoURL) => {
    navigation.navigate("UsersProfile", { videoURL: videoURL });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          showVideo(item.url);
        }}
      >
        <ImageBackground
          style={{
            ...styles.theImage,
            width: Dimensions.get("window").width / numColumns,
          }}
          source={{ uri: item.image }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              height: 120,
            }}
          >
            <View style={[styles.rowContainer, { marginRight: 10 }]}>
              <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
              <Text style={styles.amount}>{item.numOfLikes}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={upperStyle !== undefined ? upperStyle : { flex: 1 }}>
        <ProfileHeader />
      </View>
      <View style={bottomStyle !== undefined ? bottomStyle : { flex: 1 }}>
        <FlatList
          data={tempChallanges}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal={horizontalView !== undefined ? horizontalView : false}
          numColumns={horizontalView !== undefined ? 0 : numColumns}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  image: {
    width: 200,
    height: 200,
  },

  theImage: {
    margin: 2,
    height: 120,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  amount: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
