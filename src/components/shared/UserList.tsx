import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IUser } from "../../interfaces";
import { Colors } from "../shared";

interface IUserListProps {
  results: IUser[];
  onUserSelect?: (...args) => any;
  onUserRemove?: (index: number) => any;
}

const UserWithAvatar: FC<{ user: IUser }> = ({ user: { fullName, username } }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Avatar source={require("../../../assets/avatar/user.png")} rounded size={50}></Avatar>
    <View>
      <Text style={styles.userFullName}>{fullName}</Text>
      <Text style={styles.username}>@{username}</Text>
    </View>
  </View>
);

export const UserList: FC<IUserListProps> = ({ results, onUserSelect, onUserRemove }) => (
  <FlatList
    keyExtractor={(_, i) => i.toString()}
    data={results}
    renderItem={({ item: user, index }) => (
      <TouchableWithoutFeedback onPress={() => (onUserSelect ? onUserSelect(user) : null)}>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <UserWithAvatar user={user} />
          {onUserRemove ? (
            <TouchableWithoutFeedback>
              <Ionicons name="close-outline" size={29} color={"white"} onPress={() => onUserRemove(index)} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    )}
  ></FlatList>
);
export const styles = StyleSheet.create({
  userFullName: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },

  username: {
    fontSize: 13,
    color: Colors.white,
    marginLeft: 10,
  },
});
