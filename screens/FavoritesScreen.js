import { getAllFavorites } from "../utilities/fireStoreFunctions";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { formatDate } from "../utilities/dateFormatter"; // Reuse this
import {styles} from "../styles/FavoritesScreenStyle"

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchFavorites = async () => {
      const favData = await getAllFavorites();
      setFavorites(favData);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.dateText}>
        Opdateringsdato: {formatDate(item.opdateringsdato)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mine Favoritter</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#a6192e" />
      ) : favorites.length === 0 ? (
        <Text style={styles.empty}>Du har ingen gemte favoritter endnu.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
