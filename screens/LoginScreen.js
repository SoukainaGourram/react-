<<<<<<< HEAD
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function LoginScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ GOOGLE AUTH (WEB)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    responseType: "id_token",
    scopes: ["profile", "email"],
  });

  // ✅ HANDLE GOOGLE RESPONSE
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential).catch(() =>
        setError("Erreur Google Sign-In")
      );
    }
  }, [response]);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Compte déjà existant ou mot de passe faible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Connexion
      </Text>

      {error !== "" && (
        <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
          {error}
        </Text>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity onPress={login}>
            <Text>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={register}>
            <Text>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!request}
            onPress={() => request && promptAsync()}
          >
            <Text>Continuer avec Google</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 30 }}>
        <Text>Changer le thème</Text>
      </TouchableOpacity>
    </View>
  );
}
=======
import { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
export default function LoginScreen() {
const [name, setName] = useState("");
const { login } = useContext(AuthContext);
return (
<View style={styles.container}>
<Text style={styles.title}>Connexion</Text>
<TextInput
style={styles.input}
placeholder="Votre nom"

value={name}
onChangeText={setName}
/>
<Button title="Se connecter" onPress={() => login(name)} />
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
padding: 20,
},
title: { fontSize: 28, marginBottom: 20, textAlign: "center" },
input: {
borderWidth: 1,
borderColor: "#ccc",
marginBottom: 20,
padding: 10,
borderRadius: 6,
},
});
>>>>>>> 522f8a3fc7a0c8815f402f342ddd1e33079bd221
