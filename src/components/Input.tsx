import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { theme } from '../utils/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export const Input = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  style,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  right,
  left,
}: InputProps) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        disabled={disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        right={right}
        left={left}
        mode="outlined"
        error={!!error}
        theme={theme}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
  },
}); 