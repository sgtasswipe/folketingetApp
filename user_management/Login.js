import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  Alert,
  ActivityIndicator
} from "react-native";
import {
  signInWithEmailAndPassword,
  signInAnonymously
} from "firebase/auth";
import { styles } from "../styles/LoginStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login({ navigation, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  
  function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (!auth) {
      Alert.alert("Error", "Authentication service not available");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("Logged in with:", userCredentials.user.email);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        Alert.alert("Login Error", error.message);
        setLoading(false);
      });
  }
  
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
        Alert.alert("Guest Login Error", error.message);
        setLoading(false);
      });
  }
 
  if (!auth) {
    return (
      <View style={styles.container}>
        <Text>Authentication service is not available.</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView>
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "black" : "white" },
        ]}
      >
        <Text style={styles.title}>Log in her:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputStyle}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputStyle}
        />
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable style={styles.buttonStyle} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.buttonText}>Opret dig som bruger</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={handleGuestLogin}>
              <Text style={styles.buttonText}>Forsæt som gæst</Text>
            </Pressable>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}