import React, { useState, useEffect, use } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity 
} from 'react-native';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { styles } from "./styles/AfstemningerScreenStyles";


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
        `https://oda.ft.dk/api/Afstemning?$inlinecount=allpages&$orderby=opdateringsdato desc&$skip=${page * pageSize}&$top=${pageSize}`
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd. MMMM yyyy', { locale: da });
  };

  
  const renderVotingCard = ({ item }) => {
    return (
      <TouchableOpacity 
      onPress={() => setSelected(item.id === selected ? null : item.id)}
        style={[
          styles.card,
          { borderLeftColor: item.vedtaget ? '#4CAF50' : '#F44336' }
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Afstemning #{item.nummer}</Text> 
          <Text style={[
            styles.statusBadge, 
            { backgroundColor: item.vedtaget ? '#E8F5E9' : '#FFEBEE' }
          ]}>
            {item.vedtaget ? 'Vedtaget' : 'Ikke vedtaget'}
          </Text>
        </View>
      
        <Text style={styles.dateText}>
          {formatDate(item.opdateringsdato)}
        </Text>

        {selected ==item.id ? ( 
            <Text>{item.konklusion}</Text>
        ) :  (
        selected==item.id, item.konklusion &&    (
        
          <Text style={styles.conclusionText} numberOfLines={3}>
            {item.konklusion.replace(/\\n/g, '\n')}
          </Text>
        )
        )}

        
        <View style={styles.cardFooter}>
          <Text style={styles.meetingText}>Møde ID: {item.mødeid}</Text>
          <Text style={styles.typeText}>Type: {item.typeid}</Text>
        </View>
      </TouchableOpacity>
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