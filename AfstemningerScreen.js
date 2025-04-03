import React, { useState, useEffect } from 'react';
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

const AfstemningerScreen = () => {
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

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
  }, [page]);

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
        
        {item.konklusion && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 8,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  conclusionText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  meetingText: {
    fontSize: 12,
    color: '#666',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
  },
});

export default AfstemningerScreen;