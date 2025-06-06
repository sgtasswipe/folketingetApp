import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/AfstemningerScreenStyles";
import VotingCard from "../components/VotingCard";
import { saveFavorite } from "../utilities/fireStoreFunctions";

const AfstemningerScreen = () => {
  const [votingData, setVotingData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true); // For initial load
  const [loadingMore, setLoadingMore] = useState(false); // For loading more data
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const [selected, setSelected] = useState(null);
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to group items by month
  const groupByMonth = (items) => {
    // Create a temporary array to hold all items with their month group
    let processedItems = [];

    // Track which months we've already processed
    const processedMonths = new Set();

    // Process each item
    items.forEach((item) => {
      if (!item.opdateringsdato) return; //if an item doesnt have a date, return

      // Extract month and year from the date
      const date = new Date(item.opdateringsdato);
      const monthYear = date.toLocaleString("da-DK", {
        month: "long",
        year: "numeric",
      });

      // If this is the first item for this month, add a month header
      if (!processedMonths.has(monthYear)) {
        processedMonths.add(monthYear);
        processedItems.push({
          id: `month-${monthYear}`,
          isMonthHeader: true,
          monthName: monthYear,
        });
      }

      // Add the actual item
      processedItems.push(item);
    });

    return processedItems;
  };

  const fetchVotingData = async (searchQuery = "", isLoadingMore = false) => {
    try {
      const baseUrl = `https://oda.ft.dk/api/Afstemning?$inlinecount=allpages&$orderby=opdateringsdato desc&$skip=${
        page * pageSize
      }&$top=${pageSize}&$expand=Sagstrin,Sagstrin/Sag`;

      // Always include the typeid filter
      let filterQuery = `&$filter=(typeid eq 1 or typeid eq 3)`;

      // If searchQuery is provided, add it to the existing filter
      if (searchQuery) {
        const encodedSearch = encodeURIComponent(searchQuery);
        filterQuery += ` and substringof('${encodedSearch}', Sagstrin/Sag/titel)`;
      }
      const fullUrl = `${baseUrl}${filterQuery}`;
      const response = await fetch(fullUrl);
      const data = await response.json();
      
      // Check if we've reached the end
      if (data.value.length === 0) {
        setHasMore(false);
        if (isLoadingMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
        return;
      }

      // Get new data
      const newData = page === 0 ? data.value : [...votingData, ...data.value];

      // Update raw voting data
      setVotingData(newData);

      // Create grouped data with month headers
      const grouped = groupByMonth(newData);
      setGroupedData(grouped);

      // Set appropriate loading state to false
      if (isLoadingMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching voting data:", error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchVotingData(searchQuery, page > 0); // Pass true if this is loading more data
  }, [page]); // dependency array. react will re-run this useEffect ( fetching vote data again) whenever page's state is updated.

  const loadMoreData = () => {
    if (!loading && !loadingMore && hasMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderItem = ({ item }) => {
    // If this is a month header, render the month divider
    if (item.isMonthHeader) {
      return (
        <View style={styles.monthHeader}>
          <Text style={styles.monthText}>{item.monthName}</Text>
          <View style={styles.monthDivider} />
        </View>
      );
    }

    // Otherwise render a normal voting card
    return (
      <VotingCard item={item} selected={selected} setSelected={setSelected} />
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
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
    setGroupedData([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    fetchVotingData(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(0);
    setVotingData([]);
    setGroupedData([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    fetchVotingData("");
  };

  //todo move search-helper functions to seperate component
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Søg i afstemninger..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          returnKeyType="search"
          onSubmitEditing={() => {
            handleSearchButtonClick();
            Keyboard.dismiss();
          }}
        />
        {searchQuery.length > 0 && (
          <Icon
            name="close-circle"
            size={20}
            color="#cc0000"
            onPress={handleClearSearch}
          />
        )}
      </View>
      <Text style={styles.screenTitle}>Afstemninger</Text>
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Indlæser afstemninger...</Text>
        </View>
      ) : groupedData.length > 0 ? (
        <FlatList
          data={groupedData}
          keyExtractor={(item) =>
            item.isMonthHeader ? item.id : item.id.toString()
          }
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