import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
flex:1,
backgroundColor:"#F4F6FA",
padding:20,
paddingTop:40
},

backBtn:{
position:"absolute",
top:50,
left:20,
width:40,
height:40,
justifyContent:"center",
alignItems:"center",
borderRadius:20,
backgroundColor:"#E0E0E0",
zIndex:10
},

backText:{
fontSize:22,
fontWeight:"bold"
},

title:{
fontSize:26,
fontWeight:"bold",
textAlign:"center"
},

subtitle:{
textAlign:"center",
color:"#777",
marginBottom:20
},

codigoBox:{
backgroundColor:"#E8F0FE",
padding:15,
borderRadius:10,
alignItems:"center",
marginBottom:20
},

codigoLabel:{
fontSize:12,
color:"#666"
},

codigo:{
fontSize:22,
fontWeight:"bold",
color:"#4A6CF7",
letterSpacing:2
},

statsRow:{
flexDirection:"row",
justifyContent:"space-around",
marginBottom:20
},

stat:{
textAlign:"center",
color:"#4A6CF7",
fontWeight:"bold"
},

turnoCard:{
backgroundColor:"#DDD",
padding:15,
borderRadius:10,
marginBottom:20
},

turnoTitle:{
fontWeight:"bold",
marginBottom:5
},

turnoNombre:{
fontWeight:"bold",
fontSize:16
},

section:{
fontWeight:"bold",
marginBottom:10
},

card:{
backgroundColor:"#DDD",
padding:15,
borderRadius:10,
marginBottom:10
},

participanteRow:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between"
},

turnoBadge:{
backgroundColor:"#4A6CF7",
color:"white",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:6,
fontWeight:"bold"
},

adminTag:{
backgroundColor:"#F5B041",
paddingHorizontal:8,
paddingVertical:4,
borderRadius:6,
fontSize:12,
fontWeight:"bold"
},

name:{
fontWeight:"bold"
},

button:{
backgroundColor:"#4A6CF7",
padding:15,
borderRadius:10,
marginTop:20
},

buttonText:{
color:"white",
textAlign:"center",
fontWeight:"bold"
},

miTurno:{
backgroundColor:"#F5B041",
padding:15,
borderRadius:10,
marginBottom:20
},

miTurnoTitle:{
fontWeight:"bold"
},

estadoCard:{
borderWidth:1,
borderColor:"green",
padding:15,
borderRadius:10,
marginBottom:20
},

detailBox:{
borderWidth:1,
borderColor:"#DDD",
padding:15,
borderRadius:10,
marginBottom:10
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},
avatar:{
width:35,
height:35,
borderRadius:18,
backgroundColor:"#4A6CF7",
justifyContent:"center",
alignItems:"center"
},

avatarText:{
color:"white",
fontWeight:"bold"
},

turnoText:{
color:"#666",
fontSize:12
},

adminText:{
fontWeight:"bold",
fontSize:12
}

});