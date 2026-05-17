import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  adminBadge: {
    backgroundColor: "#9C27B0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },

  detalle: {
    marginTop: 5,
    color: "#555",
  },
});