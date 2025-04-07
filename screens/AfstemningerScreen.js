import React, { useState, useEffect, use } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
} from 'react-native';
import { styles } from "../styles/AfstemningerScreenStyles";
import VotingCard from '../VotingCard';  


const AfstemningerScreen = () => {
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const [selected, setSelected]  = useState(null)

  const fetchVotingData = async () => {
    try {
      // Using $skip and $top for pagination
      const response = await fetch(
        `https://oda.ft.dk/api/Afstemning?$inlinecount=allpages&$orderby=opdateringsdato desc&$skip=${page * pageSize}&$top=${pageSize}&$expand=Sagstrin,Sagstrin/Sag`
      );
      const data = await response.json();
      
      // Check if we've reached the end
      if (data.value.length === 0) {
        setHasMore(false);
        return;
      }

      // Append new data to existing data
      setVotingData(prevData => 
        page === 0 ? data.value : [...prevData, ...data.value]
      );
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching voting data:', error);
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchVotingData();
  }, [page]);  // dependency array. react will re-run this useEffect ( fetching vote data again) whenever page's state is updated. 

  const loadMoreData = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
      setLoading(true);
    }
  };

 
  
  const renderVotingCard = ({ item }) => {
    return <VotingCard item={item} selected={selected} setSelected={setSelected} />;
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

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Afstemninger</Text>
      
      {votingData.length > 0 ? (
        <FlatList
          data={votingData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderVotingCard}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContainer}
        />
      ) : loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Indlæser afstemninger...</Text>
        </View>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.noDataText}>Ingen afstemninger fundet</Text>
        </View>
      )}
    </View>
  );
};

export default AfstemningerScreen;