import React, { useState } from "react";
import {
View,
Text,
TouchableOpacity,
TextInput,
ScrollView,
Alert
} from "react-native";

import { styles } from "../styles/CrearTanda.styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Ionicons } from "@expo/vector-icons";

import { createTanda } from "../services/tandas.service";

type Props = NativeStackScreenProps<RootStackParamList,"CrearTanda">;

export default function CrearTandaScreen({ navigation }: Props){

const [nombre,setNombre]=useState("");
const [montoTotal,setMontoTotal]=useState("");
const [participantes,setParticipantes]=useState("");

const [periodo,setPeriodo]=useState<
"semanal"|"quincenal"|"mensual"
>("semanal");

const pago =
Number(montoTotal) && Number(participantes)
? Number(montoTotal)/Number(participantes)
: 0;



const handleFinalizar = async()=>{

if(!nombre || !montoTotal || !participantes){

Alert.alert(
"Campos incompletos",
"Completa todos los campos"
);

return;

}

try{

const data = await createTanda({

nombre,
monto_total:Number(montoTotal),
cantidad_participantes:Number(participantes),
pago_por_participante:pago,
periodo_pago:periodo,
fecha_inicio:new Date()



});

console.log("RESPUESTA CREAR TANDA:", JSON.stringify(data)); // 👈
console.log("TANDA ID:", data?.tanda?.id); // 👈

navigation.navigate("DetalleTanda", { tandaId: data.tanda.id });

}catch(error:any){
    console.log("ERROR CREAR TANDA:", error); // 👈

Alert.alert(
"Error",
error.response?.data?.error ||
"No se pudo crear la tanda"
);

}

};



return(

<ScrollView
contentContainerStyle={styles.container}
keyboardShouldPersistTaps="handled"
>

<TouchableOpacity
style={styles.backButton}
onPress={()=>navigation.navigate("MainTabs")}
>

<Ionicons name="arrow-back" size={24} color="#333"/>

</TouchableOpacity>



<Text style={styles.title}>
Información Básica
</Text>



<Text style={styles.label}>
Nombre de la tanda
</Text>

<TextInput
style={styles.input}
placeholder="Ej. Tanda Familiar"
placeholderTextColor="#777"
value={nombre}
onChangeText={setNombre}
/>



<View style={styles.row}>

<View style={{flex:1}}>

<Text style={styles.label}>
Monto Total
</Text>

<TextInput
style={styles.inputSmall}
keyboardType="numeric"
value={montoTotal}
onChangeText={setMontoTotal}
/>

</View>



<View style={{flex:1}}>

<Text style={styles.label}>
Participantes
</Text>

<TextInput
style={styles.inputSmall}
keyboardType="numeric"
value={participantes}
onChangeText={setParticipantes}
/>

</View>

</View>



<View style={styles.pagoBox}>

<Text style={styles.pagoText}>
💡 Pago por participante
</Text>

<Text style={styles.pagoMonto}>
${pago.toFixed(2)} MXN
</Text>

</View>



<Text style={styles.label}>
Periodicidad de pago
</Text>



<View style={styles.periodoRow}>

{["semanal","quincenal","mensual"].map((item)=>(

<TouchableOpacity
key={item}
style={[
styles.periodoButton,
periodo===item && styles.periodoActivo
]}
onPress={()=>setPeriodo(item as any)}
>

<Text
style={{
color:periodo===item?"white":"#333",
fontWeight:"600"
}}
>

{item.charAt(0).toUpperCase()+item.slice(1)}

</Text>

</TouchableOpacity>

))}

</View>



<Text style={styles.label}>
Fecha de inicio
</Text>

<View style={styles.input}>
<Text>{new Date().toLocaleDateString()}</Text>
</View>



<TouchableOpacity
style={styles.finalizarButton}
onPress={handleFinalizar}
>

<Text style={styles.finalizarText}>
Finalizar
</Text>

</TouchableOpacity>

</ScrollView>

);

}

