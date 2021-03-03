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
import { UIConsts } from "../shared/styles/variables";
import * as VideoThumbnails from "expo-video-thumbnails";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyModal } from "./MyVideo";

interface ProfileProps {
  challenges: any[];
}

export const ProfileScreen: React.FC<ProfileProps> = ({ challenges }) => {
  const [tempChallanges, setTempChallanges] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const asyncRes = await Promise.all(
        challenges.map(async (challenge) => {
          const imageURI = await generateThumbnail(challenge.url);
          return Object.assign({ image: imageURI }, { ...challenge });
        })
      );
      setTempChallanges(asyncRes);
    })();
  }, []);

  const generateThumbnail = async (url) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        time: 15000,
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
        <ImageBackground style={styles.theImage} source={{ uri: item.image }}>
          <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: 120 }}>
            <Text>Hey</Text>
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
          numColumns={3}
        />
        <MyModal
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
    width: Dimensions.get("window").width / 3,
    height: 120,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
