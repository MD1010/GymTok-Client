import { useNavigation } from "@react-navigation/native";
import React, { createRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { Loader } from "../shared/Loader";

interface RegisterProps {}

export const RegisterScreen: React.FC<RegisterProps> = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const dispatch = useDispatch();
  const fullNameInputRef = createRef<TextInput>();
  const passwordInputRef = createRef<TextInput>();
  const { authError } = useSelector(authSelector);
  const navigation = useNavigation();
  const handleSubmitButton = async () => {
    if (!userName) {
      alert("Please fill User Name");
      return;
    }
    if (!fullName) {
      alert("Please fill Full Name");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    await dispatch(register(userName, fullName, userPassword));
    setLoading(false);

    if (authError) {
      alert(authError);
    } else {
      setIsRegistraionSuccess(true);
    }
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#307ecc",
          justifyContent: "center",
        }}
      >
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={() => navigation.navigate("login")}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#1f1e1e" }}>
      {isLoading && <Loader />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          /> */}
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter UserName"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => fullNameInputRef.current && fullNameInputRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(fullName) => setFullName(fullName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Full Name"
              placeholderTextColor="#8b9cb5"
              ref={fullNameInputRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {/* {errortext != "" ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null} */}
          <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
