import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { Colors } from "../shared/styles/variables";
import { CustomSearchBar } from "./SearchBar";

export const ExploreContainer: React.FC = () => {
  const { loggedUser } = useSelector(authSelector);

  return loggedUser ? (
    <CustomSearchBar />
  ) : (
    <NotLoggedInScreen
      text={"Profile"}
      description={"Sign up for an account"}
      icon={() => <Ionicons name="md-person-outline" color={Colors.white} size={56} />}
    />
  );
};
