import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView, NativeViewGestureHandler, PanGestureHandler } from "react-native-gesture-handler";
import { Colors, UIConsts } from "../shared/styles/variables";
import * as VideoThumbnails from "expo-video-thumbnails";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileVideoModal } from "./ProfileVideoModal";
import { FontAwesome } from "@expo/vector-icons";

interface ProfileProps {
  challenges: any[];
  numColumns: number;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ challenges, numColumns }) => {
  const [tempChallanges, setTempChallanges] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    (async () => {
      const asyncRes = await Promise.all(
        challenges.map(async (challenge) => {
          const imageURI = await generateThumbnail(challenge.url);
          return Object.assign({ image: imageURI }, { ...challenge });
        })
      );
      isMounted.current && setTempChallanges(asyncRes);
    })();
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  const generateThumbnail = async (url) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        //time: 15000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  const showVideo = (videoURL) => {
    setModalVisible(!modalVisible);
    setSelectedVideoUri(videoURL);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          showVideo(item.url);
        }}
      >
        <ImageBackground
          style={{ ...styles.theImage, width: Dimensions.get("window").width / numColumns }}
          source={{ uri: item.image }}
        >
          <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: 120 }}>
            <View style={[styles.rowContainer, { marginRight: 10 }]}>
              <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
              <Text style={styles.amount}>138k</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <Text>Profile</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={tempChallanges}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal={false}
          numColumns={numColumns}
        />
        <ProfileVideoModal
          videoUri={selectedVideoUri}
          modalVisible={modalVisible}
          setModalVisible={(isModalVisible) => setModalVisible(isModalVisible)}
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
