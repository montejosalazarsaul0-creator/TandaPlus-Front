import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/BottomTabs";

import { styles } from "../styles/Home.styles";
import { getMisTandas, deleteTanda } from "../services/tandas.service"; // 👈 agrega deleteTanda
import TandaCard from "../components/TandaCard";
import { AuthContext } from "../context/AuthContext";

type Props = BottomTabScreenProps<BottomTabParamList, "Inicio">;

type Tanda = {
  id: string;
  nombre: string;
  monto: number;
  participantes: number;
  turno?: number;
  estado: "activa" | "finalizada";
  role: "admin" | "member";
};

export default function HomeScreen({ navigation }: Props) {

  const { accessToken } = useContext(AuthContext);

  const [filter, setFilter] = useState("todas");
  const [menuVisible, setMenuVisible] = useState(false);
  const [tandas, setTandas] = useState<Tanda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTandas = async () => {
      try {
        if (!accessToken) return;
        const data = await getMisTandas();
        const formatted: Tanda[] = data.map((item: any) => ({
          id: item.tandas.id,
          nombre: item.tandas.nombre,
          monto: item.tandas.monto_total,
          participantes: item.tandas.cantidad_participantes,
          estado: item.tandas.estado,
          turno: item.turno,
          role: item.role
        }));
        setTandas(formatted);
      } catch (error) {
        console.log("Error cargando tandas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTandas();
  }, [accessToken]);

  /* =========================
  ELIMINAR TANDA
  ========================= */
  const handleDeleteTanda = async (tandaId: string) => {
    try {
      await deleteTanda(tandaId);
      // ✅ Actualiza lista local inmediatamente
      setTandas(prev => prev.filter(t => t.id !== tandaId));
    } catch (error: any) {
      console.log("Error eliminando tanda:", error);
    }
  };

  const filteredTandas =
    filter === "todas"
      ? tandas
      : tandas.filter((t) => t.estado === filter);

  const handleOpenTanda = (id: string) => {
    navigation.getParent()?.navigate("DetalleTanda", { tandaId: id });
  };

  const renderItem = ({ item }: { item: Tanda }) => (
    <TandaCard
      id={item.id}
      nombre={item.nombre}
      monto={item.monto}
      participantes={item.participantes}
      turno={item.turno}
      estado={item.estado}
      role={item.role}
      onPress={() => handleOpenTanda(item.id)}
      onDelete={() => handleDeleteTanda(item.id)} // 👈 nuevo
    />
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Mis Tandas</Text>

      <View style={styles.filters}>
        {["todas", "activa", "finalizada"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={{ color: filter === f ? "white" : "#333", fontWeight: "600" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTandas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          loading
            ? <Text style={{ textAlign: "center", marginTop: 40 }}>Cargando...</Text>
            : <Text style={{ textAlign: "center", marginTop: 40 }}>Aún no tienes tandas</Text>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setMenuVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.modalMenu}>

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.getParent()?.navigate("CrearTanda");
              }}
            >
              <Text style={styles.modalText}>Crear Tanda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.getParent()?.navigate("UnirseTanda");
              }}
            >
              <Text style={styles.modalText}>Unirse a Tanda</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}