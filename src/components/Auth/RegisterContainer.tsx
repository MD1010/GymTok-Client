import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
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

  const handleSubmitPress = async (username: string, fullName: string, password: string, email: string) => {
    setLoading(true);
    dispatch(register(username, fullName, password, email));
    setLoading(false);
  };
  return <RegisterScreen isLoading={isLoading} error={authError} onSubmit={handleSubmitPress} />;
};
