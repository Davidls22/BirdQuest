import React, { useState } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { router } from 'expo-router';

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    const success = await login(email, password);
    if (!success) {
      Alert.alert('Error', 'Login failed. Please check your credentials');
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>Enter your email and password to log in.</Text>
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
      <Button title="Log in" onPress={handleLogin} />
      <Button title="Register" onPress={navigateToRegister} style={styles.registerButton} />
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
  registerButton: {
    backgroundColor: '#F4A261', 
  },
});