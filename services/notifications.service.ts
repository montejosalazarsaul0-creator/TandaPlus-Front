import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { api } from "./api";

// Configurar cómo se muestran las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,  // 👈
    shouldShowList: true     // 👈
  })
});

// Pedir permisos y obtener el token
export const registerForPushNotifications = async (): Promise<string | null> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permisos de notificación denegados");
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("EXPO PUSH TOKEN:", token);
    return token;

  } catch (error) {
    console.log("Error obteniendo push token:", error);
    return null;
  }
};

// Guardar token en el backend
export const savePushToken = async (token: string) => {
  try {
    await api.post("/api/auth/push-token", { token });
  } catch (error) {
    console.log("Error guardando push token:", error);
  }
};