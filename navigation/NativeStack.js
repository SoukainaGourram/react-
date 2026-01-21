import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NativeFeaturesScreen from "../screens/NativeFeaturesScreen"; // <-- importer ton screen

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Accueil" component={HomeScreen} />
      <Drawer.Screen name="Paramètres" component={SettingsScreen} />
      <Drawer.Screen
        name="Fonctionnalités natives"
        component={NativeFeaturesScreen} // <-- ajouter ton screen ici
      />
    </Drawer.Navigator>
  );
}
