import asyncStorage from "@react-native-community/async-storage";
var jwtDecode = require('jwt-decode');
import axios, { AxiosError } from "axios";

export const httpClient = axios.create();


export function isAccessTokenExpired(token: string | null): boolean {
  if (!token) return true;
  return jwtDecode(token).exp <= Date.now() / 1000;
}

const refreshToken = async () => {
  const data = await axios({
    url: "/refresh",
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("refreshToken")}` },
  });

  return data ? data.data.accessToken : null;
};

export async function setNewAccessTokenIfExpired() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  if (isAccessTokenExpired(token)) {
    const token = await refreshToken();

    if (token) {
      httpClient.defaults.headers["Authorization"] = "Bearer " + token;
      localStorage.setItem("accessToken", token);
      return token;
    } else {
      asyncStorage.clear();
      return null;
    }
  }
}
