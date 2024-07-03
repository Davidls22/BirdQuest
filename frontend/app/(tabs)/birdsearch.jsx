import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

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
      // Fetch data from Wikipedia API
      const response = await fetch(`${WikipediaSearchURL}?action=query&format=json&prop=pageimages|extracts&titles=${encodeURIComponent(query)}&exintro&explaintext&formatversion=2&pithumbsize=500`);
      const data = await response.json();
      
      // Log the data to inspect the response
      console.log('API Response:', data);

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
      <Button title="Search" onPress={searchBirds} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
        !loading && <Text>No images found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  imagesContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300, // Increase height to show larger images
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default BirdSearch;
