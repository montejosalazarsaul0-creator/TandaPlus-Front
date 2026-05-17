import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
padding:20,
backgroundColor:"#F4F6FA",
flexGrow:1
},

backButton:{
marginTop:40,
marginBottom:10
},

title:{
fontSize:24,
fontWeight:"bold"
},

subtitle:{
color:"#555",
marginBottom:20
},

ticketBox:{
backgroundColor:"#FF6B6B",
padding:20,
borderRadius:12,
alignItems:"center",
marginBottom:20
},

ticketText:{
color:"white",
fontWeight:"bold",
fontSize:18
},

infoBox:{
backgroundColor:"#B2EBF2",
padding:15,
borderRadius:10,
marginBottom:20
},

infoTitle:{
fontWeight:"bold",
marginBottom:5
},

infoText:{
color:"#333"
},

label:{
marginBottom:10,
fontWeight:"500"
},

codigoRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

codigoInput:{
width:55,
height:55,
backgroundColor:"#DADADA",
borderRadius:10,
textAlign:"center",
fontSize:20,
fontWeight:"bold"
},

codigoValido:{
marginBottom:20
},

unirseButton:{
backgroundColor:"#4FC3F7",
paddingVertical:15,
borderRadius:10,
alignItems:"center",
marginBottom:15
},

unirseText:{
color:"white",
fontWeight:"bold"
},

cancelarButton:{
borderWidth:1,
borderColor:"#4FC3F7",
paddingVertical:15,
borderRadius:10,
alignItems:"center"
},

cancelarText:{
color:"#333",
fontWeight:"500"
}

});