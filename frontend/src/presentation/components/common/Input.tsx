import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import {GenericIcon} from '../../icons/Icon.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';

interface Props extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

export const Input = ({
  label,
  value,
  onChangeText,
  isFocused,
  onFocus,
  onBlur,
  placeholder,
  keyboardType = 'default',
  isPassword = false,
  showPassword = false,
  togglePasswordVisibility,
  ...props
}: Props) => {
  return (
    <View style={globalStyles.inputContainer}>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput
        style={[globalStyles.input, isFocused && styles.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
        {...props}
      />
      {isPassword && togglePasswordVisibility && (
        <Pressable
          style={globalStyles.eyeIcon}
          onPress={togglePasswordVisibility}>
          <GenericIcon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            color="#818181"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputFocused: {
    borderColor: 'black',
  },
});
