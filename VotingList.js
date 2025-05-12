import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import VotingCard from "./VotingCard";

// Helper function to group items by month
const groupByMonth = (items) => {
  // Create a map to store items by month
  const grouped = {};
  
  items.forEach(item => {
    if (!item.opdateringsdato) return;
    
    // Extract month and year from the date
    const date = new Date(item.opdateringsdato);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(item);
  });
  
  // Convert to array sorted by date (newest first)
  return Object.entries(grouped)
    .sort(([monthA], [monthB]) => {
      // Extract dates from month strings and compare
      const dateA = new Date(monthA);
      const dateB = new Date(monthB);
      return dateB - dateA; // Newest first
    })
    .map(([month, items]) => ({
      month,
      items,
      id: month // Using month as id for FlatList
    }));
};

const VotingList = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const [groupedData, setGroupedData] = useState([]);
  
  useEffect(() => {
    if (data) {
      setGroupedData(groupByMonth(data));
    }
  }, [data]);
  
  const renderItem = ({ item }) => {
    // This is a month group
    return (
      <View>
        {/* Month header */}
        <View style={styles.monthHeader}>
          <Text style={styles.monthText}>{item.month}</Text>
          <View style={styles.monthDivider} />
        </View>
        
        {/* Render all voting cards for this month */}
        {item.items.map(votingItem => (
          <VotingCard 
            key={votingItem.id} 
            item={votingItem}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </View>
    );
  };
  
  return (
    <FlatList
      data={groupedData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#555',
  },
  monthDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  }
});

export default VotingList;