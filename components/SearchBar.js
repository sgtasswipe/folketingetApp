import React from "react";
import { View, TextInput, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../styles/AfstemningerScreenStyles"; // or move search styles to a shared style if you prefer

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onClearSearch,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Søg i afstemninger..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        onSubmitEditing={() => {
          onSearchSubmit();
          Keyboard.dismiss();
        }}
      />
      {searchQuery.length > 0 && (
        <Icon
          name="close-circle"
          size={20}
          color="#cc0000"
          onPress={onClearSearch}
        />
      )}
    </View>
  );
};

export default SearchBar;
