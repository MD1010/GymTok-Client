import asyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { setNewAccessTokenIfExpired } from "./jwt";

let url = "https://42556c920a46.ngrok.io";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await asyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    let requestConfig = error.config;
    if (error.response?.data.msg === "Token has expired") {
      axios.interceptors.response.eject(interceptor);
      setNewAccessTokenIfExpired();
      requestConfig.headers = httpClient.defaults.headers;
      return axios(requestConfig);
    }
    return Promise.reject(err);
  }
);

export default instance;
