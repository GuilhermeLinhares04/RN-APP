import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../utils/theme';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained';
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  children: React.ReactNode;
}

export const Button = ({
  mode = 'contained',
  onPress,
  style,
  labelStyle,
  loading = false,
  disabled = false,
  icon,
  children,
}: ButtonProps) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      labelStyle={[styles.label, labelStyle]}
      loading={loading}
      disabled={disabled}
      icon={icon}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.roundness,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'none',
  },
}); 