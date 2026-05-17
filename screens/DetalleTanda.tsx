import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Share,
  Alert
} from "react-native";

import { styles } from "../styles/DetalleTanda.styles";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  getTandaById,
  marcarPago,
  removeParticipante,
  deleteTanda,
  getSolicitudes,
  aceptarSolicitud,
  rechazarSolicitud
} from "../services/tandas.service";

export default function DetalleTandaScreen() {

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { tandaId } = route.params;
  const [tanda, setTanda] = useState<any>(null);
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchDetalle = async () => {
        try {
          const data = await getTandaById(tandaId);
          setTanda(data);

          // ✅ Cargar solicitudes si es admin
          if (data.role === "admin") {
            const sols = await getSolicitudes(tandaId);
            setSolicitudes(sols);
          }
        } catch (error) {
          console.log("Error cargando detalle:", error);
        }
      };
      fetchDetalle();
    }, [])
  );

  if (!tanda) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const esAdmin = tanda.role === "admin";
  const admin = tanda.participantes?.find((p: any) => p.role === "admin");

  const compartirCodigo = async () => {
    try {
      await Share.share({
        message: `Únete a mi tanda usando este código:\n\n${tanda.codigo_invitacion}`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarcarPago = async (pagoId: string) => {
    try {
      await marcarPago(pagoId);
      setTanda((prev: any) => ({
        ...prev,
        participantes: prev.participantes.map((p: any) =>
          p.pago_id === pagoId ? { ...p, pagado: true } : p
        )
      }));
    } catch (error) {
      console.log("Error marcar pago:", error);
    }
  };

  const handleEliminarParticipante = async (userId: string, nombre: string) => {
    Alert.alert(
      "Eliminar participante",
      `¿Estás seguro de eliminar a ${nombre} de la tanda?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await removeParticipante(tandaId, userId);
              setTanda((prev: any) => ({
                ...prev,
                participantes: prev.participantes.filter((p: any) => p.id !== userId)
              }));
            } catch (error: any) {
              Alert.alert("Error", error.response?.data?.error || "No se pudo eliminar al participante");
            }
          }
        }
      ]
    );
  };

  const handleEliminarTanda = async () => {
    Alert.alert(
      "Eliminar tanda",
      `¿Estás seguro de eliminar la tanda "${tanda.nombre}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTanda(tandaId);
              Alert.alert("Éxito", "Tanda eliminada correctamente");
              navigation.navigate("MainTabs");
            } catch (error: any) {
              Alert.alert("Error", error.response?.data?.error || "No se pudo eliminar la tanda");
            }
          }
        }
      ]
    );
  };

  /* =========================
  ACEPTAR SOLICITUD
  ========================= */
  const handleAceptar = async (userId: string, nombre: string) => {
    try {
      await aceptarSolicitud(tandaId, userId);

      // ✅ Quitar de solicitudes
      setSolicitudes(prev => prev.filter(s => s.user_id !== userId));

      // ✅ Recargar tanda para ver nuevo participante
      const data = await getTandaById(tandaId);
      setTanda(data);

      Alert.alert("✅ Aceptado", `${nombre} ahora es parte de la tanda`);
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.error || "No se pudo aceptar");
    }
  };

  /* =========================
  RECHAZAR SOLICITUD
  ========================= */
  const handleRechazar = async (userId: string, nombre: string) => {
    Alert.alert(
      "Rechazar solicitud",
      `¿Rechazar la solicitud de ${nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Rechazar",
          style: "destructive",
          onPress: async () => {
            try {
              await rechazarSolicitud(tandaId, userId);
              setSolicitudes(prev => prev.filter(s => s.user_id !== userId));
              Alert.alert("Rechazado", `La solicitud de ${nombre} fue rechazada`);
            } catch (error: any) {
              Alert.alert("Error", error.response?.data?.error || "No se pudo rechazar");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{tanda.nombre}</Text>

      <Text style={styles.subtitle}>
        {esAdmin ? "Creada por ti" : `Admin: ${admin?.nombre ?? "Desconocido"}`}
      </Text>

      {esAdmin && (
        <View style={styles.codigoBox}>
          <Text style={styles.codigoLabel}>Código de invitación</Text>
          <Text style={styles.codigo}>{tanda.codigo_invitacion}</Text>
        </View>
      )}

      {/* ============================
      SOLICITUDES PENDIENTES
      ============================ */}
      {esAdmin && solicitudes.length > 0 && (
        <View style={{
          backgroundColor: "#FFF8E1",
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor: "#F4B400"
        }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: 8 }}>
            🔔 Solicitudes pendientes ({solicitudes.length})
          </Text>

          {solicitudes.map((sol: any) => (
            <View key={sol.user_id} style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 6,
              borderBottomWidth: 1,
              borderBottomColor: "#eee"
            }}>
              <View>
                <Text style={{ fontWeight: "600" }}>{sol.nombre}</Text>
                <Text style={{ color: "#666", fontSize: 12 }}>{sol.email}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                {/* ACEPTAR */}
                <TouchableOpacity
                  onPress={() => handleAceptar(sol.user_id, sol.nombre)}
                  style={{
                    backgroundColor: "#2ecc71",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>
                </TouchableOpacity>

                {/* RECHAZAR */}
                <TouchableOpacity
                  onPress={() => handleRechazar(sol.user_id, sol.nombre)}
                  style={{
                    backgroundColor: "#e74c3c",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>✗</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.section}>Participantes</Text>

      <FlatList
        data={tanda.participantes}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        contentContainerStyle={{ paddingBottom: 180 }}
        renderItem={({ item }) => {

          const inicial = item.nombre ? item.nombre.charAt(0).toUpperCase() : "?";
          const esElAdmin = item.role === "admin";

          return (
            <View style={styles.card}>

              <View style={styles.participanteRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{inicial}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>
                    {item.nombre ?? "Participante"}
                    {item.turno === tanda.mi_turno ? " (Tú)" : ""}
                  </Text>
                  <Text style={styles.turnoText}>Turno {item.turno}</Text>
                  <Text style={{ fontWeight: "bold", color: item.pagado ? "green" : "orange" }}>
                    {item.pagado ? "✔ Pagado" : "⏳ Pendiente"}
                  </Text>
                </View>

                {esElAdmin && (
                  <View style={styles.adminTag}>
                    <Text style={styles.adminText}>ADMIN</Text>
                  </View>
                )}
              </View>

              {esAdmin && (
                <TouchableOpacity
                  style={[styles.button, item.pagado && { backgroundColor: "green" }]}
                  onPress={() => !item.pagado && handleMarcarPago(item.pago_id)}
                  disabled={item.pagado}
                >
                  <Text style={styles.buttonText}>
                    {item.pagado ? "✔ Pagado" : "Marcar pagado"}
                  </Text>
                </TouchableOpacity>
              )}

              {esAdmin && !esElAdmin && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#e74c3c", marginTop: 6 }]}
                  onPress={() => handleEliminarParticipante(item.id, item.nombre)}
                >
                  <Text style={styles.buttonText}>🗑 Eliminar</Text>
                </TouchableOpacity>
              )}

            </View>
          );
        }}
      />

      {esAdmin && (
        <View style={{ gap: 8 }}>
          <TouchableOpacity style={styles.button} onPress={compartirCodigo}>
            <Text style={styles.buttonText}>Agregar participante</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
            onPress={handleEliminarTanda}
          >
            <Text style={styles.buttonText}>🗑 Eliminar tanda</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}