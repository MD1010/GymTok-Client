import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { Loader } from "../shared/Loader";
import { RegisterScreen } from "./Register";

interface RegisterContainerProps {}

export const RegisterContainer: React.FC<RegisterContainerProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authError, loggedUser } = useSelector(authSelector);

  useEffect(() => {
    loggedUser && navigation.goBack();
  }, [loggedUser]);

  const handleSubmitPress = async (username: string, fullName: string, password: string) => {
    setLoading(true);
    dispatch(register(username, fullName, password));
    setLoading(false);
  };
  return <RegisterScreen isLoading={isLoading} error={authError} onSubmit={handleSubmitPress} />;
};
