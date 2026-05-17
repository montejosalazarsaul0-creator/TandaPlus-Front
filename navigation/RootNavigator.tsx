import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CrearTandaScreen from "../screens/CrearTandaScreen";
import UnirseTandaScreen from "../screens/UnirseTandaScreen";
import DetalleTandaScreen from "../screens/DetalleTanda";
import BottomTabs from "./BottomTabs";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

const { accessToken, loading } = useContext(AuthContext);

if (loading) {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" color="#4A90E2"/>
    </View>
  );
}

return (

<NavigationContainer>

<Stack.Navigator screenOptions={{headerShown:false}}>

{accessToken ? (

<>
<Stack.Screen name="MainTabs" component={BottomTabs}/>
<Stack.Screen name="CrearTanda" component={CrearTandaScreen}/>
<Stack.Screen name="UnirseTanda" component={UnirseTandaScreen}/>
<Stack.Screen name="DetalleTanda" component={DetalleTandaScreen}/>
</>

) : (

<>
<Stack.Screen name="Welcome" component={WelcomeScreen}/>
<Stack.Screen name="Login" component={LoginScreen}/>
<Stack.Screen name="Register" component={RegisterScreen}/>
</>

)}

</Stack.Navigator>

</NavigationContainer>

);

}
