import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Folketinget App!</Text>

      <Text style={styles.description}>
        Formålet med denne app er at kunne se klare data om, hvad politikerne rent faktisk stemmer på.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Afstemninger')}>
        <Text style={styles.buttonText}>Gå på opdagelse i afstemninger</Text>
        <Text style={styles.infoText}>
          Folketinget har siden 2014 gemt alle afstemninger, forslag, og meget mere.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // White background
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#a6192e', // Pale red (matches your app theme)
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Darker text for readability
  },
  button: {
    backgroundColor: '#a6192e', // Pale red
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;
