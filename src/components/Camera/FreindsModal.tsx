import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View, SafeAreaView, FlatList } from "react-native";
import CheckBox from "react-native-check-box";
import { EvilIcons } from "@expo/vector-icons";

interface props {
  isVisible: boolean;
  close: () => void;
  setSelectedFriends: (selectedFriends: any[]) => void;
}

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export const FriendsModal: React.FC<props> = ({ isVisible, setSelectedFriends, close }) => {
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    if (isVisible) {
      const newFriendsArr = DATA.map((friend) => Object.assign({ isSelected: false }, { ...friend }));
      setFriends(newFriendsArr);
    }
  }, [isVisible]);

  const updateSelectionFriend = (isSelectionFriend: boolean, friendID: string) => {
    const selectedFriends = friends.map((friend) =>
      friend.id === friendID ? { ...friend, isSelected: isSelectionFriend } : friend
    );
    setFriends(selectedFriends);
  };

  const handleSelectedFriends = () => {
    const selectedFriends = friends.filter((friend) => friend.isSelected && friend);
    setSelectedFriends(selectedFriends);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          onClick={() => {
            updateSelectionFriend(!item.isSelected, item.id);
          }}
          isChecked={item.isSelected}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.safeArea}>
        <FlatList style={styles.flastList} data={friends} renderItem={renderItem} keyExtractor={(item) => item.id} />
        <TouchableHighlight
          style={styles.closeBtn}
          onPress={() => {
            close();
          }}
        >
          <EvilIcons name="close" size={30} />
        </TouchableHighlight>
      </SafeAreaView>

      <View style={styles.saveBtn}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            handleSelectedFriends();
            close();
          }}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableHighlight>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
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
    height: 280,
    display: "flex",
    flexDirection: "row",
  },
  flastList: {
    marginLeft: 25,
  },
  closeBtn: {
    height: 20,
  },
  saveBtn: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
});
