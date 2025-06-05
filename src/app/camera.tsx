import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useImagePicker } from '../hooks/useImagePicker';
import { Input } from '../components/Input';
import { theme } from '../utils/theme';
import { supabase } from '../services/supabase';

export default function CameraScreen() {
  const { image, loading, takePhoto, pickImage } = useImagePicker();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      if (!image) {
        setError('Please take or select a photo');
        return;
      }

      if (!name || !description || !price || !category) {
        setError('Please fill in all fields');
        return;
      }

      // Upload image to Supabase storage
      const imagePath = `products/${Date.now()}.jpg`;
      await supabase.storage.from('products').upload(imagePath, {
        uri: image,
        type: 'image/jpeg',
        name: 'product.jpg',
      });

      // Get the public URL
      const { data } = supabase.storage.from('products').getPublicUrl(imagePath);

      // In a real app, this would create a product in your database
      console.log('Product created:', {
        name,
        description,
        price: parseFloat(price),
        category,
        image: data.publicUrl,
      });

      router.back();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>No image selected</Text>
          </View>
        )}
      </View>

      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={takePhoto}
          loading={loading}
          style={styles.button}
        >
          Take Photo
        </Button>
        <Button
          mode="outlined"
          onPress={pickImage}
          loading={loading}
          style={styles.button}
        >
          Pick from Gallery
        </Button>
      </View>

      <Input
        label="Product Name"
        value={name}
        onChangeText={setName}
        error={error}
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        error={error}
      />

      <Input
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        error={error}
      />

      <Input
        label="Category"
        value={category}
        onChangeText={setCategory}
        error={error}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      >
        Add Product
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
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  submitButton: {
    marginTop: 16,
  },
}); 