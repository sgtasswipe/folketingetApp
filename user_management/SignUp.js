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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const handleSignUp = async () => {
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.log("Supabase error:", error.message);
      Alert.alert("Sign Up Error", error.message);
    } else {
      console.log("Supabase sign-up success:", data);
      Alert.alert(
        "Success",
        "Check your email to confirm your account before logging in."
      );
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
        <Text style={styles.title}>Sign Up</Text>
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
          <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
