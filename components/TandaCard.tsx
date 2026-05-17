import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/TandaCard.styles";

type Props = {
  id: string;
  nombre: string;
  monto: number;
  participantes: number;
  turno?: number;
  estado: "activa" | "finalizada";
  role: "admin" | "member";
  onPress: () => void;
  onDelete?: () => void; // 👈 nuevo
};

export default function TandaCard({
  nombre,
  monto,
  participantes,
  turno,
  estado,
  role,
  onPress,
  onDelete, // 👈 nuevo
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>

        <View style={styles.topRow}>
          <View
            style={[
              styles.estadoBadge,
              estado === "activa"
                ? { backgroundColor: "#4CAF50" }
                : { backgroundColor: "#999" },
            ]}
          >
            <Text style={styles.badgeText}>
              {estado.toUpperCase()}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {role === "admin" && (
              <View style={styles.adminBadge}>
                <Text style={styles.badgeText}>ADMIN</Text>
              </View>
            )}

            {/* 🗑 Botón eliminar — solo admin */}
            {role === "admin" && onDelete && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation?.();
                  Alert.alert(
                    "Eliminar tanda",
                    `¿Estás seguro de eliminar "${nombre}"?`,
                    [
                      { text: "Cancelar", style: "cancel" },
                      { text: "Eliminar", style: "destructive", onPress: onDelete }
                    ]
                  );
                }}
                style={{
                  backgroundColor: "#e74c3c",
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 14 }}>🗑</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.nombre}>{nombre}</Text>

        <Text style={styles.detalle}>
          ${monto} •{" "}
          {turno ? `Turno ${turno}` : `${participantes} participantes`}
        </Text>

      </View>
    </TouchableOpacity>
  );
}

