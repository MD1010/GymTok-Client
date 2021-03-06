import { useNavigation } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { AuthModal } from "../shared/AuthModal";
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

interface LoginProps {
  onSubmit: (username: string, password: string) => any;
  error: string | null;
}

export const LoginScreen: React.FC<LoginProps> = ({ onSubmit, error }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const navigation = useNavigation();
  const passwordInputRef = createRef<TextInput>();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {showAuthModal && <AuthModal close={() => setShowAuthModal(false)} />}
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                placeholder="Enter User Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(password) => setPassword(password)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => onSubmit(username, password)}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => setShowAuthModal(!showAuthModal)}
            >
              <Text style={styles.buttonTextStyle}>open</Text>
            </TouchableOpacity>
            {/* <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("register")}>
              New Here ? Register
            </Text> */}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1f1e1e",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#db403b",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#db403b",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
