import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Text, Card, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import { Product } from '../types';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async (pageNum: number, shouldRefresh = false) => {
    try {
      setLoading(true);
      const response = await api.getProducts(pageNum);
      
      if (shouldRefresh) {
        setProducts(response.data);
      } else {
        setProducts(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadProducts(1, true);
  }, []);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(page + 1);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadProducts(1);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Card.Cover source={{ uri: item.image }} style={styles.image} />
      <Card.Content>
        <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text variant="titleLarge" style={styles.price}>
          ${item.price.toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !refreshing ? (
            <ActivityIndicator style={styles.loader} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    height: 200,
  },
  title: {
    marginTop: 8,
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
  price: {
    marginTop: 8,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 16,
  },
}); 