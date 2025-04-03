import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("https://oda.ft.dk/api/Afstemning?$inlinecount=allpages");
        const data = await response.json();
        console.log(data)
        setProposals(data); // Assuming the API returns an array
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, item.vedtaget ? styles.passed : styles.failed]}>
            <Text style={styles.title}>Proposal {item.nummer}</Text>
            <Text style={styles.status}>{item.vedtaget ? '✅ Vedtaget' : '❌ Ikke Vedtaget'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  passed: { backgroundColor: '#d4edda' }, // Light green for passed
  failed: { backgroundColor: '#f8d7da' }, // Light red for failed
  title: { fontSize: 18, fontWeight: 'bold' },
  status: { fontSize: 16 },
});

export default HomeScreen;
