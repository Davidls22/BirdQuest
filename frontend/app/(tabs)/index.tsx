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
        data={[{ id: 'postsList' }]} // Dummy data to render PostsList as the only item
        keyExtractor={(item) => item.id}
        renderItem={() => <PostsList refresh={refresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
