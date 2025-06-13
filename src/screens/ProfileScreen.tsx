import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, Button, Avatar, Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState(user?.photo);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      // Here you would typically update the user profile
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={photo ? { uri: photo } : require('../../assets/icon.png')}
          />
          <Button
            mode="outlined"
            onPress={pickImage}
            style={styles.changePhotoButton}
          >
            Change Photo
          </Button>
        </View>

        <Divider style={styles.divider} />

        <Input
          label="Name"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button
          mode="contained"
          onPress={handleUpdateProfile}
          loading={loading}
          style={styles.updateButton}
        >
          Update Profile
        </Button>

        <Button
          mode="outlined"
          onPress={logout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  changePhotoButton: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 24,
  },
  updateButton: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
}); 