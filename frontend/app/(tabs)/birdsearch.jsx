import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const WikipediaSearchURL = 'https://en.wikipedia.org/w/api.php';

const BirdSearch = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBirds = async () => {
    if (!query) return;

    setLoading(true);
    setData([]);
    setError('');

    try {
      const response = await fetch(`${WikipediaSearchURL}?action=query&format=json&prop=pageimages|extracts&titles=${encodeURIComponent(query)}&exintro&explaintext&formatversion=2&pithumbsize=500`);
      const data = await response.json();

      const pages = data.query.pages;
      const formattedData = pages.map(page => ({
        image: page.thumbnail ? page.thumbnail.source : null,
        description: page.extract || 'No description available',
      }));

      setData(formattedData);
    } catch (err) {
      setError('Error fetching data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Bird</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter bird name"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchBirds}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#87CEEB" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          contentContainerStyle={styles.imagesContainer}
        />
      ) : (
        !loading && <Text style={styles.noImagesText}></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff', // Light pastel background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495e', // Dark pastel color for the title
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fdfdfd', // Light background for the input field
  },
  searchButton: {
    backgroundColor: '#87CEEB', // Light sky blue button
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  imagesContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300, // Larger images for better visibility
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#34495e', // Consistent text color
  },
  noImagesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#34495e',
  },
});

export default BirdSearch;