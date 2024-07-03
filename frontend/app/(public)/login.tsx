import React, { useState } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { router } from 'expo-router';

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[style, { backgroundColor: '#007bff', borderRadius: 5, padding: 10 }]}
  >
    <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Log in</Text>
        <Text style={{ marginBottom: 10 }}>Enter your email and password to log in.</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
        />
      </View>
      <Button title="Log in" onPress={handleLogin} />
      <Button title="Register" onPress={navigateToRegister} style={{ marginTop: 10, backgroundColor: '#28a745' }} />
    </SafeAreaView>
  );
}
