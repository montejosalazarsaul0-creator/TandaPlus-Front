import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity, Alert
} from "react-native";

import { styles } from "../styles/Perfil.styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../services/auth.service";

export default function ProfileScreen(){

  const navigation = useNavigation<any>();

  const { accessToken, signOut } = useContext(AuthContext);

  const [profile,setProfile] = useState<any>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchProfile = async()=>{

      try{

        if(!accessToken) return; // 🔥 CLAVE

        const data = await getProfile();

        setProfile(data.profile);

      }catch(error){
        console.log("Error cargando perfil:",error);
      }finally{
        setLoading(false);
      }

    };

    fetchProfile();

  },[accessToken]); // 🔥 CLAVE

  if(loading){
    return(
      <View style={styles.center}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if(!profile){
    return(
      <View style={styles.center}>
        <Text>No se pudo cargar el perfil</Text>
      </View>
    );
  }

  const iniciales = profile.full_name
    ?.split(" ")
    .map((n:string)=>n[0])
    .join("")
    .substring(0,2)
    .toUpperCase();

  return(

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={()=>navigation.navigate("Inicio")}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{iniciales}</Text>
      </View>

      <Text style={styles.name}>
        {profile.full_name}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>EMAIL</Text>
        <Text style={styles.value}>{profile.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>TELÉFONO</Text>
        <Text style={styles.value}>
          {profile.phone ?? "No registrado"}
        </Text>
      </View>

      <Text style={styles.section}>Configuración</Text>

      <View style={styles.cardOption}>
        <Text>✏️ Editar perfil</Text>
      </View>

      <View style={styles.cardOption}>
        <Text>🔔 Notificaciones</Text>
      </View>

      <View style={styles.cardOption}>
        <Text>🔒 Seguridad</Text>
      </View>

     <TouchableOpacity
  style={styles.logout}
  onPress={() => {
    Alert.alert(
      "¿Cerrar sesión?",
      "Tendrás que volver a iniciar sesión para acceder a tu cuenta.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar Sesión",
          style: "destructive",
          onPress: signOut
        }
      ]
    );
  }}
>
  <Text style={styles.logoutText}>
    Cerrar sesión
  </Text>
</TouchableOpacity>

    </View>
  );
}