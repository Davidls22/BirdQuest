import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface Post {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  user: {
    name: string;
  };
}

interface PostsListProps {
  refresh: boolean; // Trigger a refetch when this changes
}

const PostsList = ({ refresh }: PostsListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Sort posts with the newest at the top
        const sortedPosts = data.sort((a: Post, b: Post) => (b._id > a._id ? 1 : -1));
        setPosts(sortedPosts);
      } catch (error) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refresh]); // Refetch posts when refresh changes

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
          {item.image ? (
            <Image source={{ uri: `http://localhost:8080/${item.image}` }} style={styles.postImage} />
          ) : null}
          <Text>{item.description}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Posted by: {item.user.name}</Text>
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

export default PostsList;
