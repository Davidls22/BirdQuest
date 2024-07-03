import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Button = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[style, { backgroundColor: '#007bff', borderRadius: 5, padding: 10, marginBottom: 10 }]}
  >
    <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }} >
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Register</Text>
        <Text style={{ marginBottom: 10 }}>Create a new account.</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
        />
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
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={handleBackToLogin} />
    </SafeAreaView>
  );
}
