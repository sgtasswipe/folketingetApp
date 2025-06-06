import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/LoginStyles";

// 🔥 Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilities/firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const handleSignUp = async () => {
    if (password.length < 6) {
      Alert.alert("Fejl", "Adgangskoden skal være mindst 6 tegn.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Bruger oprettet", "Du er nu registreret og logget ind.");
    } catch (error) {
      console.log("Firebase fejl:", error.message);
      Alert.alert("Fejl ved oprettelse", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "black" : "white" },
        ]}
      >
        <Text style={styles.title}>Opret bruger</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputStyle}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Adgangskode"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputStyle}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Opret bruger</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
