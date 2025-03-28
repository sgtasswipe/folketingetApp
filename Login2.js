import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { styles } from "./LoginStyles";

export default function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) =>
        console.log("Logged in with:", userCredentials.user.email)
      )
      .catch((error) => console.log("Error:", error.message));
  }

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) =>
        console.log("Signed up with:", userCredentials.user.email)
      )
      .catch((error) => console.log("Error:", error.message));
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "black" : "white" },
      ]}
    >
      <Text style={styles.title}>Velkommen til folketinget</Text>
      <Text style={styles.subtitle}>Log in her:</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputStyle}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputStyle}
      />

      <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}
