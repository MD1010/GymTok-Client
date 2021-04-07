import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Text, StatusBar, Appearance } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider, SearchBar } from "react-native-elements";
import { TouchableHighlightButton, Colors, DismissKeyboard, Player } from "../shared";
import cloneDeep from "lodash/cloneDeep";
import { HashtagsList } from "../shared/HashtagsList";

interface AddHashtagsScreenProps {}

type StackParamsList = {
  params: { selectedHashtags: string[] };
};

export const AddHashtagScreen: React.FC<AddHashtagsScreenProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    setHashtags(cloneDeep([...hashtags, ...route.params?.selectedHashtags]));
  }, [route.params?.selectedHashtags]);

  useEffect(() => {
    // console.log("hashtag changed!!", hashtags);
  }, [hashtags]);

  const returnToPublishScreen = () => {
    navigation.navigate("Publish", { hashtags });
  };

  const handleHashtagsRemove = (i: number) => {
    setHashtags(hashtags.filter((_, index) => index !== i));
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
          optionText={"Tap to add more hashtags"}
          onSelect={() => navigation.navigate("SearchHashtags", { excludedHashtagsToSearch: hashtags })}
          icon={<MaterialIcons name="add" size={29} color={Colors.cyan} />}
        />
      </View>

      <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 15 }}>
        <HashtagsList onHashtagRemove={handleHashtagsRemove} results={hashtags} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
