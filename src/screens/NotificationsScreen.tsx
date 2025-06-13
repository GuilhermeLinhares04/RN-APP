import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, IconButton, Divider } from 'react-native-paper';
import { Notification } from '../types';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Product Added',
    message: 'A new product has been added to your favorites',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Price Drop',
    message: 'The price of your favorite product has dropped',
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Welcome!',
    message: 'Welcome to Product Reserve App',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card
      style={[
        styles.card,
        !item.read && styles.unreadCard,
      ]}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="titleMedium" style={styles.title}>
              {item.title}
            </Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => deleteNotification(item.id)}
          />
        </View>
        <Text variant="bodyMedium" style={styles.message}>
          {item.message}
        </Text>
        <Text variant="bodySmall" style={styles.time}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  unreadCard: {
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6200ee',
    marginLeft: 8,
  },
  message: {
    marginTop: 4,
    color: '#666',
  },
  time: {
    marginTop: 8,
    color: '#999',
  },
}); 