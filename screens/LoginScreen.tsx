import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { styles } from "../styles/Login.styles";
import { login } from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const goToRegister = () => {
    navigation.navigate("Register");
  };

 const handleLogin = async () => {

  if (!email || !password) {
    Alert.alert("Error", "Todos los campos son obligatorios");
    return;
  }

  try {

    setLoading(true);

    const data = await login({ email, password });

    const token = data.session?.access_token;
    const refreshToken = data.session?.refresh_token; // 

    if (!token || !refreshToken) {
      throw new Error("No se recibió token");
    }

    await signIn(token, refreshToken); //

  } catch (error: any) {

    Alert.alert(
      "Error",
      error.response?.data?.error || error.message || "Error al iniciar sesión"
    );

  } finally {

    setLoading(false);

  }

};

  return (

    <View style={styles.container}>

      {/* BACK */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>
        Iniciar Sesión
      </Text>

      <Text style={styles.subtitle}>
        Ingresa tus credenciales
      </Text>

      {/* EMAIL */}
      <Text style={styles.label}>
        Correo electrónico
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="usuario@ejemplo.com"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <MaterialIcons name="email" size={20} color="#C9B2E4" />
      </View>

      {/* PASSWORD */}
      <Text style={styles.label}>
        Contraseña
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <MaterialIcons name="lock" size={20} color="#F4B400" />
      </View>

      {/* FORGOT */}
      <TouchableOpacity>
        <Text style={styles.forgot}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Text>
      </TouchableOpacity>

      {/* DIVIDER */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>o</Text>
        <View style={styles.line} />
      </View>

      {/* GOOGLE */}
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.googleDot} />
        <Text style={styles.googleText}>
          Continuar con Google
        </Text>
      </TouchableOpacity>

      {/* REGISTER */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          ¿No tienes una cuenta?
        </Text>

        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerLink}>
            Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>

    </View>

  );

}
