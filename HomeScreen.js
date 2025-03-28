import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Home Screen! 🎉</Text>
            <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
                <Text style={styles.buttonText}>Count is: {count}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#ff4757",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
