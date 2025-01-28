import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import {globalStyles} from '../../../config/theme/theme.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {Message} from '../../components/common/Message.tsx';
import {Input} from '../../components/common/Input.tsx';
import {Checkbox} from '../../components/common/Checkbox.tsx';
import {Separator} from '../../components/common/Separator.tsx';
import {GenericIcon} from '../../icons/GenericIcon.tsx';
import {useFormValidation} from '../../hooks/useFormValidation.tsx';
import {useFocus} from '../../hooks/useFocus.tsx';
import {Button} from '../../components/common/Button.tsx';
import {HelperText, Text} from 'react-native-paper';

export const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {fields, error, handleInputChange, validateForm} = useFormValidation({
    email: '',
    password: '',
  });

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {focusedInput, handleFocus, handleBlur} = useFocus<
    'email' | 'password'
  >();

  const [isCheckedCheckbox, setIsCheckedCheckbox] = useState(false);

  const handleLogin = () => {
    if (validateForm()) {
      navigation.navigate('BottomTabs');
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={globalStyles.container}>
          <Text
            variant="headlineLarge"
            style={{fontWeight: '800', marginBottom: 10}}>
            Iniciar sesión
          </Text>
          <Text style={{color: '#4c5667', fontSize: 18}}>
            Bienvenido de vuelta
          </Text>
          <View style={{marginTop: 50}}>
            <Input
              label="Correo electrónico"
              placeholder="hello@example.com"
              value={fields.email}
              onChangeText={value => handleInputChange('email', value)}
              isFocused={focusedInput === 'email'}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
            />
          </View>

          <Input
            label="Contraseña"
            rightLabel="Olvidaste tu contraseña?"
            onPressRightLabel={() => navigation.navigate('ForgotPassword')}
            placeholder="Password"
            value={fields.password}
            onChangeText={value => handleInputChange('password', value)}
            isFocused={focusedInput === 'password'}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            isPassword
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />

          <Checkbox
            title="Mantener mi sesión iniciada"
            isChecked={isCheckedCheckbox}
            toggle={() => setIsCheckedCheckbox(!isCheckedCheckbox)}
          />

          <Button
            text="Iniciar sesión"
            textStyle={globalStyles.buttonText}
            style={{marginTop: 30}}
            onPress={handleLogin}
          />

          <Separator text="o iniciar sesión con" />

          <Pressable
            style={globalStyles.googleButton}
            onPress={() => console.log('Pressed')}>
            <View style={globalStyles.googleButtonContent}>
              <GenericIcon name="logo-google" style={{marginRight: 15}} />
              <Text variant="bodyLarge" style={{color: '#444'}}>
                Continuar con Google
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'center',
              ...(isKeyboardVisible
                ? {marginBottom: 20}
                : {position: 'absolute', bottom: 50}),
            }}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: '#2f4eff',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Crear cuenta
            </Text>
          </Pressable>

          {error && <Message error={error} />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
