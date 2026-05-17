import React, { useState, useEffect, useRef } from "react";
import {
View,
Text,
TouchableOpacity,
TextInput,
ScrollView,
Alert
} from "react-native";

import { styles } from "../styles/UnirseTanda.styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";
import {
verificarCodigo,
joinTanda
} from "../services/tandas.service";

type Props = NativeStackScreenProps<
RootStackParamList,
"UnirseTanda"
>;

export default function UnirseTandaScreen({ navigation }: Props) {

const [codigo,setCodigo] = useState(["","","","",""]);
const [mensaje,setMensaje] = useState("");

const inputs = useRef<(TextInput | null)[]>([]);

const codigoCompleto = codigo.join("");



/* =========================
MANEJAR INPUT
========================= */

const handleChange = (text:string,index:number)=>{

const newCode=[...codigo];

newCode[index]=text.toUpperCase();

setCodigo(newCode);


// mover cursor siguiente
if(text && index<4){
inputs.current[index+1]?.focus();
}


// volver atrás si borra
if(!text && index>0){
inputs.current[index-1]?.focus();
}

};



/* =========================
VERIFICAR CÓDIGO
========================= */

useEffect(()=>{

if(codigoCompleto.length===5){
verificar();
}else{
setMensaje("");
}

},[codigoCompleto]);



const verificar = async()=>{

try{

const data = await verificarCodigo(codigoCompleto);

if(data){

setMensaje("✓ Código válido encontrado");

}else{

setMensaje("Código inválido");

}

}catch{

setMensaje("Código inválido");

}

};



/* =========================
UNIRSE A TANDA
========================= */

const handleUnirse = async()=>{

if(codigoCompleto.length!==5){

Alert.alert(
"Código incompleto",
"Ingresa los 5 caracteres"
);

return;

}

try{

await joinTanda(codigoCompleto);

Alert.alert(
"Éxito",
"Te uniste a la tanda 🎉"
);

navigation.navigate("MainTabs");

}catch(error:any){

Alert.alert(
"Error",
error.response?.data?.error ||
"No se pudo unir a la tanda"
);

}

};



/* =========================
UI
========================= */

return(

<ScrollView contentContainerStyle={styles.container}>


{/* BACK */}

<TouchableOpacity
style={styles.backButton}
onPress={()=>navigation.navigate("MainTabs")}
>

<Ionicons
name="arrow-back"
size={24}
color="#333"
/>

</TouchableOpacity>



<Text style={styles.title}>
Unirse a Tanda
</Text>



<Text style={styles.subtitle}>
Ingresa el código de invitación
</Text>



<View style={styles.ticketBox}>
<Text style={styles.ticketText}>
ADMIT ONE
</Text>
</View>



<View style={styles.infoBox}>

<Text style={styles.infoTitle}>
💡 ¿Cómo funciona?
</Text>

<Text style={styles.infoText}>
El administrador de la tanda te compartió
un código de 5 caracteres.
Ingrésalo a continuación.
</Text>

</View>



<Text style={styles.label}>
Código de invitación
</Text>



<View style={styles.codigoRow}>

{codigo.map((valor,index)=>(

<TextInput
key={index}
ref={(ref)=>{
inputs.current[index]=ref;
}}
style={styles.codigoInput}
maxLength={1}
value={valor}
onChangeText={(text)=>handleChange(text,index)}
autoCapitalize="characters"
/>

))}

</View>



{mensaje !== "" && (

<Text
style={[
styles.codigoValido,
mensaje.includes("válido")
? {color:"green"}
: {color:"red"}
]}
>

{mensaje}

</Text>

)}



{/* BOTON UNIRSE */}

<TouchableOpacity
style={styles.unirseButton}
onPress={handleUnirse}
>

<Text style={styles.unirseText}>
Unirse a esta tanda
</Text>

</TouchableOpacity>



{/* CANCELAR */}

<TouchableOpacity
style={styles.cancelarButton}
onPress={()=>navigation.navigate("MainTabs")}
>

<Text style={styles.cancelarText}>
Cancelar
</Text>

</TouchableOpacity>


</ScrollView>

);

}