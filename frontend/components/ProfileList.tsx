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
          setPosts(data.posts.reverse());
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
  }, [user, refresh]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!posts.length) {
    return <Text>No posts available</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          {item.image && (
            <Image source={{ uri: `http://localhost:8080/${item.image}` }} style={styles.postImage} />
          )}
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
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default ProfileList;