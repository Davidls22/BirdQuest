import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useAuth } from '@/context/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'FredokaOne': require('@/assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        BirdQuest
      </Text>
      <View style={styles.userSection}>
        <Text style={styles.userName}>
          {user?.name}
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={12} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'FredokaOne',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
  },
});

export default Header;
