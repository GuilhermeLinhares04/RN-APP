import { faker } from '@faker-js/faker';
import { Product, User, Notification } from '../types';

export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    category: faker.commerce.department(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }));
};

export const generateMockUser = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

export const generateMockNotifications = (count: number): Notification[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    read: faker.datatype.boolean(),
    createdAt: faker.date.recent().toISOString(),
  }));
}; 