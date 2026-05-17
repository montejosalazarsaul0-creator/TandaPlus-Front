import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/Welcome.styles";


type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5B7FFF", "#7A4FD6"]}
        style={styles.topSection}
      >
        <View style={styles.iconCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.moneyIcon}>💰</Text>
          </View>
        </View>

        <Text style={styles.title}>TandaPlus</Text>
        <Text style={styles.subtitle}>
          Administra tus tandas de forma fácil{"\n"}y segura
        </Text>
      </LinearGradient>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleRegister}
        >
          <Text style={styles.secondaryButtonText}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Al continuar, aceptas nuestros{" "}
          <Text style={styles.link}>
            Términos y Condiciones
          </Text>
        </Text>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="ellipse" size={8} color="#2ECC71" />
            <Text style={styles.featureText}>
              Sin pagos en línea
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="ellipse" size={8} color="#2ECC71" />
            <Text style={styles.featureText}>
              Control total de tu tanda
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="ellipse" size={8} color="#2ECC71" />
            <Text style={styles.featureText}>
              100% gratis
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

