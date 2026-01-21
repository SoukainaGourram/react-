<<<<<<< HEAD
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------- HOME STACK ---------------- */
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

/* ---------------- APP CONNECTÉE ---------------- */
function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Maison" component={HomeStack} />
      <Tab.Screen name="Paramètres" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/* ---------------- ROUTES ---------------- */
function Routes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
}

/* ---------------- ROOT ---------------- */
export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
=======
import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

function MainApp() {
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.container,
                theme === "dark" ? styles.dark : styles.light,
            ]}
        >
            <TodoListOfflineScreen />
        </View>
    );
}

export default function App() {
    const [dbReady, setDbReady] = useState(false);

    useEffect(() => {
        const prepareDb = async () => {
            await initDB();   // attendre SQLite 
            setDbReady(true); // OK pour afficher l’app 
        };

        prepareDb();
    }, []);

    if (!dbReady) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <ThemeProvider>
            <MainApp />
        </ThemeProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    light: {
        backgroundColor: "#ffffff",
    },
    dark: {
        backgroundColor: "#121212",
    },
}); 
>>>>>>> 522f8a3fc7a0c8815f402f342ddd1e33079bd221
