import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../shared";
import cloneDeep from "lodash/cloneDeep";
import TagInput from 'react-native-tag-input';


interface AddHashtagsScreenProps {}

type StackParamsList = {
  params: { selectedHashtags: string[] };
};

const inputProps = {
  keyboardType: 'default',
  placeholder: '',
  autoFocus: true,
  style: {
    fontSize: 14,
    color: Colors.white,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};


export const AddHashtagScreen: React.FC<AddHashtagsScreenProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [hashtags, setHashtags] = useState([]);
  const [text, setText] = useState('');

  const onChangeTags = (tags) => {
    setHashtags(tags);
  }

  const onChangeText = (text) => {
    setText( text );

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    text = text.trim();
    if (parseWhen.indexOf(lastTyped) > -1) {
      setHashtags([...hashtags, text])
      setText("");
    }
  }

  const labelExtractor = (tag) => tag;


  useEffect(() => {
    setHashtags(cloneDeep([...hashtags, ...route.params?.selectedHashtags]));
  }, [route.params?.selectedHashtags]);

  useEffect(() => {
  }, [hashtags]);

  const returnToPublishScreen = () => {
    navigation.navigate("Publish", { hashtags });
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
      <View style={{ flex: 1, margin: 10, marginTop: 15 }}>
        <Text style={{marginVertical: 10, color: Colors.white}}>Add some hashtags:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.darkBlueOpaque}}>
          <TagInput
            value={hashtags}
            onChange={onChangeTags}
            labelExtractor={labelExtractor}
            text={text}
            onChangeText={onChangeText}
            tagColor={Colors.blue}
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={75}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
