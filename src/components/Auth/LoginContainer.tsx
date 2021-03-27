import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { LoginScreen } from "./Login";

interface LoginContainerProps {}

export const LoginContainer: React.FC<LoginContainerProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authError, loggedUser } = useSelector(authSelector);

  useEffect(() => {
    loggedUser && navigation.navigate("Home");
  }, [loggedUser]);

  const handleSubmitPress = async (username: string, password: string) => {
    setLoading(true);
    dispatch(login(username, password));
    setLoading(false);
  };

  return <LoginScreen authError={authError} onSubmit={handleSubmitPress} isLoading={isLoading} />;
};
