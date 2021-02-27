import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, Platform, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { Colors } from "../shared/styles/variables";

interface props {
  isVisible: boolean;
  close: () => void;
  setSelectedFriends: (selectedFriends: any[]) => void;
}

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "First Item",
  },
  {
    id: "5",
    title: "Second Item",
  },
  {
    id: "6",
    title: "Third Item",
  },
  {
    id: "7",
    title: "First Item",
  },
  {
    id: "8",
    title: "Second Item",
  },
  {
    id: "9",
    title: "Third Item",
  },
  {
    id: "10",
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
        <Text style={styles.title}>{item.title}</Text>
        <CheckBox checked={item.isSelected} onPress={() => updateSelectionFriend(!item.isSelected, item.id)} />
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: Colors.darkBlue }}>
      <View style={styles.Btns}>
        <Button
          title="Cencel"
          color={Colors.red}
          onPress={() => {
            handleSelectedFriends();
            close();
          }}
        />
        <Text style={{ alignSelf: "center", fontSize: 25, color: Colors.gold }}>Friends</Text>
        <Button
          title="Apply"
          color={Colors.lightGreen}
          onPress={() => {
            close();
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: Colors.gold,
          borderBottomWidth: 1,
        }}
      />
      <SafeAreaView style={styles.safeArea}>
        <FlatList style={styles.flastList} data={friends} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
    marginBottom: 20,
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
    height: Platform.OS === "android" ? Dimensions.get("screen").height - 300 : Dimensions.get("screen").height - 255,
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
  },
});
