import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import CheckBox from "react-native-check-box";

interface props {
  modalVisible: boolean;
  setModalVisible: (isModalVisible: boolean) => void;
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

export const FriendsModal: React.FC<props> = ({ modalVisible, setModalVisible, setSelectedFriends }) => {
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    if (modalVisible) {
      let temp = DATA.map((friend) => Object.assign({ isSelected: false }, { ...friend }));
      setFriends(temp);
    }
  }, [modalVisible]);

  const updateSelectionFriend = (isSelectionFriend: boolean, friendID: string) => {
    let temp1 = friends.map((friend) =>
      friend.id === friendID ? { ...friend, isSelected: isSelectionFriend } : friend
    );
    setFriends(temp1);
  };

  const handleSelectedFriends = () => {
    const selectedFriends = friends.filter((friend) => friend.isSelected && friend);
    setSelectedFriends(selectedFriends);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            onClick={() => {
              updateSelectionFriend(!item.isSelected, item.id);
            }}
            isChecked={item.isSelected}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.container11}>
              <FlatList data={friends} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </SafeAreaView>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  handleSelectedFriends();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  container11: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
