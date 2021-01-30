import localStorage from "@react-native-community/async-storage";
import axios, { AxiosError } from "axios";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export const httpClient = axios.create();

httpClient.defaults.timeout = 5000;
httpClient.defaults.headers['Authorization'] = `"Bearer" ${localStorage.getItem("accessToken")}`;

const interceptor = httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    let requestConfig = error.config;
    if (error.response?.data.msg === "Token has expired") {
      axios.interceptors.response.eject(interceptor);
      //   await setNewAccessTokenIfExpired();
      requestConfig.headers = httpClient.defaults.headers;
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export const fetchAPI = async <T = any>(
  method: RequestMethod,
  url: string,
  body?: any,
  params?: any,
  headers?: any
): Promise<{
  res: T | null;
  error: string | null;
}> => {
  switch (method) {
    case RequestMethod.GET: {
      try {
        const { data } = await httpClient.get<T>(url, { params, headers });
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: error.response?.data || error.message };
      }
    }
    case RequestMethod.POST: {
      try {
        const { data } = await httpClient.post<T>(url, body, { headers, method });
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: error.response?.data || error.message };
      }
    }

    case RequestMethod.DELETE: {
      try {
        const { data } = await httpClient.delete<T>(url);
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: error.response?.data || error.message };
      }
    }
    case RequestMethod.PUT: {
      try {
        const { data } = await httpClient.put<T>(url);
        return { res: data, error: null };
      } catch (error) {
        return { res: null, error: error.response?.data || error.message };
      }
    }

    default:
      throw "Method specified doesn't exist";
  }
};
