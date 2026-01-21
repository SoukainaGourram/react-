
import { View, Text } from "react-native"; 
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext"; 
import { ThemeContext } from "../context/ThemeContext"; 
import { SafeAreaView } from "react-native-safe-area-context"; 
 
export default function ProfileScreen() { 
 const { user } = useContext(AuthContext); 
 const { theme } = useContext(ThemeContext); 
 
 return ( 
   <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}> 
     <View style={{ padding: 20 }}> 
       <Text style={{ fontSize: 24, color: theme.text }}> 
         Profil utilisateur 
       </Text> 
       <Text style={{ color: theme.text }}>{user.email}</Text> 
     </View> 
   </SafeAreaView> 
 ); 
} 

import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
const { user, logout } = useContext(AuthContext);
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Text style={{ fontSize: 24 }}>Utilisateur : {user.username}</Text>

<Button title="Se déconnecter" onPress={logout} />
</View>
);
}

