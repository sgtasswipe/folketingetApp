import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utilities/firebaseConfig";
import { styles } from "./styles/LoginStyles";

export default function SignUp2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

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
      <Text style={styles.title}>Sign Up</Text>

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
