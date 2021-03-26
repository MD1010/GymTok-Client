import React, { createRef, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Loader } from "../shared/Loader";
import { Colors } from "../shared/styles/variables";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface RegisterProps {
  onSubmit: (username: string, fullName: string, password: string) => any;
  error: string | null;
  isLoading: boolean;
}

export const RegisterScreen: React.FC<RegisterProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigation = useNavigation();

  const checkIfFieldsAreNotEmpty = () => {
    return password.length && fullName.length && username.length && confirmPassword.length;
  };

  const checkIfPasswordsMatch = () => {
    return !password.localeCompare(confirmPassword);
  };

  useEffect(() => {
    if (checkIfPasswordsMatch()) {
      setErrorText(null);
    }
  }, [confirmPassword]);

  const validateForm = () => {
    if (username.length < 5) {
      setErrorText("username has to be at least 5 characters");
      return false;
    }
    if (password.length < 5) {
      setErrorText("password has to be at least 5 characters");
      return false;
    }

    if (/\d/.test(fullName)) {
      setErrorText("name has to include only characters");
      return false;
    }

    if (!checkIfPasswordsMatch()) {
      setErrorText("Passwords don't match");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <TextInput
            value={username}
            style={styles.inputStyle}
            onChangeText={(username) => setUsername(username)}
            placeholder="Username"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={true}
          />
          {username.length ? (
            <TouchableWithoutFeedback onPress={() => setUsername("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={fullName}
            style={styles.inputStyle}
            onChangeText={(fullName) => setFullName(fullName)}
            placeholder="Name"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={true}
          />
          {fullName.length ? (
            <TouchableWithoutFeedback onPress={() => setFullName("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={password}
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
          />

          {password.length ? (
            <TouchableWithoutFeedback onPress={() => setPassword("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={confirmPassword}
            style={styles.inputStyle}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            placeholder="Confirm password"
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
          />

          {confirmPassword.length ? (
            <TouchableWithoutFeedback onPress={() => setConfirmPassword("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>

        {errorText ? (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, marginBottom: 15 }}>
            <FontAwesome name="exclamation-circle" size={16} color={"red"} />
            <Text style={styles.errorTextStyle}>{errorText}</Text>
          </View>
        ) : null}
      </View>

      <View style={!checkIfFieldsAreNotEmpty() ? styles.buttonDisabled : null}>
        <TouchableOpacity
          style={styles.buttonStyle}
          disabled={!(password.length && username.length)}
          onPress={() => {
            if (validateForm()) onSubmit(username, fullName, password);
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center", height: 40 }}>
            {isLoading ? (
              <ActivityIndicator color={"white"} size={20} />
            ) : (
              <Text style={styles.buttonTextStyle}>Log in</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("Login")}>
        Already a user? Log in
      </Text>
    </View>
  );
};
