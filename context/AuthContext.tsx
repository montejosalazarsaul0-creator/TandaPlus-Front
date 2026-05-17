import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../config/supabase";
import { registerForPushNotifications, savePushToken } from "../services/notifications.service";

type AuthContextType = {
  accessToken: string | null;
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  signIn: async () => {},
  signOut: async () => {},
  loading: true
});

export const AuthProvider = ({ children }: any) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refresh_token");
    setAccessToken(null);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedAccess = await AsyncStorage.getItem("token");
        const storedRefresh = await AsyncStorage.getItem("refresh_token");

        if (storedAccess && storedRefresh) {
          const { data, error } = await supabase.auth.setSession({
            access_token: storedAccess,
            refresh_token: storedRefresh
          });

          if (error || !data.session) {
            await clearSession();
            return;
          }

          const { data: userData, error: userError } = await supabase.auth.getUser(
            data.session.access_token
          );

          if (userError || !userData.user) {
            await clearSession();
            return;
          }

          await AsyncStorage.setItem("token", data.session.access_token);
          await AsyncStorage.setItem("refresh_token", data.session.refresh_token);
          setAccessToken(data.session.access_token);
        }

      } catch (e) {
        await clearSession();
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // ✅ signIn actualizado con push token
  const signIn = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem("token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);
    setAccessToken(accessToken);

    // Registrar push token
    const pushToken = await registerForPushNotifications();
    if (pushToken) {
      await savePushToken(pushToken);
    }
  };

  const signOut = async () => {
    await clearSession();
  };

  return (
    <AuthContext.Provider value={{ accessToken, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};