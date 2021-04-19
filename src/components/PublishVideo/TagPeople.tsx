import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar, Appearance } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { TouchableHighlightButton, Colors, DismissKeyboard, Player } from "../shared";
import { IUser } from "../../interfaces";
import { UserList } from "../shared/UserList";
import cloneDeep from "lodash/cloneDeep";

interface TagPeopleScreenProps {}

type StackParamsList = {
  params: { selectedUsers: IUser[] };
};

export const TagPeopleScreen: React.FC<TagPeopleScreenProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [taggedPeople, setTaggedPeople] = useState<IUser[]>([]);

  useEffect(() => {
    setTaggedPeople(cloneDeep([...taggedPeople, ...route.params?.selectedUsers]));
  }, [route.params?.selectedUsers]);

  const returnToPublishScreen = () => {
    navigation.navigate("Publish", { taggedPeople });
  };

  const handleUserRemove = (i: number) => {
    setTaggedPeople(taggedPeople.filter((_, index) => index !== i));
  };

  const headerRight = () => (
    <MaterialIcons name="check" size={29} color={Colors.cyan} style={{ padding: 10 }} onPress={returnToPublishScreen} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    } as StackNavigationOptions);
  }, [headerRight]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <TouchableHighlightButton
          highlightOff
          textColor={Colors.cyan}
          actionWillNavigate={false}
          optionText={"Tap to tag more people"}
          onSelect={() => navigation.navigate("SearchUser", { excludedUsersToSearch: taggedPeople })}
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
