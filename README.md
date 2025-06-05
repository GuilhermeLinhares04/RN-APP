# RN-APP Documentation

## Project Overview
RN-APP is a React Native application built with Expo, featuring authentication, product management, and camera functionality. The app uses Supabase for backend services and follows a modern, component-based architecture.

## Project Structure

```
RN-APP/
├── src/                    # Source code directory
│   ├── app/               # Main application screens and navigation
│   │   ├── (auth)/       # Authentication related screens
│   │   ├── (tabs)/       # Tab-based navigation screens
│   │   ├── product/      # Product-related screens
│   │   ├── camera.tsx    # Camera functionality screen
│   │   └── _layout.tsx   # Root layout configuration
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx    # Custom button component
│   │   └── Input.tsx     # Custom input component
│   ├── services/         # Backend and data services
│   │   ├── supabase.ts   # Supabase client configuration
│   │   └── mockData.ts   # Mock data for development
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── assets/               # Static assets (images, icons)
├── android/             # Android specific configuration
└── .expo/               # Expo configuration files
```

## Key Features

### Authentication
- Located in `src/app/(auth)/`
- Handles user authentication flows
- Integrates with Supabase for authentication

### Product Management
- Located in `src/app/product/`
- Manages product-related functionality
- Includes product listing and details

### Camera Functionality
- Located in `src/app/camera.tsx`
- Implements camera features using expo-camera
- Handles image capture and processing

### Navigation
- Uses Expo Router for navigation
- Implements tab-based navigation in `src/app/(tabs)/`
- Root layout configuration in `src/app/_layout.tsx`

## Components

### Button Component (`src/components/Button.tsx`)
- Custom button implementation
- Supports various styles and states
- Handles touch interactions

### Input Component (`src/components/Input.tsx`)
- Custom input field implementation
- Handles text input and validation
- Supports various input types

## Services

### Supabase Integration (`src/services/supabase.ts`)
- Supabase client configuration
- Database and authentication services
- API endpoints integration

### Mock Data (`src/services/mockData.ts`)
- Development mock data
- Used for testing and development
- Simulates backend responses

## Dependencies

Key dependencies include:
- expo: ~53.0.9
- expo-camera: ^16.1.6
- expo-image-picker: ^16.1.4
- expo-notifications: ^0.31.2
- expo-router: ^5.0.7
- @supabase/supabase-js: ^2.49.8
- react-native-paper: ^5.14.5

## Configuration

### App Configuration (`app.json`)
- App name: "RN-APP"
- Bundle identifiers:
  - iOS: "com.yourcompany.rnapp"
  - Android: "com.yourcompany.rnapp"
- Features enabled:
  - Camera permissions
  - Image picker permissions
  - Push notifications
  - Edge-to-edge support on Android

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platforms:
```bash
npm run android
npm run ios
npm run web
```

## Notes
- The app uses TypeScript for type safety
- Implements modern React Native patterns and best practices
- Uses Expo's managed workflow for easier development
- Push notifications require a development build (not supported in Expo Go with SDK 53)

## Features

- **Authentication**
  - Login
  - Registration
  - Password Recovery
  - Secure Token Management

- **Product Management**
  - Product Listing
  - Product Details
  - Add New Products
  - Camera Integration for Product Photos

- **User Profile**
  - View and Edit Profile
  - Change Password
  - Logout

- **Notifications**
  - Real-time Notifications
  - Notification History
  - Mark as Read Functionality

## Tech Stack

- React Native
- Expo
- React Native Paper (Material Design)
- React Navigation
- AsyncStorage
- React Native Camera
- React Native Notifications

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   ├── products.tsx
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   ├── product/
│   │   └── [id].tsx
│   ├── camera.tsx
│   └── _layout.tsx
├── components/
│   ├── ProductCard.tsx
│   └── NotificationCard.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useNotifications.ts
├── services/
│   ├── api.ts
│   └── mockData.ts
└── utils/
    ├── theme.ts
    └── storage.ts
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on iOS:
   ```bash
   npm run ios
   ```

4. Run on Android:
   ```bash
   npm run android
   ```

## Environment Setup

1. Create a `.env` file in the root directory
2. Add the following environment variables:
   ```
   API_URL=your_api_url
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 

