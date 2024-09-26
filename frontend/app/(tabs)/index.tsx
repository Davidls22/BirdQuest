import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import PostsList from '@/components/PostList';

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handlePostSubmit = useCallback(() => {
    // Toggle refresh to trigger re-fetch in PostsList
    setRefresh(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Posts</Text>
          </View>
        )}
        data={[{ id: 'postsList' }]} 
        keyExtractor={(item) => item.id}
        renderItem={() => <PostsList refresh={refresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light pastel background color
  },
  section: {
    padding: 15,
    backgroundColor: '#fff', // Clean white background for the section
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Subtle border to separate sections
    borderRadius: 10, // Rounded corners to match the style
    marginHorizontal: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e', // Dark pastel text color for consistency
    textAlign: 'center',
  },
});

export default Home;