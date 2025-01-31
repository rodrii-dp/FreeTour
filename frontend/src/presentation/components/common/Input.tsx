import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {globalStyles} from '../../../config/theme/theme.ts';
import {Text} from 'react-native-paper';

interface Props extends TextInputProps {
  label?: string;
  rightLabel?: string;
  value: string;
  onChangeText: (text: string) => void;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  onPressRightLabel?: () => void;
  style?: StyleProp<TextStyle>;
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
  style,
  ...props
}: Props) => {
  return (
    <View style={globalStyles.inputContainer}>
      {label && (
        <View style={styles.labelContainer}>
          <Text variant="bodyLarge" style={globalStyles.label}>
            {label}
          </Text>
          {rightLabel && (
            <Pressable onPress={onPressRightLabel}>
              <Text
                variant="bodyLarge"
                style={{
                  color: '#FF5A5F',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {rightLabel}
              </Text>
            </Pressable>
          )}
        </View>
      )}
      <TextInput
        style={[globalStyles.input, isFocused && styles.inputFocused, style]}
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
        <View style={globalStyles.eyeIcon}>
          <Pressable onPress={togglePasswordVisibility}>
            <GenericIcon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              color="#818181"
            />
          </Pressable>
        </View>
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
