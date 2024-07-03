import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import PostScreen from '@/components/Post';
import ProfileList from '../../components/ProfileList';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      setPosts(data.reverse()); // New posts at the top
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, refresh]); // Fetch posts and handle refresh

  const handlePostSubmit = async (newPost) => {
    // Add new post to the top of the list without refetching all posts
    setPosts(prevPosts => [newPost, ...prevPosts]);
    // Trigger a refresh to update ProfileList
    setRefresh(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <PostScreen onPostSubmit={handlePostSubmit} />
        </View>
        <ProfileList refresh={refresh} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure content container grows to fill the available space
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Profile;
