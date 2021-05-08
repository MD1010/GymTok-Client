import React from "react";
import { View } from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { Colors } from "../shared/styles/variables";
import { MainDiscover } from "./MainDiscover";

export const ExploreContainer: React.FC = () => {
  const { loggedUser } = useSelector(authSelector);

  return loggedUser ? (
    <View style={{ flex: 1 }}>
      {/* <View style={{ flex: 2 }}>
        <CustomSearchBar />
      </View> */}
      <View style={{ flex: 1 }}>
        <MainDiscover />
      </View>
    </View>
  ) : (
    <NotLoggedInScreen
      text={"Profile"}
      description={"Sign up for an account"}
      icon={() => <Ionicons name="md-person-outline" color={Colors.white} size={56} />}
    />
  );
};
