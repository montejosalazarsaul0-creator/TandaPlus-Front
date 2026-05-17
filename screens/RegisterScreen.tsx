import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { styles } from "../styles/Register.styles";
import { register, login } from "../services/auth.service"; 

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {

  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleGoBack = () => navigation.goBack();
  const goToLogin = () => navigation.navigate("Login");

  const handleRegister = async () => {

    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (!accepted) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones");
      return;
    }

    try {

      setLoading(true);

      // 1️⃣ Registrar usuario
      await register({ name, email, phone, password });

      // 2️⃣ Login automático
      const loginData = await login({ email, password });

      const token = loginData.session?.access_token;
      const refreshToken = loginData.session?.refresh_token;

      if (!token || !refreshToken) {
        throw new Error("No se recibió access_token");
      }

      // 3️⃣ Guardar sesión y navegar
      await signIn(token, refreshToken);

    } catch (error: any) {

      Alert.alert(
        "Error",
        error.response?.data?.error || error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

      <Text style={styles.label}>Nombre completo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Juan Pérez García"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <MaterialIcons name="person" size={20} color="#7A4FD6" />
      </View>

      <Text style={styles.label}>Correo electrónico</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="juan.perez@ejemplo.com"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <MaterialIcons name="email" size={20} color="#C9B2E4" />
      </View>

      <Text style={styles.label}>Teléfono</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="+52 999 123 4567"
          placeholderTextColor="#999"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <MaterialIcons name="phone-iphone" size={20} color="#F4B400" />
      </View>

      <Text style={styles.label}>Contraseña</Text>
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

      <Text style={styles.passwordHint}>Mínimo 8 caracteres</Text>

      <Text style={styles.label}>Confirmar contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <MaterialIcons name="lock" size={20} color="#F4B400" />
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
      >
        <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
          {accepted && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={styles.termsText}>
          Acepto los{" "}
          <Text style={styles.link}>Términos y Condiciones</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>

    </View>

  );

}

  