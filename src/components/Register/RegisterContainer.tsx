import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { Loader } from "../shared/Loader";
import { RegisterScreen } from "./register";

interface RegisterContainerProps {}

export const RegisterContainer: React.FC<RegisterContainerProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const passwordInputRef = createRef<TextInput>();
  const { authError, loggedUser } = useSelector(authSelector);

  useEffect(() => {
    loggedUser && navigation.navigate("Home");
  }, [loggedUser]);

  const handleSubmitPress = async (username: string, fullName: string, password: string) => {
    if (!username) {
      alert("Please fill UserName");
      return;
    }

    if (!fullName) {
      alert("Please fill fullName");
      return;
    }

    if (!password) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    dispatch(register(username, fullName, password));
    setLoading(false);
  };
  return isLoading ? <Loader /> : <RegisterScreen error={authError} onSubmit={handleSubmitPress} />;
};
