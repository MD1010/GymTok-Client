import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";
import { styles } from "./styles";

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

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener("blur", () => {
        setPassword("");
        setUsername("");
        setErrorText("");
      });

      return () => navigation.removeListener("blur", null);
    }, [])
  );

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
      <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("Register")}>
        New Here? Sign up
      </Text>
    </View>
  );
};
