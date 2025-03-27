import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function Login2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme(); // Detect system dark mode

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => console.log('Logged in with:', userCredentials.user.email))
            .catch((error) => console.log('Error:', error.message));
    }

    function handleSignUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => console.log('Signed up with:', userCredentials.user.email))
            .catch((error) => console.log('Error:', error.message));
    }

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
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

const styles = StyleSheet.create({
    container: {
        paddingTop: 300,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    inputStyle: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    buttonStyle: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
