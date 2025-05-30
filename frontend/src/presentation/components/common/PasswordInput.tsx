import React from 'react';
import {globalStyles} from '../../../config/theme/theme.ts';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {GenericIcon} from '../../icons/GenericIcon.tsx';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  keyboardType?: KeyboardTypeOptions;
}
export const PasswordInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  isFocused,
  onFocus,
  onBlur,
  showPassword,
  togglePasswordVisibility,
  keyboardType,
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
        keyboardType={keyboardType}
      />
      <Pressable
        style={globalStyles.eyeIcon}
        onPress={togglePasswordVisibility}>
        <GenericIcon
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          color="#818181"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFocused: {
    borderColor: 'black',
  },
});
