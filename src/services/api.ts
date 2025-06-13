import { faker } from '@faker-js/faker';
import { Product, User, PaginatedResponse } from '../types';

const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    createdAt: faker.date.past().toISOString(),
    userId: faker.string.uuid(),
  }));
};

const allProducts = generateProducts(10000);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Product>> => {
    await delay(500); // Simulate network delay
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = allProducts.slice(start, end);
    
    return {
      data: products,
      total: allProducts.length,
      page,
      limit,
      hasMore: end < allProducts.length,
    };
  },

  // Auth
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(1000);
    
    if (email === 'test@example.com' && password === 'password') {
      return {
        user: {
          id: faker.string.uuid(),
          email,
          name: faker.person.fullName(),
        },
        token: faker.string.uuid(),
      };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    await delay(1000);
    
    return {
      user: {
        id: faker.string.uuid(),
        email,
        name,
      },
      token: faker.string.uuid(),
    };
  },

  resetPassword: async (email: string): Promise<{ otp: string }> => {
    await delay(1000);
    return { otp: faker.string.numeric(6) };
  },

  // User
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    await delay(1000);
    return {
      id: userId,
      email: data.email || faker.internet.email(),
      name: data.name || faker.person.fullName(),
      photo: data.photo,
    };
  },
}; 