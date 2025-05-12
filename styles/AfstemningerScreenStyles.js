import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 8,
    paddingTop: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 8,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
    marginHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8, // Space between icon and text input
  },
  searchInput: {
    flex: 1,
    height: 40, // Ensures proper height for the input
    fontSize: 16,
  },

monthHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 12,
  paddingHorizontal: 16,
},
monthText: {
  fontSize: 16,
  fontWeight: 'bold',
  marginRight: 10,
  color: '#555',
},
monthDivider: {
  flex: 1,
  height: 1,
  backgroundColor: '#ddd',
},})


