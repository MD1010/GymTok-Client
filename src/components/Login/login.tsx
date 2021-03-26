import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";

interface LoginProps {
  onSubmit: (username: string, password: string) => any;
  authError: string | null;
  isLoading: boolean;
}

export const LoginScreen: React.FC<LoginProps> = ({ onSubmit, authError, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(authError);
  const navigation = useNavigation();
  const passwordInputRef = createRef<TextInput>();

  useEffect(() => {
    authError && setErrorText(authError);
  }, [authError]);

  useEffect(() => {
    setErrorText(null);
  }, [username, password]);

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
            value={password}
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={passwordInputRef}
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
        {errorText ? (
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, marginBottom: 15 }}>
            <FontAwesome name="exclamation-circle" size={16} color={"red"} />
            <Text style={styles.errorTextStyle}>{errorText}</Text>
          </View>
        ) : null}
      </View>

      <View style={!(password.length && username.length) ? styles.buttonDisabled : null}>
        <TouchableOpacity
          style={styles.buttonStyle}
          disabled={!(password.length && username.length)}
          onPress={() => {
            onSubmit(username, password);
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
      <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("register")}>
        New Here? Sign up
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
    marginBottom: 20,
    marginRight: 25,
    marginLeft: 25,
  },
  inputRow: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.2,
  },

  buttonStyle: {
    borderWidth: 0,
    color: "#FFFFFF",
    marginRight: 25,
    marginLeft: 25,
    alignItems: "center",
    backgroundColor: Colors.lightPurpule,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontWeight: "bold",
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
    marginLeft: 10,
    fontSize: 15,
  },
});
