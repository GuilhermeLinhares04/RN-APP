import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { generateMockNotifications } from '../../services/mockData';
import { Notification } from '../../types';
import { theme } from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch notifications from your backend
      const mockNotifications = generateMockNotifications(10);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const updatedNotifications = notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      );
      setNotifications(updatedNotifications);

      // In a real app, this would update the notification status in your backend
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <Card
      style={[
        styles.card,
        !item.read && { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <Card.Title
        title={item.title}
        subtitle={new Date(item.createdAt).toLocaleDateString()}
        right={(props) => (
          <IconButton
            {...props}
            icon={item.read ? 'check' : 'circle-outline'}
            onPress={() => markAsRead(item.id)}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium">{item.body}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
}); 