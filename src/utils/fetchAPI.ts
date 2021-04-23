import localStorage from "@react-native-community/async-storage";
import axios, { AxiosError } from "axios";
import { cos } from "react-native-reanimated";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export const httpClient = axios.create();

httpClient.defaults.headers.Authorization = `"Bearer" ${localStorage.getItem("aceessToken")}`;

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
