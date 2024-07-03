import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthProvider';

const ProfileList = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data.posts)) {
          setPosts(data.posts.reverse()); // Ensure posts are ordered with new ones at the top
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError(`Error fetching profile data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, refresh]); // Refetch posts when refresh changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (posts.length === 0) {
    return <Text>No posts available</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          {item.image ? (
            <Image source={{ uri: `http://localhost:8080/${item.image}` }} style={styles.postImage} />
          ) : null}
          <Text>{item.description}</Text>
          <Text>Location: {item.location}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});

export default ProfileList;
