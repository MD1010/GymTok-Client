import React, { useCallback, useEffect, useState } from "react";
import { Animated, Pressable, SafeAreaView, StyleSheet, Text, TouchableHighlightBase, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notification";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { Colors } from "../shared";
import { images } from "../../../assets";
import {
  FlatList,
  RectButton,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { calcTimeAgo } from "../../utils/timeAgo";
import { Badge, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { deleteUserNotifications, markNotificationAsRead } from "../../store/notifications/actions";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { postsSelector } from "../../store/posts/postsSlice";
import Ripple from "react-native-material-ripple";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Notification = ({ notification, userId }: { notification: INotification; userId: string }) => {
  const { title, sender, date, isRead, data, body, _id } = notification;
  const [postTime, setPostTime] = useState<string>(calcTimeAgo(date));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const {} = useSelector(postsSelector)

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

  // const _renderRightAction = (icon, color, backgroundColor, x, progress) => {
  //   // const trans = progress.interpolate({
  //   //   inputRange: [0, 1],
  //   //   outputRange: [x, 0],
  //   // });

  //   // return (
  //   //   <View style={{ flex: 1, transform: [{ translateX: trans }] }}>
  //   //     <View style={{ backgroundColor: "red" }}>{/* <RectButton></RectButton> */}</View>
  //   //   </View>
  //   // );
  //   <View style={{ flex: 1, backgroundColor: "red" }}>
  //     <Text>Delete</Text>
  //   </View>;
  // };

  const leftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          {/* <Feather name="trash-2" color={Colors.white} size={24} /> */}
          Delete
        </Animated.Text>
      </View>
    );
  };

  // const _renderRightActions = (progress) => (
  //   <View style={{ flexDirection: "row" }}>
  //     <View style={{ flex: 1, backgroundColor: "red" }}>
  //       <Text>Delete</Text>
  //     </View>

  //     {/* {_renderRightAction("menu", "#000000", "#eeeeee", 192, progress)}
  //     {_renderRightAction("bell", "#000000", "#cccccc", 128, progress)}
  //     {_renderRightAction("delete", "#ffffff", "#dd2c00", 64, progress)} */}
  //   </View>
  // );

  return (
    <Swipeable
      // friction={1}
      // rightThreshold={10}
      renderLeftActions={leftActions}
      onSwipeableOpen={() => console.log(123123)}
    >
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
    </Swipeable>
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
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    // notifications.length && console.log("notification changed", notifications);
  }, [notifications]);

  const renderItem = ({ item, index }) => <Notification key={item._id} notification={item} userId={loggedUser._id} />;

  const NotificationList = () => (
    <View style={{ marginVertical: 15 }}>
      <FlatList renderItem={renderItem} keyExtractor={keyExtractor} data={notifications}></FlatList>
    </View>
  );

  const clearNotifications = () => {
    dispatch(deleteUserNotifications(loggedUser._id));
  };

  const keyExtractor = useCallback((item: INotification, i) => item._id, []);
  if (loggedUser) {
    return (
      <>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>All activity</Text>
          <View style={{ position: "absolute", right: 15 }}>
            <Ripple
              rippleColor={Colors.darkGrey}
              rippleContainerBorderRadius={50}
              rippleCentered
              onPress={clearNotifications}
            >
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: Colors.darkBlue,
                  padding: 8,
                  overflow: "hidden",
                }}
              >
                <Feather name="trash-2" color={Colors.white} size={18} />
              </View>
            </Ripple>
          </View>
        </View>
        <Divider style={{ backgroundColor: Colors.lightGrey }} />
        {notifications.length ? <NotificationList /> : <EmptyNotificationsList />}
      </>
    );
  } else {
    return (
      <NotLoggedInScreen
        redirectScreen={"Notifications"}
        text={"Notifications"}
        description={"See your activity and new challenges here"}
        icon={() => <Ionicons name="notifications-sharp" color={Colors.white} size={56} />}
      />
    );
  }
};
export const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  pageTitle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
  },
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
  leftAction: {
    // alignItems: "center",
    flex: 1,
    // wid: "100%",
    justifyContent: "center",
    // height: 75,
    backgroundColor: "red",
  },
  actionText: {
    color: Colors.white,
    fontWeight: "bold",
    padding: 20,
  },
});
