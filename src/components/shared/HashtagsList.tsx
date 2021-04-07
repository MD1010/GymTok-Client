import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from ".";

interface HashtagsListProps {
  results: string[];
  onHashtagSelect?: (...args) => any;
  onHashtagRemove?: (index: number) => any;
}

const Hashtag: FC<{ hashtag: string }> = ({ hashtag }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <View>
      <Text style={styles.hashtag}>#{hashtag}</Text>
    </View>
  </View>
);

export const HashtagsList: FC<HashtagsListProps> = ({ results, onHashtagSelect, onHashtagRemove }) => (
  <FlatList
    keyExtractor={(_, i) => i.toString()}
    data={results}
    renderItem={({ item: hashtag, index }) => (
      <TouchableWithoutFeedback onPress={() => (onHashtagSelect ? onHashtagSelect(hashtag) : null)}>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Hashtag hashtag={hashtag} />
          {onHashtagRemove ? (
            <TouchableWithoutFeedback>
              <Ionicons name="close-outline" size={29} color={"white"} onPress={() => onHashtagRemove(index)} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    )}
  ></FlatList>
);
export const styles = StyleSheet.create({
  hashtag: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
