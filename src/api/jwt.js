import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';


export function setToken(type, token) {
  return AsyncStorage.setItem(type, token);
}
export function getToken(type) {
  return AsyncStorage.getItem(type);
}
export function isAccessTokenExpired(token)  {
  if (!token) return true;
  return jwtDecode(token).exp <= Date.now() / 1000;
}

export function getTokenIdentity(token)  {
  return token ? jwtDecode(token).identity : null;
}

export function getLoggedInUser() {
    const token = getToken("accessToken");
    return token ? getTokenIdentity(token) : null;
}

const refreshToken = async () => {
  const [data] = await axios({
    url: '/refresh',
    method: 'POST',
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
      AsyncStorage.clear();
      return null;
    }
  }
}