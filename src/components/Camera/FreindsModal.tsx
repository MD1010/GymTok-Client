import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button } from "react-native";
import { CheckBox } from "react-native-elements";

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
        <Text style={styles.title}>{item.title}</Text>
        <CheckBox checked={item.isSelected} onPress={() => updateSelectionFriend(!item.isSelected, item.id)} />
      </View>
    );
  };
  return (
    <React.Fragment>
      <View style={styles.Btns}>
        <Button
          title="Cencel"
          color="#841584"
          onPress={() => {
            handleSelectedFriends();
            close();
          }}
        />
        <Text style={{ alignSelf: "center", fontSize: 25 }}>Friends</Text>
        <Button
          title="Apply"
          color="#841584"
          onPress={() => {
            close();
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <SafeAreaView style={styles.safeArea}>
        <FlatList style={styles.flastList} data={friends} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </SafeAreaView>
    </React.Fragment>
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
    marginTop: 19,
    height: 550,
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
