import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { generateMockProducts } from '../../services/mockData';
import { Product } from '../../types';
import { theme } from '../../utils/theme';

const ITEMS_PER_PAGE = 20;

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const newProducts = generateMockProducts(ITEMS_PER_PAGE);
      setProducts(prev => [...prev, ...newProducts]);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setProducts([]);
    setPage(1);
    await loadProducts(1);
    setRefreshing(false);
  }, [loadProducts]);

  const onEndReached = useCallback(() => {
    if (!loading) {
      loadProducts(page + 1);
    }
  }, [loading, page, loadProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <Card
      style={styles.card}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Card.Cover source={{ uri: item.image }} />
      <Card.Title
        title={item.name}
        subtitle={`$${item.price.toFixed(2)}`}
      />
    </Card>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
}); 