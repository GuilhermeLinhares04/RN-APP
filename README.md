<<<<<<< Updated upstream
# RN-APP
=======
# React Native Mobile App

A comprehensive mobile application built with React Native, featuring a modern UI design and various functionalities including authentication, product management, camera integration, and notifications.

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
>>>>>>> Stashed changes
