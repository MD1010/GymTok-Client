import { useNavigation } from "@react-navigation/native";
import React, { createRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/authSlice";
import { Loader } from "../shared/Loader";

interface LoginProps {}

export const LoginScreen: React.FC<LoginProps> = () => {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const passwordInputRef = createRef<TextInput>();
  const { authError } = useSelector(authSelector);
  const handleSubmitPress = async () => {
    setErrortext("");
    if (!username) {
      alert("Please fill UserName");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    dispatch(login(username, password));
    setLoading(false);
    if (authError) {
      alert(authError);
    } else {
      navigation.navigate("home");
    }
  };
  console.log(isLoading);
  return (
    <View style={styles.mainBody}>
      <Loader isLoading={isLoading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
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
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
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
            {errortext != "" ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
            <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.registerTextStyle} onPress={() => navigation.navigate("register")}>
              New Here ? Register
            </Text>
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
