import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "./styles/VotingCardStyles"; 
import { formatDate } from './utilities/dateFormatter'; 

const VotingCard = ({ item, selected, setSelected }) => {

  return (
    <TouchableOpacity 
      onPress={() => setSelected(item.id === selected ? null : item.id)}
      style={[styles.card, { borderLeftColor: item.vedtaget ? '#4CAF50' : '#F44336' }]}
    >
      <View style={[styles.cardHeader, { flexDirection: 'column', alignItems: 'flex-start' }]}>
        <Text style={styles.cardTitle}>
          {item.Sagstrin.Sag.titel}
        </Text>
      </View>

      <Text style={styles.dateText}>
        {formatDate(item.opdateringsdato)}
      </Text>

      <Text style={[styles.statusBadge, { backgroundColor: item.vedtaget ? '#E8F5E9' : '#FFEBEE' }]}>
        {item.vedtaget ? 'Vedtaget' : 'Ikke vedtaget'}
      </Text>

      {selected === item.id && (
        <Text>{item.konklusion}</Text>
      )}

      {selected !== item.id && item.konklusion && (
        <Text style={styles.conclusionText} numberOfLines={3}>
          {item.konklusion.replace(/\\n/g, '\n')}
        </Text>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.meetingText}>Møde ID: {item.mødeid}</Text>
        <Text style={styles.typeText}>Type: {item.typeid}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VotingCard;