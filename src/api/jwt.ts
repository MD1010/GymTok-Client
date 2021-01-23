import asyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function setToken(type, token) {
  return asyncStorage.setItem(type, token);
}
export function getToken(type) {
  return asyncStorage.getItem(type);
}
export function isAccessTokenExpired(token) {
  if (!token) return true;
  return jwtDecode(token).exp <= Date.now() / 1000;
}

export function getTokenIdentity(token) {
  return token ? jwtDecode(token).identity : null;
}

export function getLoggedInUser() {
  const token = getToken("accessToken");
  return token ? getTokenIdentity(token) : null;
}

const refreshToken = async () => {
  const [data] = await axios({
    url: "/refresh",
    method: "POST",
    body: { username: getLoggedInUser() },
    headers: { Authorization: `Bearer ${getToken("refreshToken")}` },
  });

  return data ? data.access_token : null;
};
export async function setNewAccessTokenIfExpired() {
  const token = getToken(TokenType.ACCESS);
  if (!token) return null;
  if (isAccessTokenExpired(token)) {
    const token = await refreshToken();

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      setToken("accessToken", token);
      return token;
    } else {
      asyncStorage.clear();
      return null;
    }
  }
}
