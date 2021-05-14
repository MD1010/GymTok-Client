import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { Divider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { deleteUserNotifications } from "../../store/notifications/actions";
import { notificaitonsSelector } from "../../store/notifications/notificationsSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { Colors } from "../shared";
import { ConfirmPopup } from "../shared/ConfirmPopup";
import { NotificationList } from "./NotificationList";
import { styles } from "./styles";

export const NotificationScreen = () => {
  const loggedUser = useSelector(authSelector).loggedUser;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);
  const notifications = useSelector(notificaitonsSelector).receivedNotifications;
  const clearNotifications = () => {
    closePopup();
    dispatch(deleteUserNotifications(loggedUser._id));
  };
  const openPopup = () => {
    setIsConfirmPopupVisible(true);
  };

  const closePopup = () => {
    setIsConfirmPopupVisible(false);
  };

  if (loggedUser) {
    return (
      <View style={{ flex: 1, marginTop: insets.top }}>
        <ConfirmPopup
          headerText={"Clear all notifications?"}
          isVisible={isConfirmPopupVisible}
          onCancel={closePopup}
          onConfirm={clearNotifications}
          confirmText={"Clear"}
        />
        <View style={[styles.pageHeader]}>
          <Text style={styles.pageTitle}>All activity</Text>
          {notifications.length ? (
            <View style={{ position: "absolute", right: 15 }}>
              <Ripple rippleColor={Colors.darkGrey} rippleContainerBorderRadius={50} rippleCentered onPress={openPopup}>
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
          ) : null}
        </View>
        <Divider style={{ backgroundColor: Colors.lightGrey }} />
        <View style={{ marginVertical: 15, flex: 1 }}>
          <NotificationList />
        </View>
      </View>
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
