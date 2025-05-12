/*import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/LoginStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.log("Supabase login error:", error.message);
      Alert.alert("Login Error", error.message);
    } else {
      console.log("Logged in as:", data.user.email);
      console.log("Signed in user:", data?.user);

      Alert.alert("Success", "You are now logged in.");
      
    }
  };
const handleGuestLogin = async () => {
  setLoading(true);
  const { data, error } = await supabase.auth.signInAnonymously();
  setLoading(false);

  if (error) {
    console.log("Anon sign-in error:", error.message);
    Alert.alert("Sign in Anon Failed", error.message);
  } else {
    console.log("Anon sign-in success! User ID:", data.user?.id);
    console.log("Session from anon sign-in:", data.session); // <== Add this
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
        <Text style={styles.title}>Log ind</Text>
        <TextInput
          placeholder="Email"
          email
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
            <Pressable
              style={styles.buttonStyle}
              onPress={() => navigation.navigate("SignUp")}
            >
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
*/