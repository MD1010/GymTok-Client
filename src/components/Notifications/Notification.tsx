import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated } from "react-native";
import { useDispatch } from "react-redux";
import { images } from "../../../assets";
import { INotification } from "../../interfaces/Notification";
import { deleteNotification, markNotificationAsRead } from "../../store/notifications/actions";
import { calcTimeAgo } from "../../utils/timeAgo";
import { Colors } from "../shared/styles/variables";
import { styles } from "./styles";

export const UserNotification = ({ notification, userId }: { notification: INotification; userId: string }) => {
  const { title, sender, date, isRead, data, body, _id } = notification;
  const [postTime, setPostTime] = useState<string>(calcTimeAgo(date));
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setPostTime(calcTimeAgo(date));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const openNotification = (notification: INotification) => {
    navigation.navigate("VideoDisplay", { posts: [notification.data] });
    dispatch(markNotificationAsRead(notification, userId));
  };

  const handleDeleteNotification = (notification: INotification) => {
    dispatch(deleteNotification(notification, userId));
  };

  const leftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Feather name="trash-2" color={Colors.white} size={25} />
        </Animated.Text>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={leftActions} onSwipeableOpen={() => handleDeleteNotification(notification)}>
      <TouchableHighlight
        underlayColor={Colors.darkBlueOpaque}
        onPress={() => openNotification(notification)}
        style={{
          backgroundColor: Colors.black,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          //   paddingHorizontal: 15,
          //   marginRight: 50,
          //   paddingHorizontal: 25,
          //   justifyContent: "center",
        }}
      >
        <>
          <Avatar source={sender.image ? { uri: sender.image } : images.avatar} rounded size={50}></Avatar>

          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={!isRead && { fontWeight: "bold" }}>
              <Text style={styles.username}>{sender.fullName} </Text>
              <Text style={styles.content}>Challenged you in a new challenge</Text>
            </Text>
            <Text style={styles.postTime}>{postTime}</Text>
          </View>
          {isRead ? null : <View style={styles.notRead}></View>}
        </>
      </TouchableHighlight>
    </Swipeable>
  );
};
