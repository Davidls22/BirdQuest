import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/AuthProvider';

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[style, { backgroundColor: '#007bff', borderRadius: 5, padding: 10, marginBottom: 10 }]}
  >
    <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
  </TouchableOpacity>
);

export default function PostScreen({ onPostSubmit }: { onPostSubmit: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', {
        uri: image,
        name: filename ?? 'image.jpg',
        type: type,
      } as any);
    }

    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Post created successfully');
        setTitle('');
        setDescription('');
        setLocation('');
        setImage(null);
        onPostSubmit(); // Notify parent to refresh posts
      } else {
        const data = await response.json();
        Alert.alert('Error', data.msg || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not create post');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Create a Post</Text>
        <Text style={{ marginBottom: 10 }}>Fill out the details below to create a new post.</Text>
      </View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
      />
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});


