import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import { useImagePicker } from '../../hooks/useImagePicker';
import { Input } from '../../components/Input';
import { theme } from '../../utils/theme';
import { supabase } from '../../services/supabase';
import { generateMockUser } from '../../services/mockData';
import { User } from '../../types';

export default function ProfileScreen() {
  const { image, loading, pickImage } = useImagePicker();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // In a real app, this would fetch the user from your backend
      const mockUser = generateMockUser();
      setUser(mockUser);
      setName(mockUser.name);
      setEmail(mockUser.email);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (!name || !email) {
        setError('Please fill in all fields');
        return;
      }

      // In a real app, this would update the user in your backend
      console.log('Profile updated:', { name, email });
      
      if (image) {
        // Upload new avatar
        const imagePath = `avatars/${Date.now()}.jpg`;
        await supabase.storage.from('avatars').upload(imagePath, {
          uri: image,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });

        const { data } = supabase.storage.from('avatars').getPublicUrl(imagePath);
        console.log('Avatar uploaded:', data.publicUrl);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Avatar.Image
            size={120}
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
        )}
        <Button
          mode="outlined"
          onPress={pickImage}
          loading={loading}
          style={styles.avatarButton}
        >
          Change Photo
        </Button>
      </View>

      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        error={error}
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
      />

      <Button
        mode="contained"
        onPress={handleUpdateProfile}
        loading={loading}
        style={styles.button}
      >
        Update Profile
      </Button>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  avatarButton: {
    marginTop: 8,
  },
  button: {
    marginTop: 16,
  },
}); 