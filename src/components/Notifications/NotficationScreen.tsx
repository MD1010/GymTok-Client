import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { deleteUserNotifications } from "../../store/notifications/actions";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { Colors } from "../shared";
import { NotificationList } from "./NotificationList";
import { styles } from "./styles";

export const NotificationScreen = () => {
  const loggedUser = useSelector(authSelector).loggedUser;
  const dispatch = useDispatch();

  const clearNotifications = () => {
    dispatch(deleteUserNotifications(loggedUser._id));
  };

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
        <View style={{ marginVertical: 15, flex: 1 }}>
          <NotificationList />
        </View>
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
