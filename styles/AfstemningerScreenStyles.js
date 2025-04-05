import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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