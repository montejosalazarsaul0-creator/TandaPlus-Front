import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },
  filters: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 10
  },
  filterActive: {
    backgroundColor: "#4A6CF7"
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  adminBadge: {
    backgroundColor: "#9C27B0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold"
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold"
  },
  detalle: {
    marginTop: 5,
    color: "#555"
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 40,
    width: 60,
    height: 60,
    backgroundColor: "#4A6CF7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  fabText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end"
  },
  modalMenu: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalItem: {
    paddingVertical: 15
  },
  bottomBar: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 70,
  backgroundColor: "white",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: "#E0E0E0",
  elevation: 10
},
tabItem: {
  alignItems: "center"
},
tabText: {
  color: "#777",
  fontWeight: "600"
},
tabActive: {
  color: "#4A6CF7",
  fontWeight: "bold"
},
modalText: {
  fontSize: 16,
  fontWeight: "600"
}

});