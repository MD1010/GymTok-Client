import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Colors } from "../shared/styles/variables";
import { LogBox } from "react-native";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";

interface props {
  selectedFriends: any[];
  isVisible: boolean;
  close: () => void;
  setSelectedFriends: (selectedFriends: any[]) => void;
}

export const FriendsModal: React.FC<props> = ({ isVisible, setSelectedFriends, selectedFriends, close }) => {
  const [friends, setFriends] = useState<any[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      if (isVisible) {
        const { res, error } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/users`);
        const newFriendsArr = res.map((friend) =>
          Object.assign({ isSelected: isSelectedFriend(friend._id) }, { ...friend })
        );
        setFriends(newFriendsArr);
      }
    })();
  }, [isVisible]);

  const isSelectedFriend = (friendID) => {
    const selectedFriend = selectedFriends.filter((tempSelectedFriend) => tempSelectedFriend._id === friendID);
    if (selectedFriend.length > 0) return selectedFriend[0].isSelected;
    return false;
  };

  const updateSelectionFriend = (isSelectionFriend: boolean, friendID: string) => {
    const selectedFriends = friends.map((friend) =>
      friend._id === friendID ? { ...friend, isSelected: isSelectionFriend } : friend
    );
    setFriends(selectedFriends);

    const selectedFilteredFriends = filteredFriends.map((friend) =>
      friend._id === friendID ? { ...friend, isSelected: isSelectionFriend } : friend
    );
    setFilteredFriends(selectedFilteredFriends);
  };

  const handleSelectedFriends = () => {
    const selectedFriends = friends.filter((friend) => friend.isSelected && friend);
    setSelectedFriends(selectedFriends);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.checkboxContainer}>
        <Text style={styles.title}>{item.fullName}</Text>
        <CheckBox checked={item.isSelected} onPress={() => updateSelectionFriend(!item.isSelected, item._id)} />
      </View>
    );
  };

  const filterFriends = (friendName) => {
    const filteredFriends = friends.filter((friend) => friend.fullName.includes(friendName) && friendName.length > 0);
    setFilteredFriends(filteredFriends.length > 0 ? filteredFriends : friendName.length > 0 ? undefined : []);
  };

  return (
    <View style={{ backgroundColor: Colors.darkBlue }}>
      <View style={styles.Btns}>
        <Button
          title="Cancel"
          color={Colors.red}
          onPress={() => {
            setSelectedFriends([]);
            close();
          }}
        />
        <Text style={{ alignSelf: "center", fontSize: 25, color: Colors.gold }}>Friends</Text>
        <Button
          title="Apply"
          color={Colors.lightGreen}
          onPress={() => {
            handleSelectedFriends();
            close();
          }}
        />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          style={{ color: "white", borderColor: Colors.gold, borderWidth: 0.5, height: 40 }}
          onChangeText={(friendName) => filterFriends(friendName)}
          placeholder={"search friends"}
          placeholderTextColor={Colors.white}
        />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          style={styles.flastList}
          data={filteredFriends === undefined ? [] : filteredFriends.length == 0 ? friends : filteredFriends}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
  },

  title: {
    color: Colors.white,
    fontSize: 20,
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  safeArea: {
    height: Platform.OS === "android" ? Dimensions.get("screen").height - 300 : Dimensions.get("screen").height - 285,
    display: "flex",
    flexDirection: "row",
  },
  flastList: {
    marginLeft: 25,
  },
  closeBtn: {
    height: 20,
  },
  Btns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "android" ? 20 : 10,
  },
});
