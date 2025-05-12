import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles/VotingCardStyles";
import { formatDate } from "./utilities/dateFormatter";

function weeksplitter({item}) {
 
}
function monthSplitter({item}) {
  date = item.opdateringsdato
  let monthNumber = date.slice(5,7)
  console.log(monthNumber)
  
}
const VotingCard = ({ item, selected, setSelected }) => {
  monthSplitter({item})
  return (
    
    <TouchableOpacity
      onPress={() => setSelected(item.id === selected ? null : item.id)}
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

      <Text style={styles.dateText}>{formatDate(item.opdateringsdato)}</Text>

      <Text
        style={[
          styles.statusBadge,
          { backgroundColor: item.vedtaget ? "#E8F5E9" : "#FFEBEE" },
        ]}
      >
        {item.vedtaget ? "Vedtaget" : "Ikke vedtaget"}
      </Text>

      {selected === item.id && (
        <>
          <Text>{item.konklusion}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.meetingText}>Møde ID: {item.mødeid}</Text>
            <Text style={styles.typeText}>Type: {item.typeid}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default VotingCard;
