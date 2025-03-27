import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig';
import {useAuth} from './AuthContext';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  /*  const {setUserID} = useAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserID(user.uid);
                navigation.navigate('NextScreen');
            }
        });
        return unsubscribe;
    }, [navigation, setUserID]);
*/
    function validateInputs() {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return false;
        }
        return true;
    }

    async function handleLogin() {
        if (!validateInputs()) return;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('NextScreen');
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSignUp() {
        if (!validateInputs()) return;
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('NextScreen');
        } catch (error) {
            Alert.alert('Sign Up Failed', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <>
                    <Pressable style={styles.buttons} onPress={handleSignUp} accessibilityLabel="Sign Up Button">
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                    <Pressable style={styles.buttons} onPress={handleLogin} accessibilityLabel="Login Button">
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    input: {
        width: '80%', // Adjusted for better responsiveness
        padding: 12, // Slightly increased padding for better usability
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8, // Increased border radius for a modern look
    },
    buttons: {
        backgroundColor: '#007BFF',
        paddingVertical: 12, // Increased padding for better touch targets
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8, // Increased border radius for consistency
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16, // Increased font size for better readability
    },
});