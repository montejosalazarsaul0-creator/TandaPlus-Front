import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: "#7A4FD6",
},

topSection: {
flex: 1.2,
alignItems: "center",
justifyContent: "center",
paddingTop: 60,
},

iconCircle: {
width: 120,
height: 120,
borderRadius: 60,
backgroundColor: "rgba(255,255,255,0.2)",
alignItems: "center",
justifyContent: "center",
marginBottom: 20,
},

innerCircle: {
width: 90,
height: 90,
borderRadius: 45,
backgroundColor: "rgba(255,255,255,0.3)",
alignItems: "center",
justifyContent: "center",
},

moneyIcon: {
fontSize: 40,
},

title: {
fontSize: 34,
fontWeight: "bold",
color: "white",
},

subtitle: {
marginTop: 10,
fontSize: 16,
color: "white",
textAlign: "center",
opacity: 0.9,
},

bottomSection: {
flex: 1,
backgroundColor: "#F2F2F2",
borderTopLeftRadius: 30,
borderTopRightRadius: 30,
padding: 25,
},

primaryButton: {
backgroundColor: "#4A90E2",
paddingVertical: 18,
borderRadius: 30,
alignItems: "center",
elevation: 5,
marginBottom: 20,
},

primaryButtonText: {
color: "white",
fontSize: 18,
fontWeight: "600",
},

secondaryButton: {
borderWidth: 2,
borderColor: "#4A90E2",
paddingVertical: 18,
borderRadius: 30,
alignItems: "center",
marginBottom: 20,
},

secondaryButtonText: {
color: "#4A90E2",
fontSize: 18,
fontWeight: "600",
},

termsText: {
textAlign: "center",
fontSize: 12,
color: "#555",
marginBottom: 25,
},

link: {
color: "#4A90E2",
fontWeight: "600",
},

features: {
marginTop: 10,
},

featureItem: {
flexDirection: "row",
alignItems: "center",
marginBottom: 10,
},

featureText: {
marginLeft: 10,
fontSize: 14,
color: "#444",
},

});