import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsMount } from "../../hooks/useIsMount";
import { generateThumbnail } from "../../utils/generateThumbnail";
import { Colors } from "../shared/styles/variables";
import { ProfileVideoModal } from "./ProfileVideoModal";

interface ProfileProps {
  challenges: any[];
  numColumns: number;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ challenges, numColumns }) => {
  const [tempChallanges, setTempChallanges] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState(null);
  const isMounted = useIsMount();

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
function useIsMounted() {
  throw new Error("Function not implemented.");
}
