import React, { useEffect, useState } from "react";
import { IPost } from "../../interfaces/Post";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "./ProfileScreen";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { Colors } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";

interface ProfileContainerProps {}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({}) => {
  const { loggedUser } = useSelector(authSelector);
  return loggedUser ? (
    <ProfileScreen />
  ) : (
    <NotLoggedInScreen
      text={"Profile"}
      description={"Sign up for an account"}
      icon={() => (
        <Ionicons name="md-person-outline" color={Colors.white} size={56} />
      )}
    />
  );
};
