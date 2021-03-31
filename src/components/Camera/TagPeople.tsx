import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar, Appearance } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { TouchableHighlightButton, Colors, DismissKeyboard, Player } from "../shared";

interface TagPeopleScreenProps {}

type StackParamsList = {
  params: { videoUri: string };
};

export const TagPeopleScreen: React.FC<TagPeopleScreenProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();

  const returnToPublishScreen = (approved: boolean) => {
    if (approved) {
      //todo send the count of how many added
      navigation.navigate("Publish");
    } else {
      navigation.goBack();
    }
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
      <Player
        uri={route.params?.videoUri}
        isPlaying={true}
        hidePlayButton
        resizeMode={"cover"}
        style={{ flex: 1, width: 220, borderRadius: 15, overflow: "hidden" }}
        containerStyle={{ alignItems: "center" }}
      />

      <View style={{ flex: 1, marginTop: 10 }}>
        <TouchableHighlightButton
          highlightOff
          textColor={Colors.cyan}
          actionWillNavigate={false}
          optionText={"Tap to tag people"}
          onSelect={() => navigation.navigate("SearchUser")}
          icon={<MaterialIcons name="add" size={29} color={Colors.cyan} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
