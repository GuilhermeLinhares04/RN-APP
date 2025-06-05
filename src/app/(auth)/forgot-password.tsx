import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../utils/theme';
import { supabase } from '../../services/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'rn-app://reset-password',
      });

      if (error) throw error;

      setOtpSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      router.replace('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Reset Password
      </Text>

      {!otpSent ? (
        <>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
          />

          <Button
            mode="contained"
            onPress={handleSendOTP}
            loading={loading}
            style={styles.button}
          >
            Send OTP
          </Button>
        </>
      ) : (
        <>
          <Input
            label="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            error={error}
          />

          <Input
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            error={error}
          />

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.button}
          >
            Reset Password
          </Button>
        </>
      )}

      <Button
        mode="text"
        onPress={handleBackToLogin}
        style={styles.button}
      >
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    color: theme.colors.primary,
  },
  button: {
    marginTop: 16,
  },
}); 