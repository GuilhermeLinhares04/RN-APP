import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { generateMockProducts } from '../../services/mockData';
import { Product } from '../../types';
import { theme } from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
    checkFavoriteStatus();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      const products = generateMockProducts(1);
      setProduct(products[0]);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteIds = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteIds.includes(id));
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteIds = favorites ? JSON.parse(favorites) : [];
      
      if (isFavorite) {
        const newFavorites = favoriteIds.filter((favId: string) => favId !== id);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      } else {
        favoriteIds.push(id);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIds));
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading || !product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            {product.name}
          </Text>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            onPress={toggleFavorite}
            iconColor={isFavorite ? theme.colors.primary : theme.colors.onSurface}
          />
        </View>

        <Text variant="titleLarge" style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>

        <Text variant="bodyLarge" style={styles.description}>
          {product.description}
        </Text>

        <Text variant="bodyMedium" style={styles.category}>
          Category: {product.category}
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push('/camera')}
          style={styles.button}
        >
          Add Similar Product
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: theme.colors.primary,
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
    lineHeight: 24,
  },
  category: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
}); 