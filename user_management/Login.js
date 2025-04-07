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
  signInWithEmailAndPassword,
  onAuthStateChanged, signInAnonymously
} from "firebase/auth";
import { auth } from "../utilities/firebaseConfig";
import { styles } from "../styles/LoginStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";




export default function Login({ navigation }) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Don't use navigation.reset here - the App.js component
        // will automatically update due to state change
        console.log("User is signed in:", user.email);
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

  function handleGuestLogin() {
    signInAnonymously(auth).then().catch((error)=> console.log("An error occured:", error.message))
    
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
      <Pressable style={styles.buttonStyle} onPress={handleGuestLogin}>
        <Text style={styles.buttonText}>Forsæt som gæst</Text>
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
  
  );
}
