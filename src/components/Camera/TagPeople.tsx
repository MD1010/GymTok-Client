import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar, Appearance } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { TouchableHighlightButton, Colors, DismissKeyboard, Player } from "../shared";
import { IUser } from "../../interfaces";
import { UserList } from "./SearchUsers";

interface TagPeopleScreenProps {}

type StackParamsList = {
  params: { selectedUser: IUser };
};

export const TagPeopleScreen: React.FC<TagPeopleScreenProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [taggedPeople, setTaggedPeople] = useState<IUser[]>([]);
  useEffect(() => {
    console.log("selected user =", route.params.selectedUser);
    setTaggedPeople((tagged) => [...tagged, route.params.selectedUser]);
  }, []);
  const returnToPublishScreen = (approved: boolean) => {
    if (approved) {
      //todo send the count of how many added
      navigation.navigate("Publish");
    } else {
      navigation.goBack();
    }
  };

  const handleUserRemove = (i: number) => {
    setTaggedPeople(taggedPeople.filter((_, index) => index !== i));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="check"
          size={29}
          color={Colors.cyan}
          style={{ padding: 10 }}
          onPress={() => returnToPublishScreen(true)}
        />
      ),
    } as StackNavigationOptions);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <TouchableHighlightButton
          highlightOff
          textColor={Colors.cyan}
          actionWillNavigate={false}
          optionText={"Tap to tag more people"}
          onSelect={() => navigation.navigate("SearchUser")}
          icon={<MaterialIcons name="add" size={29} color={Colors.cyan} />}
        />
      </View>

      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
        <UserList onUserRemove={handleUserRemove} results={taggedPeople} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
