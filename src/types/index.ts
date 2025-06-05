export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export interface NotificationState {
  items: Notification[];
  unreadCount: number;
}

export interface RootState {
  auth: AuthState;
  products: ProductState;
  notifications: NotificationState;
} 