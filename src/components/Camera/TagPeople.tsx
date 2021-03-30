import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { TouchableHighlightButton, Colors, DismissKeyboard, Player } from "../shared";

interface TagPeopleScreenProps {}

type StackParamsList = {
  params: { videoUri: string };
};

export const TagPeopleScreen: React.FC<TagPeopleScreenProps> = ({}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState();
  const route = useRoute<RouteProp<StackParamsList, "params">>();

  useEffect(() => {
    // navigation.setOptions({
    //   headerLeft: () => {
    //     return (
    //       <Ionicons
    //         name="close-outline"
    //         size={29}
    //         color={"white"}
    //         onPress={() => navigation.goBack()}
    //         style={{ padding: 10 }}
    //       />
    //     );
    //   },
    // } as StackNavigationOptions);
  }, []);

  const updateSearch = () => {};
  const SearchInput = () => {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar placeholder="Search for a user" onChangeText={updateSearch} value={search} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Divider /> */}
      {/* <View style={{ flex: 1 }}> */}
      {/* <View style={{ flex: 1 }}> */}
      {/* <Text>asdasdasd</Text> */}
      <Player
        uri={route.params?.videoUri}
        isPlaying={true}
        hidePlayButton
        resizeMode={"cover"}
        style={{ flex: 1, width: 250, borderRadius: 15, overflow: "hidden" }}
        containerStyle={{ alignItems: "center" }}
      />
      {/* </View> */}
      {/* </View> */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <TouchableHighlightButton
          highlightOff
          textColor={Colors.cyan}
          actionWillNavigate={false}
          optionText={"Tap to tag people"}
          onSelect={() => navigation.navigate("SearchUser")}
          icon={
            <MaterialIcons
              name="add"
              size={29}
              color={Colors.cyan}

              // style={{ fontWeight: "bold" }}
            />
          }
        />
        {/* <AddPeopleBtn /> */}
      </View>
      {/* <Divider /> */}
    </View>
    // <DismissKeyboard>
    // <SearchInput />
    // </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: StatusBar.currentHeight,
    // justifyContent: "flex-end",
    // height: 100,
    // height: "40%",
    // height: 200,
  },
});
