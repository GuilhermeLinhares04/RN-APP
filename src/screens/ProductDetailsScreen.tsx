import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Share } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../types';

type RootStackParamList = {
  ProductDetails: { product: Product };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route }: Props) {
  const { product } = route.params;
  const [favorite, setFavorite] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product.name} - $${product.price.toFixed(2)}\n${product.description}`,
        url: product.image,
      });
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: product.image }} style={styles.image} />
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.title}>
              {product.name}
            </Text>
            <IconButton
              icon={favorite ? 'heart' : 'heart-outline'}
              size={24}
              onPress={() => setFavorite(!favorite)}
              iconColor={favorite ? '#ff4081' : '#666'}
            />
          </View>

          <Text variant="titleLarge" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>

          <Text variant="bodyLarge" style={styles.description}>
            {product.description}
          </Text>

          <View style={styles.actions}>
            <Button
              mode="contained"
              onPress={handleShare}
              icon="share"
              style={styles.shareButton}
            >
              Share
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    height: 300,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  price: {
    marginTop: 8,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 16,
    lineHeight: 24,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareButton: {
    flex: 1,
  },
}); 