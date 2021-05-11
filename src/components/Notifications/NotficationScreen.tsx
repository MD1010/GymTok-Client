import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableHighlightBase, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notification";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { Colors } from "../shared";
import { images } from "../../../assets";
import { FlatList, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { calcTimeAgo } from "../../utils/timeAgo";
import { Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { markNotificationAsRead } from "../../store/notifications/actions";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";

const Notification = ({ notification, userId }: { notification: INotification; userId: string }) => {
  const { title, sender, date, isRead, data, body, _id } = notification;
  const [postTime, setPostTime] = useState<string>(calcTimeAgo(date));
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      setPostTime(calcTimeAgo(date));
    }, 1000 * 60);
  }, []);

  const openNotification = (notification: INotification) => {
    //todo mark the notification as read
    dispatch(markNotificationAsRead(notification._id, userId));
    //todo decrease the counter
    //todo get the whole post by the post id from the store
    //todo navigate to the videodisplay with the post
    // navigation.navigate("VideoDisplay", { posts: [] });
  };

  return (
    <TouchableHighlight
      underlayColor={Colors.darkBlueOpaque}
      onPress={() => openNotification(notification)}
      style={{ flexDirection: "row", alignItems: "center", padding: 10, justifyContent: "center" }}
    >
      <>
        <Avatar source={sender.image ? { uri: sender.image } : images.avatar} rounded size={50}></Avatar>

        <View style={{ marginHorizontal: 15 }}>
          <Text style={!isRead && { fontWeight: "bold" }}>
            <Text style={styles.username}>{sender.fullName} </Text>
            <Text style={styles.content}>Challenged you to try his challenge </Text>
          </Text>
          <Text style={[styles.content, !isRead && { fontWeight: "bold" }]}>{body}</Text>
          <Text style={styles.postTime}>{postTime}</Text>
        </View>
        {isRead ? null : <View style={styles.notRead}></View>}
      </>
    </TouchableHighlight>
  );
};
const EmptyNotificationsList = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Ionicons name="notifications-sharp" color={Colors.white} size={56} />
    <Text style={{ paddingVertical: 10, fontSize: 16, padding: 15 }}>You have no notifications left</Text>
  </View>
);
export const NotificationScreen = () => {
  const { receivedNotifications: notifications, error, isLoading } = useSelector(notificaitonsSelector);
  const loggedUser = useSelector(authSelector).loggedUser;

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    // notifications.length && console.log("notification changed", notifications);
  }, [notifications]);

  const renderItem = ({ item, index }) => <Notification key={item._id} notification={item} userId={loggedUser._id} />;

  const keyExtractor = useCallback((item: INotification, i) => item._id, []);
  if (loggedUser) {
    if (!notifications.length) {
      return <EmptyNotificationsList />;
    } else
      return (
        <View style={{ marginVertical: 20 }}>
          <FlatList renderItem={renderItem} keyExtractor={keyExtractor} data={notifications}></FlatList>
        </View>
      );
  }
};
export const styles = StyleSheet.create({
  content: {
    fontSize: 14,
    color: Colors.white,
  },

  username: {
    fontSize: 15,
    color: Colors.white,
  },

  postTime: {
    fontSize: 12,
    color: Colors.lightGrey2,
    marginTop: 3,
  },

  notRead: {
    backgroundColor: Colors.cyan,
    height: 5,
    width: 5,
    overflow: "hidden",
    borderRadius: 50,
  },
});
