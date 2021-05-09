import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notification";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { Colors } from "../shared";
import { images } from "../../../assets";

const Notification = ({ notification }: { notification: INotification }) => {
  const { title, sender, date, isRead, data, body, _id } = notification;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Avatar source={sender.image ? { uri: sender.image } : images.avatar} rounded size={50}></Avatar>
      <View>
        <Text style={styles.userFullName}>{sender.fullName} Challenged you !</Text>
        <Text style={styles.userFullName}>{new Date(date).toString()}</Text>
        {/* <Text style={styles.username}>@{username}</Text> */}
      </View>
    </View>
  );
};

export const NotificationScreen = () => {
  const { notifications, error, isLoading } = useSelector(notificaitonsSelector);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View>
      {notifications.map((notification) => (
        <Notification key={notification._id} notification={notification} />
      ))}
    </View>
  );
};
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
