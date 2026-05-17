import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://192.168.1.66:3000"
  //baseURL: "http://localhost:3000"
});

// interceptor de request — agrega el token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log("Token que se envia:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// limpia sesión si el token es inválido
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refresh_token");
    }
    return Promise.reject(error);
  }
);