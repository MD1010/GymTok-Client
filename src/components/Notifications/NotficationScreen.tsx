import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notification";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { Colors } from "../shared";
import { images } from "../../../assets";
import { FlatList } from "react-native-gesture-handler";
import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { calcTimeAgo } from "../../utils/timeAgo";

const Notification = ({ notification }: { notification: INotification }) => {
  const { title, sender, date, isRead, data, body, _id } = notification;
  const [postTime, setPostTime] = useState<string>(calcTimeAgo(date));
  useEffect(() => {
    setInterval(() => {
      setPostTime(calcTimeAgo(date));
    }, 1000 * 60);
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Avatar source={sender.image ? { uri: sender.image } : images.avatar} rounded size={50}></Avatar>

      <View style={{ marginHorizontal: 10 }}>
        <Text>
          <Text style={styles.username}>{sender.fullName} </Text>
          <Text style={styles.content}>Challenged you to try his challenge </Text>
        </Text>
        <Text style={styles.content}>{body}</Text>
        <Text style={styles.postTime}>{postTime}</Text>
        {/* <Text style={styles.username}>@{username}</Text> */}
      </View>
      {/* <MaterialIcons
        name="close"
        color={Colors.white}
        size={20}
        style={{ padding: 10 }}
        onPress={() => console.log("delete ")}
      /> */}
      {/* <View> */}

      {/* <Avatar source={sender.image ? { uri: sender.image } : images.avatar} rounded size={20}></Avatar> */}
      {/* </View> */}
    </View>
  );
};

export const NotificationScreen = () => {
  const { notifications, error, isLoading } = useSelector(notificaitonsSelector);
  useEffect(() => {
    return () => {};
  }, []);

  const renderItem = ({ item, index }) => <Notification key={item._id} notification={item} />;

  const keyExtractor = useCallback((item: INotification, i) => item._id, []);
  return <FlatList renderItem={renderItem} keyExtractor={keyExtractor} data={notifications}></FlatList>;
};
export const styles = StyleSheet.create({
  content: {
    fontSize: 14,
    color: Colors.white,
  },

  username: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
  },

  postTime: {
    fontSize: 12,
    color: Colors.lightGrey2,
    marginTop: 3,
  },
});
