import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleRegister = async () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const success = await register(name, email, password);
    if (!success) {
      Alert.alert('Error', 'Registration failed. Please try again');
    } else {
      Alert.alert('Success', 'Registration successful. You can now log in.');
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create a new account.</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={handleBackToLogin} style={styles.backButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff', 
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495e', 
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    marginLeft: 15,
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    marginLeft: 15,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '90%',
    padding: 12,
    backgroundColor: '#fdfdfd',
  },
  button: {
    backgroundColor: '#87CEEB', 
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    alignSelf: 'center',
    width: '60%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#F4A261', 
  },
});