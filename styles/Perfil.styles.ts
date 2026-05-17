import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
flex:1,
backgroundColor:"#F4F6FA",
padding:20,
paddingTop:60
},

backBtn:{
position:"absolute",
top:50,
left:20
},

avatar:{
width:90,
height:90,
borderRadius:45,
backgroundColor:"#2E7BE6",
justifyContent:"center",
alignItems:"center",
alignSelf:"center",
marginBottom:10
},

avatarText:{
color:"white",
fontSize:28,
fontWeight:"bold"
},

name:{
textAlign:"center",
fontSize:22,
fontWeight:"bold",
marginBottom:20
},

card:{
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:10,
elevation:3
},

label:{
fontSize:12,
color:"#888"
},

value:{
fontSize:16,
fontWeight:"600"
},

section:{
marginTop:20,
marginBottom:10,
fontWeight:"bold",
color:"#444"
},

cardOption:{
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:10,
elevation:3
},

logout:{
backgroundColor:"#F28B8B",
padding:15,
borderRadius:12,
marginTop:30,
alignItems:"center"
},

logoutText:{
fontWeight:"bold"
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
}

});