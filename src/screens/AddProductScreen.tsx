import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../components/Input';
import { useNavigation } from '@react-navigation/native';

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !image) {
      alert('Please fill in all fields and add an image');
      return;
    }

    try {
      setLoading(true);
      // Here you would typically upload the image and create the product
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
            icon="camera"
            style={styles.button}
          >
            Take Photo
          </Button>
          <Button
            mode="outlined"
            onPress={pickImage}
            icon="image"
            style={styles.button}
          >
            Pick Image
          </Button>
        </View>

        <Input
          label="Product Name"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Input
          label="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
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
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
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