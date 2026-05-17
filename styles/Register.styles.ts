import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    textAlign: "center",
    color: "#7F8C8D",
    marginBottom: 30,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
    color: "#2C3E50",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E6ED",
  },
  input: {
    flex: 1,
    color: "#333",
  },
  passwordHint: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#4A90E2",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: "#4A90E2",
  },
  termsText: {
    color: "#555",
  },
  link: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    elevation: 5,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#555",
  },
  loginLink: {
    color: "#4A90E2",
    fontWeight: "600",
  },
});
