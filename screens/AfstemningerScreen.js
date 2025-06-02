import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/AfstemningerScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";
import VotingCard from "../components/VotingCard";
import SearchBar from "../components/SearchBar"; // 

const AfstemningerScreen = () => {
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
    fetchVotingData(searchQuery, page > 0);
  }, [page]);


  const fetchVotingData = async (searchQuery = "", isLoadingMore = false) => {
    try {
      const baseUrl = `https://oda.ft.dk/api/Afstemning?$inlinecount=allpages&$orderby=opdateringsdato desc&$skip=${
        page * pageSize
      }&$top=${pageSize}&$expand=Sagstrin,Sagstrin/Sag`;

      let filterQuery = `&$filter=(typeid eq 1 or typeid eq 3)`;

      if (searchQuery) {
        const encodedSearch = encodeURIComponent(searchQuery);
        filterQuery += ` and substringof('${encodedSearch}', Sagstrin/Sag/titel)`;
      }

      const fullUrl = `${baseUrl}${filterQuery}`;
      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.value.length === 0) {
        setHasMore(false);
        isLoadingMore ? setLoadingMore(false) : setLoading(false);
        return;
      }

      const newData = page === 0 ? data.value : [...votingData, ...data.value];
      setVotingData(newData);

      isLoadingMore ? setLoadingMore(false) : setLoading(false);
    } catch (error) {
      console.error("Error fetching voting data:", error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

 
  const loadMoreData = () => {
    if (!loading && !loadingMore && hasMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    } 
  };

  const renderItem = ({ item }) => (
    <VotingCard item={item} selected={selected} setSelected={setSelected} />
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Indlæser flere afstemninger...</Text>
      </View>
    ) : null;

  const handleSearchButtonClick = () => {
    setPage(0);
    setVotingData([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    fetchVotingData(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(0);
    setVotingData([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    fetchVotingData("");
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchButtonClick}
        onClearSearch={handleClearSearch}
      />

      <Text style={styles.screenTitle}>Afstemninger</Text>

      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Indlæser afstemninger...</Text>
        </View>
      ) : votingData.length > 0 ? (
        <FlatList
          data={votingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
