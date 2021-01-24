import { useNavigation } from "@react-navigation/native";
import React, { createRef, useState } from "react";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { LoginScreen } from "./login";

interface LoginContainerProps {}

export const LoginContainer: React.FC<LoginContainerProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const passwordInputRef = createRef<TextInput>();
  const { authError, loggedUser } = useSelector(authSelector);
  console.log(authError);
  const handleSubmitPress = async (username: string, password: string) => {
    if (!username) {
      alert("Please fill UserName");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    await dispatch(login(username, password));
    setLoading(false);
    console.log("before check?!!?@#", authError, loggedUser);
    if (authError) {
      console.log("in auth error", authError);
      alert(authError);
    } else {
      navigation.navigate("home");
    }
  };
  return <LoginScreen error={authError} onSubmit={handleSubmitPress} />;
};
