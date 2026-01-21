<<<<<<< HEAD
import React from "react";
import { View, Text, Button } from "react-native";
export default function SettingsScreen() { 
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
      <Text>⚙  Paramètres</Text> 
    </View> 
  ); 
} 
=======
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Ionicons name="settings" size={50} color="#333" />
      <Text style={styles.title}>Paramètres</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
  },
});
>>>>>>> 522f8a3fc7a0c8815f402f342ddd1e33079bd221
