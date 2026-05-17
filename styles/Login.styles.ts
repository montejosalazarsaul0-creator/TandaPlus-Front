import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 25,
    paddingTop: 70,
  },
  backButton: {
    position: "absolute",
  top: 50,
  left: 20,
  zIndex: 999,
  elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#2D3748",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    color: "#718096",
    marginBottom: 35,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#2D3748",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  input: {
    flex: 1,
  },
  forgot: {
    textAlign: "right",
    color: "#3B82F6",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    elevation: 4,
    marginBottom: 25,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CBD5E0",
  },
  or: {
    marginHorizontal: 10,
    color: "#718096",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 40,
  },
  googleDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#EA4335",
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    color: "#2D3748",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#718096",
  },
  registerLink: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});