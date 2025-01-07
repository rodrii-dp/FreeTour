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
  rightLabel?: string;
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  onPressRightLabel?: () => void;
}

export const Input = ({
  label,
  rightLabel,
  onPressRightLabel,
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
      <View style={styles.labelContainer}>
        <Text style={globalStyles.label}>{label}</Text>
        {rightLabel && (
          <Pressable onPress={onPressRightLabel}>
            <Text style={globalStyles.link}>{rightLabel}</Text>
          </Pressable>
        )}
      </View>
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});
