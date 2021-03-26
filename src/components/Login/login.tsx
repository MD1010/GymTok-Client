import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Colors } from "../shared/styles/variables";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface LoginProps {
  onSubmit: (username: string, password: string) => any;
  error: string | null;
}

export const LoginScreen: React.FC<LoginProps> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const navigation = useNavigation();
  const passwordInputRef = createRef<TextInput>();

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
            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          {username.length ? (
            <TouchableWithoutFeedback onPress={() => setUsername("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
        <View style={styles.inputRow}>
          <TextInput
            value={password}
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />

          {password.length ? (
            <TouchableWithoutFeedback onPress={() => setPassword("")}>
              <FontAwesome name="times-circle" size={16} color={"white"} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
      {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={() => onSubmit(username, password)}>
        <Text style={styles.buttonTextStyle}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("register")}>
        New Here ? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    padding: 10,
  },
  form: {
    marginTop: 30,
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 25,
  },
  inputRow: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.lightPurpule,
    borderWidth: 0,
    color: "#FFFFFF",
    marginRight: 25,
    marginLeft: 25,
    height: 40,
    alignItems: "center",
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 20,
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
