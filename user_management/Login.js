import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../utilities/firebaseConfig"
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/LoginStyles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Fejl", "Udfyld både email og adgangskode");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Login fejlede", error.message);
    } finally {
      setLoading(false);
    }
  };
  function handleGuestLogin() {
    if (!auth) {
      Alert.alert("Error", "Authentication service not available");
      return;
    }
    
    setLoading(true);
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in anonymously");
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred:", error.message);
        Alert.alert("Der var en fejl med gæste-login", error.message);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log ind</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Adgangskode"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Opret bruger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleGuestLogin}>
              <Text style={styles.buttonText}>Forsæt som gæst</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
}
