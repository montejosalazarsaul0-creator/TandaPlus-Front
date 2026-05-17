import React,{useEffect,useState} from "react";
import {
View,
Text,
FlatList
} from "react-native";

import { getMisTandas } from "../services/tandas.service";

import TandaCard from "../components/TandaCard";

import { useNavigation } from "@react-navigation/native";

type Tanda={
id:string
nombre:string
monto:number
participantes:number
turno?:number
estado:"activa"|"finalizada"
role:"admin"|"member"
};

export default function TandasScreen(){

const navigation = useNavigation<any>();

const [tandas,setTandas]=useState<Tanda[]>([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

const fetchTandas = async()=>{

try{

const data = await getMisTandas();

const formatted:Tanda[]=data.map((item:any)=>({

id:item.tandas.id,
nombre:item.tandas.nombre,
monto:item.tandas.monto_total,
participantes:item.tandas.cantidad_participantes,
estado:item.tandas.estado,
turno:item.turno,
role:item.role

}));

setTandas(formatted);

}catch(error){

console.log("Error cargando tandas:",error);

}finally{

setLoading(false);

}

};

fetchTandas();

},[]);



const renderItem=({item}:{item:Tanda})=>(

<TandaCard
id={item.id}
nombre={item.nombre}
monto={item.monto}
participantes={item.participantes}
turno={item.turno}
estado={item.estado}
role={item.role}
onPress={()=>navigation.navigate("DetalleTanda",{tandaId:item.id})}
/>

);



return(

<View style={{
flex:1,
backgroundColor:"#F4F6FA",
paddingTop:60,
paddingHorizontal:20
}}>

<Text style={{
fontSize:26,
fontWeight:"bold",
marginBottom:20
}}>
Todas las Tandas
</Text>


<FlatList
data={tandas}
keyExtractor={(item)=>item.id}
renderItem={renderItem}
ListEmptyComponent={
loading
? <Text style={{textAlign:"center",marginTop:40}}>Cargando...</Text>
: <Text style={{textAlign:"center",marginTop:40}}>No tienes tandas</Text>
}
contentContainerStyle={{paddingBottom:120}}
/>

</View>

);

}