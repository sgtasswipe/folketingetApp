import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles/VotingCardStyles";
import { formatDate } from "./utilities/dateFormatter";

const VotingCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('VoteInformation', { item })}
      style={[
        styles.card,
        { borderLeftColor: item.vedtaget ? "#4CAF50" : "#F44336" },
      ]}
    >
      <View
        style={[
          styles.cardHeader,
          { flexDirection: "column", alignItems: "flex-start" },
        ]}
      >
        <Text style={styles.cardTitle}>{item.Sagstrin.Sag.titel}</Text>
      </View>

      <Text style={styles.dateText}>Opdateringsdato: {formatDate(item.opdateringsdato)}</Text>

      <Text
        style={[
          styles.statusBadge,
          { backgroundColor: item.vedtaget ? "#E8F5E9" : "#FFEBEE" },
        ]}
      >
        {item.vedtaget ? "Vedtaget" : "Ikke vedtaget"}
      </Text>
    </TouchableOpacity>
  );
};

export default VotingCard;
