import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BirdQuest</Text>
      <Text style={styles.subtitle}>Discover, share, and connect with bird lovers around the world.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light pastel background
    padding: 20,
  },
  title: {
    fontSize: 40, // Large title size
    fontWeight: 'bold',
    color: '#34495e', // Dark pastel color for text
    marginBottom: 20, // Space between title and subtitle
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#87CEEB', // Light blue color for contrast
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default SplashScreen;