import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { Colors, DismissKeyboard } from "../shared";

interface TagPeopleScreenProps {}

export const TagPeopleScreen: React.FC<TagPeopleScreenProps> = ({}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Ionicons
            name="close-outline"
            size={29}
            color={"white"}
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          />
        );
      },
    } as StackNavigationOptions);
  }, []);

  const updateSearch = () => {};
  const SearchInput = () => {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar placeholder="Search for a user" onChangeText={updateSearch} value={search} />
      </View>
    );
  };

  const AddPeopleBtn = () => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <MaterialIcons
        name="add"
        size={29}
        color={Colors.cyan}
        onPress={() => navigation.goBack()}
        // style={{ fontWeight: "bold" }}
      />
      <Text style={{ marginLeft: 30, color: Colors.cyan, fontSize: 15 }}>Tag Another Person</Text>
    </View>
    // <View></View>
  );

  // const  = () => {
  //   return <View></View>
  // }
  return (
    <View style={styles.container}>
      <Divider />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AddPeopleBtn />
      </View>
      {/* <Divider /> */}
      <View style={{ flex: 8 }}>
        <View style={{ backgroundColor: "pink" }}>{/* <Text>Tag another person</Text> */}</View>
      </View>
    </View>
    // <DismissKeyboard>
    // <SearchInput />
    // </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: StatusBar.currentHeight,
    // justifyContent: "flex-end",
    // height: 100,
    // height: "40%",
    // height: 200,
  },
});
