import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { postsSelector } from "../../store/posts/postsSlice";
import { Text } from "react-native";

export const NotificationScreen = () => {
  const { notifications, error, isLoading } = useSelector(notificaitonsSelector);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View>
      {notifications.map((notification) => (
        <View key={notification._id} style={{ backgroundColor: "red", margin: 10 }}>
          <Text>{notification._id}</Text>
        </View>
      ))}
    </View>
  );
};
