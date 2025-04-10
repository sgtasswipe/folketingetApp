import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import { styles } from "../styles/AfstemningerScreenStyles";
import VotingCard from "../VotingCard";

const AfstemningerScreen = () => {
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const [selected, setSelected] = useState(null);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  const fetchVotingData = async (searchQuery = "") => {
    try {
      const baseUrl = `https://oda.ft.dk/api/Afstemning?$inlinecount=allpages&$orderby=opdateringsdato desc&$skip=${
        page * pageSize
      }&$top=${pageSize}&$expand=Sagstrin,Sagstrin/Sag`;

      const filterQuery = searchQuery
        ? `&$filter=substringof('${encodeURIComponent(
            searchQuery
          )}', Sagstrin/Sag/titel)`
        : "";

      const fullUrl = `${baseUrl}${filterQuery}`;

      const response = await fetch(fullUrl);
      const data = await response.json();

      // Check if we've reached the end
      if (data.value.length === 0) {
        setHasMore(false);
        return;
      }

      // Append new data to existing data
      setVotingData((prevData) =>
        page === 0 ? data.value : [...prevData, ...data.value]
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching voting data:", error);
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchVotingData(searchQuery);
  }, [page]); // dependency array. react will re-run this useEffect ( fetching vote data again) whenever page's state is updated.

  const loadMoreData = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const renderVotingCard = ({ item }) => {
    return (
      <VotingCard item={item} selected={selected} setSelected={setSelected} />
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Indlæser flere afstemninger...</Text>
      </View>
    );
  };

  const handleSearchButtonClick = () => {
    setPage(0);
    setVotingData([]);
    setHasMore(true);
    setLoading(true);
    fetchVotingData(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Søg i afstemninger..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearchButtonClick} />
      <Text style={styles.screenTitle}>Afstemninger</Text>

      {votingData.length > 0 ? (
        <FlatList
          data={votingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVotingCard}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.noDataText}>Ingen afstemninger fundet</Text>
        </View>
      )}
    </View>
  );
};

export default AfstemningerScreen;
