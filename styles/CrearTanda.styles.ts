import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    padding: 20,
    backgroundColor: "#F4F6FA",
    flexGrow: 1
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
    color: "#333"
  },
  input: {
    backgroundColor: "#DADADA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    gap: 15
  },
  inputSmall: {
    backgroundColor: "#DADADA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  pagoBox: {
    backgroundColor: "#2EC4B6",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 20
  },
  pagoText: {
    color: "white",
    fontWeight: "600"
  },
  pagoMonto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },
  periodoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  periodoButton: {
    flex: 1,
    backgroundColor: "#DADADA",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 3
  },
  periodoActivo: {
    backgroundColor: "#3A7BD5"
  },
  finalizarButton: {
    backgroundColor: "#3A7BD5",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  finalizarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});