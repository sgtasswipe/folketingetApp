import React, { useEffect, useState } from "react";
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
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { styles } from "./LoginStyles";
import MainApp from "./MainTabs";


export default function Login({ navigation }) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        navigation.replace("MainApp")
      }
  });
  return unsubscribe;
}, []);
   

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) =>
        console.log("Logged in with:", userCredentials.user.email)
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
      <Text style={styles.title}>Log in her:</Text>

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

      <Pressable style={styles.buttonStyle} onPress={handleLogin}> 
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

        {/* Button to navigate to SignUp screen */}
        <Pressable style={styles.buttonStyle} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.buttonText}>Opret dig som bruger</Text>
      </Pressable>
    </View>
  );
}
