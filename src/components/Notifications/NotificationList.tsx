import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notification";
import { authSelector } from "../../store/auth/authSlice";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { Colors } from "../shared";
import { UserNotification } from "./Notification";

const EmptyNotificationsList = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Ionicons name="notifications-sharp" color={Colors.white} size={56} />
    <Text style={{ paddingVertical: 10, fontSize: 16, padding: 15 }}>You have no notifications left</Text>
  </View>
);

export const NotificationList = () => {
  const { receivedNotifications: notifications, error, isLoading } = useSelector(notificaitonsSelector);
  const { loggedUser } = useSelector(authSelector);

  const keyExtractor = (item: INotification, i) => item._id;
  const renderItem = ({ item, index }) => (
    <UserNotification key={item._id} notification={item} userId={loggedUser._id} />
  );

  return notifications.length ? (
    <FlatList renderItem={renderItem} keyExtractor={keyExtractor} data={notifications}></FlatList>
  ) : (
    <EmptyNotificationsList />
  );
};
